<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'shops';
    protected $fillable = [
        'account_id',
        'tel',
        'url',
        'detail',
        'hour',
    ];
    /**
     * リレーション設定
     */
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
}
