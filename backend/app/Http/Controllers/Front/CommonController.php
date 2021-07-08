<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommonController extends Controller
{
    /**
     * 多重送信エラー画面
     */
    public function error() {
        return view('commons.error');
    }
}
