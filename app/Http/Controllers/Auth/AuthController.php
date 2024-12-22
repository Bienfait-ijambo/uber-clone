<?php

namespace App\Http\Controllers\Auth;

use App\Events\SendEmailEvent;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;


use Validator;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $fields = $request->all();

        $errors = Validator::make($fields, [
            'name' => 'required',
            'password' => 'required|max:6',
            'email' => 'required|email|unique:users,email',
        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $otp_code = User::generateOTP();
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'otp_code' => $otp_code,
            'is_valid_email' => User::IS_INVALID_EMAIL,
            'password' => bcrypt($fields['password']),
        ]);

        SendEmailEvent::dispatch($user);

     
        return response([
            'message' => 'Your account has been created successfully !',
            'user' => $user
        ], 200);
    }
}
