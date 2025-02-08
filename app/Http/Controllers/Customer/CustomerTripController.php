<?php

namespace App\Http\Controllers\Customer;

use App\Events\CustomerLocationEvent;
use App\Http\Controllers\Controller;
use App\Models\CustomerTrip;
use App\Models\DriverStatus;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use DB;

class CustomerTripController extends Controller
{


    // Models
    // : driver_statuses ( id,user_id,status)
    // : driver_locations (location_address,location_latitude, location_longitude, user_id )

    public function getDriverLocationForCustomer(Request $request)
    {

        $data = DB::table('driver_locations')
            ->join('driver_statuses', 'driver_locations.user_id', '=', 'driver_statuses.user_id')
            ->join('users', 'driver_locations.user_id', '=', 'users.id')

            ->where('driver_statuses.status', DriverStatus::AVAILABLE_STATUS)
            ->select(
                'driver_locations.user_id',
                'users.name as user_name',
                'driver_locations.location_address',
                'driver_locations.location_latitude',
                'driver_locations.location_longitude',
                'driver_statuses.status'
            )
            ->get();

        return response($data);
    }




    public function getCustomerTripData(Request $request)
    {
        $customerId = $request->user_id;

        $customerTrip = CustomerTrip::where('user_id', $customerId)
            // ->where('vehicle_id', $request->vehicle_id)
            ->where('trip_status', $request->trip_status)
            ->first();

        if (!is_null($customerTrip)) {
            return response(
                [
                    'location_address' => $customerTrip->location_address,
                    'location_latitude' => floatval($customerTrip->location_latitude),
                    'location_longitude' => floatval($customerTrip->location_longitude),
                    'destination_address' => $customerTrip->destination_address,
                    'destination_latitude' => floatval($customerTrip->destination_latitude),
                    'destination_longitude' => floatval($customerTrip->destination_longitude),
                    'trip_status' => $customerTrip->trip_status,
                    'user_id' => $customerTrip->user_id,
                    'vehicle_id' => $customerTrip->vehicle_id,
                    'id' => $customerTrip->id,

                ],
                200
            );
        } else {
            return response([], 200);
        }
    }




    public function getAllTripsForCustomer(Request $request)
    {



        $data = DB::table('customer_trips')
            ->join('users', 'customer_trips.user_id', '=', 'users.id')
            ->join('vehicles', 'customer_trips.vehicle_id', '=', 'vehicles.id')
            ->select('customer_trips.*', 'users.name as user_name', 'vehicles.name as taxi_name', 'vehicles.model as taxi_model')
            ->where('users.id', $request->user_id)
            ->get();


        return response($data, 200);
    }



    public function getCustomerTripDataForDriver(Request $request)
    {


        $customerTrip = DB::table('customer_trips')
            ->join('users', 'customer_trips.user_id', '=', 'users.id')
            ->join('vehicles', 'customer_trips.vehicle_id', '=', 'vehicles.id')
            ->where('customer_trips.trip_status', CustomerTrip::PENDING_STATUS)
            ->select('customer_trips.*', 'users.name as user_name', 'vehicles.name as taxi_name', 'vehicles.model as taxi_model')
            ->get();


        return response($customerTrip, 200);
    }
    public function storeCustomerTrip(Request $request)
    {

        $customerTrip = CustomerTrip::where('user_id', $request->user_id)
            // ->where('vehicle_id', $request->vehicle_id)
            ->where('trip_status', $request->trip_status)
            ->first();

        $vehiclePrice = Vehicle::getVehiclePrice($request->vehicle_id);
        $distance = CustomerTrip::calculateDistance($request->location_latitude, $request->location_longitude, $request->destination_latitude, $request->destination_longitude);

        $totalPrice = round($distance, 2) * $vehiclePrice;

        $customerTripData = [
            'location_address' => $request->location_address,
            'location_latitude' => $request->location_latitude,
            'location_longitude' => $request->location_longitude,
            'destination_address' => $request->destination_address,
            'destination_latitude' => $request->destination_latitude,
            'destination_longitude' => $request->destination_longitude,
            'trip_status' => CustomerTrip::ONGOING_STATUS,
            'user_id' => $request->user_id,
            'vehicle_id' => $request->vehicle_id,
            'distance' => round($distance, 2),
            'total_price' => $totalPrice,
            'trip_code' => CustomerTrip::generateUniqueTripCode(),




        ];
        $vehicleData = Vehicle::getVehicle($request->vehicle_id);
        $customerLocationEventData = $customerTripData;
        $customerLocationEventData['user_name'] = User::getUserName($request->user_id);
        $customerLocationEventData['taxi_name'] = $vehicleData->name;
        $customerLocationEventData['taxi_model'] = $vehicleData->model;


        if (is_null($customerTrip)) {



            CustomerTrip::create($customerTripData);
            CustomerLocationEvent::dispatch($customerLocationEventData);



            return response(['message' => 'Trip created successfully !']);
        } else {

            CustomerTrip::where('user_id', $request->user_id)
                ->where('trip_status', CustomerTrip::ONGOING_STATUS)
                ->update([
                    'location_address' => $request->location_address,
                    'location_latitude' => $request->location_latitude,
                    'location_longitude' => $request->location_longitude,
                    'destination_address' => $request->destination_address,
                    'destination_latitude' => $request->destination_latitude,
                    'destination_longitude' => $request->destination_longitude,
                    'trip_status' => CustomerTrip::ONGOING_STATUS,
                    'user_id' => $request->user_id,
                    'vehicle_id' => $request->vehicle_id,
                    'distance' => round($distance, 2),
                    'total_price' => $totalPrice,
                ]);
            CustomerLocationEvent::dispatch($customerLocationEventData);


            return response(['message' => 'Trip created successfully !']);

            // update
        }
    }


    public function tripStarted(Request $request)
    {

        $tripExist = DB::table('payments')
            ->where('trip_id', $request->id)
            ->first();

        if (!is_null($tripExist)) {


            CustomerTrip::where('user_id', $request->user_id)
                ->where('id', $request->id)
                ->update([
                    'trip_status' => CustomerTrip::STARTED_STATUS,

                ]);

            return response(['message' => 'Trip started successfully !']);
        }
    }


    public function tripCompleted(Request $request)
    {

        $tripExist = DB::table('payments')
            ->where('trip_id', $request->id)
            ->first();

        if (!is_null($tripExist)) {


            CustomerTrip::where('user_id', $request->user_id)
                ->where('id', $request->id)
                ->update([
                    'trip_status' => CustomerTrip::COMPLETED_STATUS,

                ]);

            return response(['message' => 'Trip completed successfully !']);
        }
    }
}
