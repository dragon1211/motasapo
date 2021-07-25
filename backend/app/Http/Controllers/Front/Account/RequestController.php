<?php

namespace App\Http\Controllers\Front\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    public function index()
    {
        return view('accounts.requests.index');
    } 
    
    public function newtype()
   {
       return view('accounts.requests.new_type'); 
   }

   public function new_vehicle()
   {
       return view('accounts.requests.new_vehicle');
   }

   public function new_image()
   {
       return view('accounts.requests.new_image');
   }

   public function new_detail()
   {
       return view('accounts.requests.new_detail');
   }

   public function new_complete(Request $request)
   {
       $wish = $request->wish;
     return response()->json(["msg"=>"eee"]);
    
   } 
   public function view_new_complete()
   {
        return view('accounts.requests.new_complete');
   }
}
