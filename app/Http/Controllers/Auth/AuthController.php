<?php

namespace App\Http\Controllers\Auth;

use App\Events\SendEmailEvent;
use App\Http\Controllers\Controller;
use App\Models\DriverStatus;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use DB;
use Validator;
use Auth;

class AuthController extends Controller
{


    public function getUsers(Request $request)
    {
        $query=$request->get('query');
        $data=DB::table('users')
        ->select('id','name','email','role')
        ->where('name','like','%' . $query.'%')
        ->paginate(10);

        return response($data,200);

    }


    
    public function updateRole(Request $request)
    {
        DB::table('users')
        ->where('id',$request->userId)
        ->update([
            'role' => $request->role
        ]);

        return response([
            'message' =>'role updated successfully',
      
        ],200);

    }


    public function logout(Request $request)
    {
        DB::table('personal_access_tokens')
        ->where('tokenable_id',$request->userId)
        ->delete();

        return response([
            'message' =>'user logged out',
      
        ]);

    }

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
               'errors' =>[
                'message' =>'Email or password is incorrect !',
                // 'isLogged'=>false
               ]

            ],401);
           
        }

     
        $token = $user->createToken(env('SECRET_TOKEN_KEY'));
        $accessToken= $token->plainTextToken;
        $status=DriverStatus::getDriverStatusById($user['id']);

        return response([
            'user' =>$user,
            'driverStatus'=>$status,
            'token'=>$accessToken,
            'isLogged'=>true,
        ]);
 
 
    }

    public function storeToken(){
        
    $user=Auth::user();

    if($user){
        $token = $user->createToken(env('SECRET_TOKEN_KEY'));
        $accessToken= $token->plainTextToken;
        $driverStatus=DriverStatus::getDriverStatusById($user['id']);
    return view('store_token',compact('accessToken','driverStatus','user'));

    }
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
            'role' => User::CUSTOMER_ROLE,
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
       $fields = $request->all();

        $errors = Validator::make($fields, [
            'otp_code' => 'required',
            'email' => 'required|email',
        ]);

        if ($errors->fails()) {
            return response([
                'errors' => $errors->errors()->all(),
            ], 422);
        }

    $user=User::getUserByEmail($fields['email']); //

    if(!is_null($user)){

        if($user->otp_code == $fields['otp_code']){
            
            $user->where('email',$fields['email'])->update([
                'is_valid_email' => User::IS_VALID_EMAIL,
            ]);

            
        $token = $user->createToken(env('SECRET_TOKEN_KEY'));
        $accessToken= $token->plainTextToken;

            return response([
                'message' => 'Your email has been validated !',
                'user' => $user,
                'token' => $accessToken
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





   
  public function redirectToGoogle()
  {
       return Socialite::driver('google')->redirect();
  }

  public function createUserViaGoogle(Request $request)
  {

      $googleUser = Socialite::driver('google')->user();

      $user = User::updateOrCreate([
          'google_id' => $googleUser->id,
      ], [
          'name' => $googleUser->name,
          'email' => $googleUser->email,
          'google_id' => $googleUser->id,
          'role' =>  User::CUSTOMER_ROLE,
          'otp_code' => '',
          'is_valid_email' => User::IS_INVALID_EMAIL,
          'password' => '',

      ]);

      Auth::login($user);


      return redirect('/store/token');
   
   

  }




   
}
