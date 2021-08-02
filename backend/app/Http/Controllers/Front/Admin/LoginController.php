<?php

namespace App\Http\Controllers\Front\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;


class LoginController extends Controller
{
    public function admin_login(){
        return view('admins.logins.index');
    }
    public function admin_check(Request $request){
        $rules = array(
            'email' => 'required|email',
            'password' => 'required'
        );  
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
        $admin = Admin::where(['email'=> $request->email, 'password' => md5($request->password)])->get()->first();
        if($admin) {
            return redirect(route('manager'));
        } else {
            return redirect()->back()->withErrors("認証に失敗しました。 ");
        }
    }
}
