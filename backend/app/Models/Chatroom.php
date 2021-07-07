<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{
    use HasFactory;
    /**
     * 複数代入可能な属性
     *
     * @var array
     */
    protected $table = 'chatrooms';
    protected $fillable = [
        'send_account_id',
        'receive_account_id',
    ];
}
