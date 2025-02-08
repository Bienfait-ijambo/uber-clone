import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { getUserData, showError, successMsg } from "../../helper/utils";
import { getData, postData } from "../../helper/http";
import { ONGOING_STATUS, PENDING_STATUS } from "./../../constants/tripe-status";
import { useRouter } from "vue-router";
import { CUSTOMER_ROLE, DRIVER_ROLE } from "../../constants/roles";

export const useMapStore = defineStore("map-store", () => {
    const customerDestination = ref({});
    const customerLocation = ref({});
    const driverLocation = ref({});
    const loading = ref(false);
    const vehicleId = ref(null);
    const customerTripData = ref({});
    const driverLocationForCustomer=ref([])
    const customerLocationForDriver=ref([])
    const notificationVal=ref(0)
    const allCustomerTripData=ref([])
    
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
        let error=0;
        return new Promise((resolve, reject) => {
            const { latitude: latitudeL } = getCustomerLocationCoordinates();
            const { longitude: longitudeD } =
                getCustomerDestinationCoordinates();

            if (typeof vehicleId.value === "object" || vehicleId.value === "") {
                showError("Please select a vehicle or Taxi !");
                error++
                resolve(false);
            } 

            if (
                typeof longitudeD === "undefined" ||
                typeof latitudeL === "undefined"
            ) {
                error++
                showError("Please select a location !");
                resolve(false);
            }

            if(error===0){
                resolve(true)
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
                `/customer_trip?user_id=${userData?.user?.id}&trip_status=${ONGOING_STATUS}`
            );
            loading.value = false;
            if (Array.isArray(data) && data.length === 0) {
                window.location.href = "/app/welcome";
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


   


    function listenCustomerLocationInRealTime(){
        const userData=getUserData()
        window.Echo.channel("customerLocation").listen(
            "CustomerLocationEvent",
            (event) => {
                const newCustomerLocation=event.customerLocation
              
                const newArr= customerLocationForDriver.value.filter((customer)=>customer.user_id!==newCustomerLocation.user_id)
                let newData=[...newArr, event.customerLocation]
                customerLocationForDriver.value=[...newData]
                if(userData?.user?.role===DRIVER_ROLE){
                    notificationVal.value++

                }
                successMsg('Customer location changed !')
            
            }
        );
    }

    

    

    async function getAllCustomerTrips(userId) {
      
        try {
            loading.value = true;
            const data = await getData(
                `/all_customer_trips?user_id=${userId}`
            );
            loading.value = false;
            if (Array.isArray(data) && data.length === 0) {
                allCustomerTripData.value=[]
            } else {
                listenCustomerLocationInRealTime()
                allCustomerTripData.value=data
            }
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showError(message);
            }
        }
    }

   

   


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
                listenCustomerLocationInRealTime()
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
        const userData=getUserData()
        window.Echo.channel("driverLocation").listen(
            "DriverLocationEvent",
            (event) => {
                const newDriverLocation=event.driverLocation
              
                const newArr= driverLocationForCustomer.value.filter((driver)=>driver.user_id!==newDriverLocation.user_id)
                let newData=[...newArr, event.driverLocation]
                driverLocationForCustomer.value=[...newData]

                if(userData?.user?.role===CUSTOMER_ROLE){
                    notificationVal.value++

                }
                successMsg('Driver location changed !')
            
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


    
    async function tripCompleted(trip) {
        try {
            const data = await postData(`/trip_completed`,{
                id:trip?.id,
                user_id:trip?.user_id
            });
           successMsg(data?.message)
        } catch (errors) {
            for (const message of errors) {
                showError(message);
            }
        }
    }
    async function tripStarted(trip) {
        try {
            const data = await postData(`/trip_started`,{
                id:trip?.id,
                user_id:trip?.user_id
            });
           successMsg(data?.message)
        } catch (errors) {
            for (const message of errors) {
                showError(message);
            }
        }
    }

    return {
        tripCompleted,
        tripStarted,
        allCustomerTripData,
        getAllCustomerTrips,
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
        getCustomerTripData,
        notificationVal
    };
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
