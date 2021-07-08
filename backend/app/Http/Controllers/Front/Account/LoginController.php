<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * ログイン画面
     *
     * @return view
     */
    public function index()
    {
        return view('auth.login');
    }
}
