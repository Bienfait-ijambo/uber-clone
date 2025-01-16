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
            return response(['message'=>'invalid status'],422);
        }

        $driverstatus=DriverStatus::where('user_id',$userId)
        ->first();

        if(!is_null($driverstatus)){

        }else{
            DriverStatus::create([
                'user_id'=>$userId,
                'status'=>$status
            ]);
            return response(['message'=>'status changed successfully '],422);

        }
    }
}
