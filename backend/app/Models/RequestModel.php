<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestModel extends Model
{
    use HasFactory;
    protected $table = "requests";
    protected $fillable = [
        'account_id',
        'type',
        'target',
        'brand' ,
        'vehicle' ,
        'grade' ,
        'color' ,
        'mileage' ,
        'price' , 
        'prefecture_id' , 
        'remark' 

    ];
}
