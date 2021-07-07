<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// class User extends Authenticatable
class User extends Model
{
    // use HasApiTokens;
    // use HasFactory;
    // use HasProfilePhoto;
    // use HasTeams;
    // use Notifiable;
    // use TwoFactorAuthenticatable;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'users';
    protected $fillable = [
        'account_id',
        'sex',
    ];
}
