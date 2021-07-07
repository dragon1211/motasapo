<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Front\AccountController;
use App\Http\Controllers\Front\PageController;
use App\Http\Controllers\Front\CommonController;
use App\Http\Controllers\Front\Account\PostController;

use Laravel\Fortify\Http\Controllers\RegisteredUserController;

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
Route::post('register-user', [RegisteredUserController::class, 'store'])->name('register.user.post');
/* ショップメール認証機能 */
Route::get('register-shop/', [RegisteredUserController::class, 'create'])->name('register.shop');
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
    // Route::get('/post', function() {
    //     return view('accounts.index');
    // });
    Route::get('{all}', function() {
        return view('accounts.index');
    })->where(['all' => '.*']);
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
