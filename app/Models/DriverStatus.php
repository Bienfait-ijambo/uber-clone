<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverStatus extends Model
{
    protected $guarded=[];

    const AVAILABLE_STATUS=1;
    const BUSY_STATUS=0;

    const AVAILABLE_STATUS_NAME='AVAILABLE';
    const BUSY_STATUS_NAME='BUSY';


    public static function getDriverStatusColumn($userId){

        $driverStatus=DriverStatus::where('user_id',$userId)->first();
        return (!is_null($driverStatus)) ? $driverStatus->status:null;

        
    }

    
    public static function getDriverStatusById($userId){

        $driverStatus=DriverStatus::where('user_id',$userId)->first();
        return (!is_null($driverStatus)) ? DriverStatus::getDriverStatusName($driverStatus->status):null;

        
    }

    public static function getDriverStatusName($status){
        if(intval($status)===self::AVAILABLE_STATUS){
            return self::AVAILABLE_STATUS_NAME;
        }

        if(  intval($status)===self::BUSY_STATUS){
            return self::BUSY_STATUS_NAME;
        }
    }




    public static function checkDriverStatus($status){

        if($status===null) {
            return false;
        }
      
        if(intval($status)===self::AVAILABLE_STATUS || intval($status)===self::BUSY_STATUS){
            return true;
        }else{
            return false;
        }
    }

}
