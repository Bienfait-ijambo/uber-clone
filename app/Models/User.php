<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable,HasApiTokens,Billable;

    const IS_VALID_EMAIL=1;

    const IS_INVALID_EMAIL=0;

    

    const ADMIN_ROLE='ADMIN';

    const CUSTOMER_ROLE='CUSTOMER';
    const DRIVER_ROLE='DRIVER';


    
    public static function getUserName(int $id){
        $user=User::where('id',$id)->first();
        return !is_null($user) ?$user->name:null;
        
    }



    public static function getUserByEmail(string $email){
        $user=User::where('email',$email)->first();
        return $user;
    }

    

    

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'otp_code',
        'password',
        'role',
        'google_id'
    ];


    
   public static  function generateOTP($length = 6) {
    // Ensure the length is a positive integer
    if ($length <= 0) {
        return '';
    }

    // Generate a random number with the desired length
    $otp = '';
    for ($i = 0; $i < $length; $i++) {
        $otp .= mt_rand(0, 9); // Append a random digit (0-9)
    }

    return $otp;
}

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
