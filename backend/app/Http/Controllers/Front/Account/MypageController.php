<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\User;
use App\Models\Follow;
use App\Models\Post;
use App\Models\PostImage;
use App\Models\Shop;


class MypageController extends Controller
{
   public function index()
   {
    return view('accounts.requests.index');
   }
   public function Mypage_data()
   {
    $account_id = Auth::id();
    $data['posts'] = Post::where('account_id', $account_id)->with('postImages')->get();
        
    $account = DB::table('accounts')->where('id', $account_id)->first();
    $follow = DB::table('follows')->where('id', $account_id)->first();
    $post_id = DB::table('posts')->where('account_id', $account_id)->value('id');
    
    $data['account_type'] = $account->type;
    $sex = DB::table('users')->where('account_id', $account_id)->value('sex');
    
    if ($sex == 'm') {
        $data['sex'] = '男性';
    }
    else {
        $data['sex'] = '女性';
    }

    $data['account'] = $account->account;
    $data['name'] = $account->name;
    $data['img'] = $account->img;
    $data['profile'] = $account->profile;
    if ($follow == null) {
        
    }
    else{
        $data['follow_account_id'] = $follow->follow_account_id;
        $data['follower_account_id'] = $follow->follower_account_id;
    }
    $data['tel'] = DB::table('shops')->where('account_id', $account_id)->value('tel');
    $data['email'] = $account->email;
    // $data['post_images'] = DB::table('post_images')->where('post_id', $post_id)->value('url');
    

    return $data;
   }
   
}
