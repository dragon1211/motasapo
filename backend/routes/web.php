<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Front\AccountController;
use App\Http\Controllers\Front\PageController;
use App\Http\Controllers\Front\CommonController;
use App\Http\Controllers\Front\Account\PostController;
use App\Http\Controllers\Front\Account\GpsController;
use App\Http\Controllers\Front\Account\LoginController as AccountLoginController;
use App\Http\Controllers\Front\Account\MypageController;
use App\Http\Controllers\Front\Account\RequestController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;
use App\Http\Controllers\Front\Admin\LoginController;
use App\Http\Controllers\Front\Admin\ManagerController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Auth::routes(['verify' => true]);

/*--------------------------------------------------------------------------
    common
--------------------------------------------------------------------------*/

Route::name('common.')->group(function () {
    // 多重送信エラー
    Route::get('/error', [CommonController::class, 'error'])->name('error');
});


/*--------------------------------------------------------------------------
    pages
--------------------------------------------------------------------------*/
Route::name('page.')->group(function () {
    // トップページ
    
    Route::get('/', [PageController::class, 'top'])->name('top');;
    // 利用規約
    Route::get('/terms', [PageController::class, 'terms'])->name('terms');
    // プライバシーポリシー
    Route::get('/privacy-policy', [PageController::class, 'privacy'])->name('privacy');
    // お問い合わせ
    Route::get('/contact-us', [PageController::class, 'contactCreate'])->name('contact');
    Route::post('/contact-us', [PageController::class, 'contactPost'])->name('contact.post');
    // お問い合わせ完了
    Route::get('/contact-us/thanks', [PageController::class, 'contactComplete'])->name('contact.complete');
});


/*--------------------------------------------------------------------------
    新規登録フロー
--------------------------------------------------------------------------*/
/* ユーザーメール認証機能 */
Route::get('register-user/', [RegisteredUserController::class, 'create'])->name('register.user');
/* ショップメール認証機能 */
Route::get('register-shop/', [RegisteredUserController::class, 'create'])->name('register.shop');
Route::post('register-user', [RegisteredUserController::class, 'store'])->name('register.user.post');
Route::post('register-shop', [RegisteredUserController::class, 'store'])->name('register.shop.post');

// ユーザー 登録フロー
// Route::prefix('register-user')->name('user.')->group(function () {
//     Route::get('/account', [AccountController::class, 'userAccount'])->name('account');
//     Route::post('/account', [AccountController::class, 'userAccountPost'])->name('account.post');
// });

// ショップ 登録フロー
// Route::prefix('register-shop')->name('shop.')->group(function () {
//     Route::get('/account', [AccountController::class, 'shopAccount'])->name('account');
//     Route::post('/account', [AccountController::class, 'shopAccountPost'])->name('account.post');
// });



/*--------------------------------------------------------------------------
    ユーザー：ログイン後の画面
--------------------------------------------------------------------------*/
// Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
//     return view('dashboard');
// })->name('dashboard');

Route::middleware(['auth:sanctum', 'verified'])->prefix('account')->name('account.')->group(function () {
    // Route::get('/post', [PostController::class, 'postIndex'])->name('post.index');
    Route::get('/post', function() {
        return view('accounts.index');
    });

    Route::get('/gps', [GpsController::class, 'index']);
    Route::get('/gps/detail/{id}', [GpsController::class, 'detail']);
    Route::get('/gps/new', [GpsController::class, 'new']);
    Route::post('/gps/api', [GpsController::class, 'getdata']);

    // チャットルームのページを返却
    Route::get('/chatroom', function() {
        return view("accounts.messages.index");
    });

    // Chatroomについて
    Route::get('/chatroom/page', 'ChatroomController@ChatroomRead');
    Route::get('/id', 'ChatroomController@AccountIdRead');

    // Messagesについて
    Route::get('/chat/{room_id}/{id}', 'MessageController@MessageRead');
    Route::get('/user/{id}', 'MessageController@getUser');
    Route::get('/myself/{id}', 'MessageController@getMyself');

    Route::post('/chat/sendMessage', 'MessageController@SendMessage');
    Route::post('/chat/sendImage', 'MessageController@SendImage');
    Route::get('/mypage', [RequestController::class,'index']);
    Route::get('/request/new/type', [RequestController::class,'newtype']);
    Route::get('/request/new/vehicle', [RequestController::class,'new_vehicle']);
    Route::get('/request/new/image', [RequestController::class,'new_image']);
    Route::get('/request/new/detail', [RequestController::class,'new_detail']);
    Route::get('/request/new/request', [RequestController::class,'new_request']);
    Route::get('/request/new/complete', [RequestController::class,'view_new_complete']); 
    Route::post('/request/new/complete', [RequestController::class,'new_complete']);

    //Comment post Route
    Route::get('/post/comment/{id}' , [PostController::class, 'comment']);
    Route::post('/post/api' , [PostController::class, 'getData']);
    Route::post('/post/addcomment' , [PostController::class, 'storeComment']);

    // Route::get('{all}', function() {
    //     return view('accounts.index');
    // })->where(['all' => '.*']);
    Route::get('/{any}', function () {
        return view('accounts.messages.index');
    })->where('any','.*');
});

Route::middleware(['auth:sanctum', 'verified'])->prefix('shop')->name('shop.')->group(function () {
    Route::get('/{any}', function () {
        return view('shops.index');
    })->where('any','.*');
});

// Route::get('/', function () {
//     return view('app');
// });

// Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
//     return view('dashboard');
// })->name('dashboard');


// Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
//     return view('dashboard');
// })->name('dashboard');


// Route::get('/{any}', function(){
//     return view('Index');
// })->where('any', '.*');


// Auth::routes();
// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/motasapo-admin/login', [LoginController::class, 'admin_login'])->name('admin_login');
Route::post('/motasapo-admin/login', [LoginController::class, 'admin_check'])->name('admin.login');
Route::get('/motasapo-manager/user', [ManagerController::class, 'index'])->name('manager');