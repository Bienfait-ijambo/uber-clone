<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $guarded=[];


    public static function getVehicle($id){
        $vehicle=Vehicle::where('id',$id)->first();
        if(!is_null($vehicle)){
            return $vehicle;
        }
        return null;
    }

    public static function getVehiclePrice($id){
        $vehicle=Vehicle::getVehicle($id);
        if(!is_null($vehicle)){
            return floatval($vehicle->price);
        }else{
            return 0;
        }

    }
}
