<?php

use Illuminate\Support\Facades\Route;

Route::get('/app/{view_page}', function () {
    return view('welcome');
});

