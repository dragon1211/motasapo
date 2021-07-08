<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// 429 (Too Many Requests)のエラー解消コード
Route::middleware(['throttle:seventy'])->group(function() {
    // カテゴリーAPI
    Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
    // ショップAPI
    Route::apiResource('shops', ShopController::class)->only(['index', 'show']);
    // ショップAPI
    Route::apiResource('posts', PostController::class)->only(['index', 'show']);
});

// カテゴリーAPI
// Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
