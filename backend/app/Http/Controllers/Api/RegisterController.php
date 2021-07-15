<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function index() {
        echo "OJOJO";
    }
    public function user_store(Request $request) {
        $result = $request->all();
        var_dump($result);
    }
    public function shop_store(Request $request) {
        echo "SHOP";
    }
}
