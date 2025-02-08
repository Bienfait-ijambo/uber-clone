<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;


Route::get('/app/{view_page}', function () {
    return view('welcome');
});



Route::get('/store/token', [AuthController::class,'storeToken']);




Route::get('/payment-success', function () {
    dd('payment succeed');
})->name('payment.success');


Route::get('/checkout_form', [PaymentController::class, 'viewCheckoutForm']);

Route::post('/pay', [PaymentController::class, 'pay'])
->middleware('auth:sanctum');



Route::get('/auth/redirect', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/callback', [AuthController::class, 'createUserViaGoogle']);

