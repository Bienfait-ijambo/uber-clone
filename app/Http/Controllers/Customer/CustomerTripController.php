<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CustomerTrip;
use App\Models\DriverStatus;
use Illuminate\Http\Request;
use DB;
class CustomerTripController extends Controller
{

    
// Models
// : driver_statuses ( id,user_id,status)
// : driver_locations (location_address,location_latitude, location_longitude, user_id )

public function getDriverLocationForCustomer(Request $request)
{

    $data=DB::table('driver_locations')
    ->join('driver_statuses','driver_locations.user_id','=','driver_statuses.user_id')
    ->join('users','driver_locations.user_id','=','users.id')

    ->where('driver_statuses.status',DriverStatus::AVAILABLE_STATUS)
    ->select('driver_locations.user_id','users.name as user_name','driver_locations.location_address',
    'driver_locations.location_latitude','driver_locations.location_longitude')
    ->get();

    return response($data);
}




    public function getCustomerTripData(Request $request){
        $customerId=$request->user_id;

        $customerTrip=CustomerTrip::where('user_id', $customerId)
        // ->where('vehicle_id', $request->vehicle_id)
        ->where('trip_status', $request->trip_status)
        ->first();

        if(!is_null($customerTrip)){
            return response(
                [
                    'location_address' => $customerTrip->location_address,
                    'location_latitude' =>floatval( $customerTrip->location_latitude),
                    'location_longitude' =>floatval($customerTrip->location_longitude) ,
                    'destination_address' =>$customerTrip->destination_address, 
                    'destination_latitude' => floatval($customerTrip->destination_latitude),
                    'destination_longitude' =>floatval($customerTrip->destination_longitude),
                    'trip_status' => $customerTrip->trip_status,
                    'user_id' => $customerTrip->user_id ,
                    'vehicle_id' => $customerTrip->vehicle_id,
                ], 200);
        }else{
            return response([], 200);
        }
    }

    public function getCustomerTripDataForDriver(Request $request)
    {
          
        $customerTrip=CustomerTrip::where('trip_status', CustomerTrip::PENDING_STATUS)
        ->get();

        return response($customerTrip, 200);
    }
    public function storeCustomerTrip(Request $request)
    {
        
        $customerTrip=CustomerTrip::where('user_id', $request->user_id)
        // ->where('vehicle_id', $request->vehicle_id)
        ->where('trip_status', $request->trip_status)
        ->first();

        if(is_null($customerTrip)){
           

            
            CustomerTrip::create([
                'location_address' => $request->location_address,
                'location_latitude' => $request->location_latitude,
                'location_longitude' =>$request->location_longitude ,
                'destination_address' =>$request->destination_address, 
                'destination_latitude' => $request->destination_latitude,
                'destination_longitude' =>$request->destination_longitude,
                'trip_status' => CustomerTrip::PENDING_STATUS,
                'user_id' => $request->user_id ,
                'vehicle_id' => $request->vehicle_id,
            ]);
    
            return response(['message'=>'Trip created successfully !']);

        }else{

            CustomerTrip::where('user_id', $request->user_id)
            ->where('trip_status', CustomerTrip::PENDING_STATUS)
            ->update([
                'location_address' => $request->location_address,
                'location_latitude' => $request->location_latitude,
                'location_longitude' =>$request->location_longitude ,
                'destination_address' =>$request->destination_address, 
                'destination_latitude' => $request->destination_latitude,
                'destination_longitude' =>$request->destination_longitude,
                'trip_status' => CustomerTrip::PENDING_STATUS,
                'user_id' => $request->user_id ,
                'vehicle_id' => $request->vehicle_id,
            ]);

            return response(['message'=>'Trip created successfully !']);

            // update
        }
       
       

    }
}
