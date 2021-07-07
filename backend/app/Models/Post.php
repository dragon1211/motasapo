<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = "posts";
    protected $fillable = [
        'type',
        'account_id',
        'text',
        'limit_at',
    ];

    /**
     * リレーション設定
     */
    // 投稿コメント（一対多）
    public function postComments()
    {
        return $this->hasMany(PostComment::class);
    }

    // 投稿画像（一対多）
    public function postImages()
    {
        return $this->hasMany(PostImage::class);
    }

    // 投稿いいね（一対多）
    public function postLikes()
    {
        return $this->hasMany(PostLike::class);
    }

    // 投稿タグ（一対多）
    public function postTags()
    {
        return $this->hasMany(PostTag::class);
    }

    // 投稿いいね（一対多）
    public function postViews()
    {
        return $this->hasMany(PostView::class);
    }
}
