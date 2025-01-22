import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getUserData, showError, successMsg } from "../../helper/utils";
import { getData, postData } from "../../helper/http";
import { PENDING_STATUS } from "./../../constants/tripe-status";
import { useRouter } from "vue-router";

export const useMapStore = defineStore("map-store", () => {
    const customerDestination = ref({});
    const customerLocation = ref({});
    const driverLocation = ref({});
    const loading = ref(false);
    const vehicleId = ref(null);
    const customerTripData = ref({});
    const driverLocationForCustomer=ref([])
    const customerLocationForDriver=ref([])

    function getDriverLocationCoordinates() {
        const longitude =
            driverLocation.value.properties?.coordinates?.longitude;
        const latitude = driverLocation.value.properties?.coordinates?.latitude;
        const place = driverLocation.value.properties?.full_address;

        return { longitude, latitude, place };
    }

    function getCustomerLocationCoordinates() {
        const longitude =
            customerLocation.value.properties?.coordinates?.longitude;
        const latitude =
            customerLocation.value.properties?.coordinates?.latitude;
        const place = customerLocation.value.properties?.full_address;

        return { longitude, latitude, place };
    }

    function getCustomerDestinationCoordinates() {
        const longitude =
            customerDestination.value.properties?.coordinates?.longitude;
        const latitude =
            customerDestination.value.properties?.coordinates?.latitude;
        const place = customerDestination.value.properties?.full_address;

        return { longitude, latitude, place };
    }

    function validateBookTaxiForm() {
        return new Promise((resolve, reject) => {
            const { latitude: latitudeL } = getCustomerLocationCoordinates();
            const { longitude: longitudeD } =
                getCustomerDestinationCoordinates();

            if (typeof vehicleId.value === "object" || vehicleId.value === "") {
                showError("Please select a vehicle or Taxi !");
                resolve(false);
            } else {
                resolve(true);
            }

            if (
                typeof longitudeD === "undefined" ||
                typeof latitudeL === "undefined"
            ) {
                showError("Please select a location !");
                resolve(false);
            } else {
                resolve(true);
            }
        });
    }

    async function storeCustomerLocation() {
        const {
            place: placeL,
            longitude: longitudeL,
            latitude: latitudeL,
        } = getCustomerLocationCoordinates();
        const {
            place: placeD,
            longitude: longitudeD,
            latitude: latitudeD,
        } = getCustomerDestinationCoordinates();

        const userData = getUserData();

        try {
            loading.value = true;
            const data = await postData(`/customer_trip`, {
                user_id: userData?.user.id,

                location_address: placeL,
                location_latitude: latitudeL,
                location_longitude: longitudeL,
                destination_address: placeD,
                destination_latitude: latitudeD,
                destination_longitude: longitudeD,
                trip_status: PENDING_STATUS,
                vehicle_id: vehicleId.value,
            });
            successMsg(data?.message);
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    async function storeDriverLocation() {
        const { longitude, latitude, place } = getDriverLocationCoordinates();
        const userData = getUserData();
        if (
            typeof longitude === "undefined" ||
            typeof latitude === "undefined"
        ) {
            showError("Please select a location !");
        } else {
            try {
                loading.value = true;
                const data = await postData(`/driver_location`, {
                    user_id: userData?.user.id,
                    longitude: longitude,
                    latitude: latitude,
                    address: place,
                });
                successMsg(data?.message);
                loading.value = false;
            } catch (errors) {
                loading.value = false;
                for (const message of errors) {
                    showError(message);
                }
            }
        }
    }

    async function getCustomerTripData() {
        const userData = getUserData();

        try {
            loading.value = true;
            const data = await getData(
                `/customer_trip?user_id=${userData?.user?.id}&trip_status=${PENDING_STATUS}`
            );
            loading.value = false;
            if (Array.isArray(data) && data.length === 0) {
                window.location.href = "/welcome";
            } else {
                customerTripData.value = data;
                loading.value = false;
            }
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }


   



    // 

    async function getCustomerLocationForDriver() {

        try {
            loading.value = true;
            const data = await getData(
                `/customer_location/driver`
            );
            loading.value = false;
            if (Array.isArray(data) && data.length === 0) {
                customerLocationForDriver.value=[]
            } else {
                customerLocationForDriver.value=data
            }
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }


    async function getDriverLocationForCustomer() {

        try {
            loading.value = true;
            const data = await getData(
                `/driver_location/customer`
            );
            loading.value = false;
            if (Array.isArray(data) && data.length === 0) {
                driverLocationForCustomer.value=[]
            } else {
                listenDriverLocationInRealTime()
                driverLocationForCustomer.value=data
            }
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    function listenDriverLocationInRealTime(){
        window.Echo.channel("driverLocation").listen(
            "DriverLocationEvent",
            (event) => {
               console.log(event)
            }
        );
    }


    async function getDriverLocation() {
        const userData = getUserData();

        try {
            loading.value = true;
            const data = await getData(
                `/driver_location?user_id=${userData?.user?.id}`
            );
            loading.value = false;
            if (Array.isArray(data) && data.length === 0) {
                window.location.href = "/profile";
            } else {
                driverLocation.value = data;
                loading.value = false;
            }
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

    return {
        getDriverLocationForCustomer,
        customerLocationForDriver,
        getCustomerLocationForDriver,
        driverLocationForCustomer,
        customerDestination,
        customerLocation,
        getCustomerLocationCoordinates,
        getCustomerDestinationCoordinates,
        getDriverLocationCoordinates,
        driverLocation,
        getDriverLocation,
        storeDriverLocation,
        vehicleId,
        customerTripData,
        validateBookTaxiForm,
        storeCustomerLocation,
        getCustomerTripData
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
