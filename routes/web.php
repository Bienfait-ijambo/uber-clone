<?php

use App\Http\Controllers\Payment\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/app/{view_page}', function () {
    return view('welcome');
});





Route::get('/success', [PaymentController::class, 'successPayment'])->name('success');

Route::get('/checkout', [PaymentController::class, 'checkOutForm']);

Route::get('/cancel', function () {
    dd('payment cancel  !!!!');
})->name('cancel');

