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


    public function viewCheckoutForm(Request $request)
    {
        $trip_code = $request->get('trip_code');
        $publicKey = env('STRIPE_KEY');

        $customerTrip = CustomerTrip::where('trip_code', $trip_code)
            ->first();

        if (!is_null($customerTrip)) {
            return view('checkout_form', compact('customerTrip', 'publicKey'));
        } else {
            return abort(404);
        }
    }


    public function pay(Request $request)
    {
        return DB::transaction(function () use ($request) {


            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            try {
                // Ensure the user has a Stripe customer ID
                if (!$user->stripe_id) {
                    $user->createAsStripeCustomer();
                }

                $tripCode = $request->trip_code;
                $amount = (floatval($request->amount) * 100);
                $paymentIntent = $user->charge($amount, $request->payment_method_id, [
                    'return_url' => route('payment.success') // Define this route
                ]);
                //get data in customer trip using code

                $customerTrip = CustomerTrip::where('trip_code', $tripCode)
                    ->first();

                if ($customerTrip) {

                    DB::table('payments')
                        ->insert([
                            'user_id' =>  $customerTrip->user_id,
                            'trip_id' => $customerTrip->id,
                            'vehicle_id' => $customerTrip->vehicle_id,
                            'amount' => $request->amount,
                            'currency' => 'USD',
                            'payment_status' => Payment::SUCCEED,

                            'payment_id' => $paymentIntent->id,
                        ]);

                    CustomerTrip::where('trip_code', $tripCode)
                        ->update([
                            'trip_status' => CustomerTrip::ONGOING_STATUS
                        ]);
                    return response()->json(['success' => true, 'payment' => $paymentIntent]);
                }
            } catch (\Exception $e) {
                return response()->json(['error' => $e->getMessage()], 400);
            }
        });
    }






    public function getPayments(Request $request)
    {


        $data = DB::table('payments')
            ->join('users', 'payments.user_id', '=', 'users.id')
            ->join('vehicles', 'payments.vehicle_id', '=', 'vehicles.id')
            ->join('customer_trips', 'payments.trip_id', '=', 'customer_trips.id')

            ->select('payments.payment_status','payments.id as paymentID', 'payments.payment_id', 'customer_trips.*', 'users.name as user_name', 'vehicles.name as taxi_name', 'vehicles.model as taxi_model')
            ->get();


        return response($data, 200);
    }


    public function refund(Request $request)
    {


       
        $user = Auth::user();
      

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        DB::table('payments')
            ->where('id', $request->id)
            ->update([
                'payment_status' => Payment::CANCELLED,
            ]);

        // $user->refund($request->payment_id);
        //change payment status to cancelled



        return response()->json(['message' => 'payment refund  successfully']);
    }
}
