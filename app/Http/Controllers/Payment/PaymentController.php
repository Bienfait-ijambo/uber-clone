<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\CustomerTrip;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use DB;

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


    public function pay(Request $request)
    {
       return DB::transaction(function() use ($request){

        
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        } 
    
        try {
            // Ensure the user has a Stripe customer ID
            if (!$user->stripe_id) {
                $user->createAsStripeCustomer();
            }
    
            $tripCode=$request->trip_code;
            $amount=(floatval($request->amount)*100);
            $paymentIntent = $user->charge($amount, $request->payment_method_id, [
                'return_url' => route('payment.success') // Define this route
            ]);
            //get data in customer trip using code

            $customerTrip=CustomerTrip::where('trip_code', $tripCode)
            ->first();

            if( $customerTrip){

                DB::table('payments')
            ->insert([
                'user_id' =>  $customerTrip->user_id,
                'trip_id' => $customerTrip->id,
                'vehicle_id' => $customerTrip->vehicle_id,
                'amount' =>$request->amount ,
                'currency' =>'USD' ,
                'payment_status' =>Payment::SUCCEED ,

                'payment_id' => $paymentIntent->id,
             ]);

             CustomerTrip::where('trip_code', $tripCode)
            ->update([
                'trip_status'=>CustomerTrip::COMPLETED_STATUS
            ]);
            return response()->json(['success' => true, 'payment' => $paymentIntent]);

            }

            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
        
       });
    }


}
