<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverStatus extends Model
{
    protected $guarded=[];

    const AVAILABLE_STATUS=1;
    const BUSY=0;

    public static function ($status){
        if($status===self::AVAILABLE_STATUS || $status===self::BUSY){
            return true;
        }else{
            return false;
        }
    }

}
