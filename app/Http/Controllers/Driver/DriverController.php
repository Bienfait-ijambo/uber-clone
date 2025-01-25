<?php

namespace App\Http\Controllers\Driver;

use App\Events\DriverLocationEvent;
use App\Http\Controllers\Controller;
use App\Models\DriverLocation;
use App\Models\DriverStatus;
use App\Models\User;
use Illuminate\Http\Request;

use DB;


class DriverController extends Controller
{
    public function changeDriverStatus(Request $request)
    {
        $userId = $request->user_id;
        $status = $request->status;

        $isValidStatus = DriverStatus::checkDriverStatus($status);
        if (!$isValidStatus) {
            return response([
                'errors' => ['message' => 'invalid status']
            ], 422);
        }

        $driverstatus = DriverStatus::where('user_id', $userId)
            ->first();

        if (!is_null($driverstatus)) {
            if ($driverstatus->status == DriverStatus::BUSY_STATUS) {
                DriverStatus::where('user_id', $userId)
                    ->update(['status' => DriverStatus::AVAILABLE_STATUS]);
                return response(['message' => 'status changed successfully '], 200);
            } else {
                DriverStatus::where('user_id', $userId)
                    ->update(['status' => DriverStatus::BUSY_STATUS]);
                return response(['message' => 'status changed successfully '], 200);
            }
        } else {
            DriverStatus::create([
                'user_id' => $userId,
                'status' => $status
            ]);
            return response(['message' => 'status changed successfully '], 200);
        }
    }


    public function getDriverLocation(Request $request)
    {
        $driverId=$request->user_id;
        $driverLocation=DriverLocation::where('user_id', $driverId)
        ->first();

        if(!is_null($driverLocation)){
            return response([
                'address' => $driverLocation->location_address,
                'latitude' => floatval($driverLocation->location_latitude),
                'longitude' => floatval($driverLocation->location_longitude),

            ], 200);
        }else{
            return response([], 200);
        }
    }
 

    public function storeDriverLocation(Request $request)
    {

        $userId = $request->user_id;
        // $status=$request->status;
        $location = DriverLocation::where('user_id', $userId)
            ->first();


            $driverLocation=[
                'location_address' => $request->address,
                'location_latitude' => $request->latitude,
                'location_longitude' => $request->longitude,
                'user_id' => $request->user_id,
            ];
            $driverLocationEvent=$driverLocation;
            $driverLocationEvent['status']=DriverStatus::getDriverStatusColumn($request->user_id);
            $driverLocationEvent['user_name']=User::getUserName($request->user_id);


        if (!is_null($location)) {
            DriverLocation::where('user_id', $userId)
                ->update($driverLocation  );
            
                DriverLocationEvent::dispatch($driverLocationEvent);

            return response(['message' => 'driver location changed successfully'], 200);
        } else {
            DriverLocation::create($driverLocation );
            DriverLocationEvent::dispatch($driverLocationEvent);
            return response(['message' => 'driver location saved successfully '], 200);
        }
    }
}
