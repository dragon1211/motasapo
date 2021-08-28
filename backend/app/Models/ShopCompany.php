<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShopCompany extends Model
{
    use HasFactory;

    protected $table = 'shop_companies';
    protected $fillable = [
        'account_id',
        'company',
        'person',
        'post',
        'prefecture_id',
        'address',
    ];
}
