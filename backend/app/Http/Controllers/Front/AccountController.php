<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
// use App\Http\Requests\StoreUserRequest;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * 共通アカウント登録
     */
    public function register() {
        // return view('auth.register');
    }

    /**
     * 共通アカウント登録
     */
    public function registerPost() {
    }

    /**
     * ユーザーアカウント登録
     */
    public function userAccount() {
        // return view('auth.register-user');
    }

    /**
     * ユーザーアカウント登録 POST
     */
    public function userAccountPost(StoreUserRequest $request) {
        // dd($request->all());
    }

    /**
     * ショップアカウント登録
     */
    public function shopAccount() {

    }
    /**
     * ショップアカウント登録
     */
    public function shopAccountPost(Request $request) {

    }
}
