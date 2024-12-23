<?php

namespace App\Http\Controllers\Auth;

use App\Events\SendEmailEvent;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;


use Validator;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $fields = $request->all();

        $errors = Validator::make($fields, [
            'password' => 'required',
            'email' => 'required',
        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

        $user=User::getUserByEmail($fields['email']);

        if(!$user || !Hash::check($fields['password'],$user->password)){

            return response([
                'message' =>'Email or password is incorrect !',
                'isLogged'=>false

            ],401);
        }


        $token = $user->createToken(env('SECRET_TOKEN_KEY'));
        $accessToken= $token->plainTextToken;

        return response([
            'user' =>$user,
            'token'=>$accessToken,
            'isLogged'=>true,

        ]);
 
 
    }

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


   public function validateUserEmail(Request $request)
   {
    $email=$request->email;
    $code=$request->otp_code; //

    $user=User::getUserByEmail($email); //

    if(!is_null($user)){

        if($user->otp_code == $code){
            
            $user->where('email',$email)->update([
                'is_valid_email' => User::IS_VALID_EMAIL,
            ]);

            return response([
                'message' => 'Your email has been validated !',
                'user' => $user
            ], 200);

        }else{
            return response([
                'message' => 'Invalid code',
                'user' => $user
            ], 200);
        }
    }else{
      
            return response([
                'message' => 'user not found',
                'user' => $user
            ], 200);
        
    }

   }



   
}
