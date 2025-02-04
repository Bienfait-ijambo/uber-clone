<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\CustomerTrip;
use Illuminate\Http\Request;
class PaymentController extends Controller
{
    
    
    public function viewCheckoutForm(Request $request){
        $trip_code = $request->get('trip_code');
        $publicKey=env('STRIPE_KEY');
        
        $customerTrip=CustomerTrip::where('trip_code', $trip_code)
        ->first();

        if(!is_null($customerTrip)){
            return view('checkout_form',compact('customerTrip','publicKey'));
        }else{
            return abort(404);
        }
    } 
 
}
