<?php

namespace App\Models;

use App\Models\shop;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class Account extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * 複数代入可能な属性
     *
     * @var array
     */
    protected $table = 'accounts';
    protected $fillable = [
        'account',
        'email',
        'img',
        'last_login_at',
        'name',
        'password',
        'profile',
        'type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * このアカウントと紐づくユーザーの取得
     */
    public function user()
    {
        return $this->hasOne(User::class);
    }

    /**
     * このアカウントと紐づくユーザーの取得
     */
    public function shop()
    {
        return $this->hasOne(Shop::class);
    }

    /**
     * メール承認機能
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\VerifyEmailJapanese);
    }
}
