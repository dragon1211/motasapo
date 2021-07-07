<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Support\Facades\Auth;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Register the exception handling callbacks for the application.
     */
    public function render($request, Throwable $exception)
    {
        // 飛んできた例外がTokenMismatchExceptionのインスタンスなら(csrf起因の例外なら)
        if($exception instanceof \Illuminate\Session\TokenMismatchException){
        //二回の条件文で管理者ユーザーだけを特定し、管理者用のエラー画面と通常のエラー画面に分岐させる
        if(Auth::check()){
            if(Auth::user()->user_type == UserTypeConst::ADMIN){
                // return redirect()->route('page.top');
                return redirect()->route('admin.error');
            }
        }
        // お問い合せページにリダイレクト
        return redirect()->route('common.error');
        // return redirect()->route('common.error');
        }
        return parent::render($request, $exception);
    }
}
