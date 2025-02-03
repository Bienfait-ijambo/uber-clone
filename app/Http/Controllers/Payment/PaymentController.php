<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use DB;
class PaymentController extends Controller
{
    public function checkOutForm(Request $request)
    {

        $stripeProdId =env('STRIPE_PRODUCT_ID');
        $stripePriceId = $request->get('stripe_price_id');
        $user = Auth::user();

        if (! is_null($user)) {

            $request->session()->put('stripePriceId', $stripePriceId);

            return $request->user()
                ->newSubscription($stripeProdId, $stripePriceId)
           
                ->checkout([
                    'success_url' => route('success').'?session_id={CHECKOUT_SESSION_ID}',
                    'cancel_url' => route('cancel'),
                ]);
        } 
    }


    public function successPayment(Request $request){

        dd('payment succeeed !!');
    }


    

    




}
