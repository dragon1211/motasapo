<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RegenerateToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // POST時の二重送信処理を停止
        // if ($request->method() === 'POST') {
        //     // POSTのときだけトークンリフレッシュをしformの多重送信を防ぐ
        //     $request->session()->regenerateToken();
        // }

        return $next($request);
    }
}
