<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerTrip extends Model
{
    protected $guarded=[];

    const PENDING_STATUS='pending';
    const ONGOING_STATUS='ongoing';
    const COMPLETED_STATUS='completed';
    const CANCELLED_STATUS='cancelled';
}
