<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\CustomerTrip;
use Illuminate\Http\Request;
use DB;
class CustomerTripController extends Controller
{
    public function storeCustomerTrip(Request $request)
    {
        
        
       
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

    }
}
