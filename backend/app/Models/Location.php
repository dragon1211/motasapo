<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    /**
     * 複数代入可能な属性
     *
     * @var array
     */
    protected $table = 'locations';
    protected $fillable = [
        'account_id',
        'location',
    ];
}
