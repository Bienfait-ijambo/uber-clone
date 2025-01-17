<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\DriverStatus;
use App\Models\User;
use Illuminate\Http\Request;
use DB;

class DriverController extends Controller
{
    public function changeDriverStatus(Request $request){
        $userId=$request->user_id;
        $status=$request->status;
        
        $isValidStatus=DriverStatus::checkDriverStatus($status);
        if(!$isValidStatus){
            return response([
                'errors' =>['message'=>'invalid status']
            ],422);
        }

        $driverstatus=DriverStatus::where('user_id',$userId)
        ->first();

        if(!is_null($driverstatus)){
            if($driverstatus->status == DriverStatus::BUSY_STATUS){
                DriverStatus::where('user_id',$userId)
                ->update(['status' => DriverStatus::AVAILABLE_STATUS]);
                return response(['message'=>'status changed successfully '],200);
            }else{
                DriverStatus::where('user_id',$userId)
                ->update(['status' => DriverStatus::BUSY_STATUS]);
                return response(['message'=>'status changed successfully '],200);
            }
          
        }else{
            DriverStatus::create([
                'user_id'=>$userId,
                'status'=>$status
            ]);
            return response(['message'=>'status changed successfully '],200);

        }
    }
}
