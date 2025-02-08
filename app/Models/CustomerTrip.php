<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerTrip extends Model
{
    protected $guarded=[];

    const PENDING_STATUS='pending';
    const ONGOING_STATUS='ongoing';

    const STARTED_STATUS='started';

    const COMPLETED_STATUS='completed';
    const CANCELLED_STATUS='cancelled';


    public static  function generateUniqueTripCode() {
        $timestamp = time();
        $randomNumber = mt_rand(1000, 9999);
        $combined = $timestamp . $randomNumber;
        $tripCode = substr($combined, 0, 12);
    
        return $tripCode;
    }


    public static function calculateDistance($lat1, $lon1, $lat2, $lon2) {
        $R = 6371; // Radius of the Earth in kilometers
    
        // Convert degrees to radians
        $toRadians = function($degrees) {
            return $degrees * M_PI / 180;
        };
    
        $lat1Rad = $toRadians($lat1);
        $lon1Rad = $toRadians($lon1);
        $lat2Rad = $toRadians($lat2);
        $lon2Rad = $toRadians($lon2);
    
        // Differences in latitudes and longitudes
        $deltaLat = $lat2Rad - $lat1Rad;
        $deltaLon = $lon2Rad - $lon1Rad;
    
        // Haversine formula
        $a = pow(sin($deltaLat / 2), 2) +
             cos($lat1Rad) * cos($lat2Rad) *
             pow(sin($deltaLon / 2), 2);
    
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    
        // Distance in kilometers
        $distance = $R * $c;
    
        return $distance; // Return the distance
    }
    
    // // Example usage
    // $lat1 = 34.43699600;
    // $lon1 = -119.63207000;
    // $lat2 = 34.052235; // Example second point
    // $lon2 = -118.243683;
    
    // $distance = calculateDistance($lat1, $lon1, $lat2, $lon2);
    // echo "Distance: " . round($distance, 2) . " km";
    
}
