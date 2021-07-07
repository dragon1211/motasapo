<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostComment extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = "post_comments";
    protected $fillable = [
        'comment_id',
        'post_id',
        'account_id',
        'comment',
        'is_read',
    ];
}
