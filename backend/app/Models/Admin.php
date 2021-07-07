<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;
    /**
     * 複数代入可能な属性
     *
     * @var array
     */
    protected $table = 'admins';
    protected $fillable = [
        'email',
        'password',
        'remember_token',
        'name',
    ];
}
