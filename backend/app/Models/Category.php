<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    /**
     * 複数代入可能な属性
     *
     * @var array
     */
    protected $table = 'categories';
    protected $fillable = [
        'account_id',
        'category_id',
    ];
}
