<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chatroom;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ChatroomController extends Controller
{
    public function AccountIdRead()
    {
        return Auth::id();
    }

    //
    public function ChatroomRead()
    {
        $id = Auth::id();
        $cahtrooms = DB::table('chatrooms')
            ->where('user1', "=", $id)
            ->orWhere('user2', "=", $id)
            ->get();

        $array = [];

        foreach($cahtrooms as $chatroom){
            if($chatroom->user1 != $id){
                $user = DB::table('accounts')
                    ->select("name", "last_login_at", "img")
                    ->where("id", "=",  $chatroom->user1)
                    ->get();

                $mes = DB::table('messages')
                    ->select('is_read')
                    ->where('room_id', $chatroom->id)
                    ->orderBy('created_at', 'desc')->first();

                array_push($array, ((object) array_merge((array) $chatroom, (array) $user[0], (array) $mes)));
            }else{
                $user = DB::table('accounts')
                    ->select("name", "last_login_at", "img")
                    ->where("id", "=",  $chatroom->user2)
                    ->get();

                $mes = DB::table('messages')
                    ->select('is_read', 'receive_account_id')
                    ->where('room_id', $chatroom->id)
                    ->orderBy('created_at', 'desc')->first();

                array_push($array, ((object) array_merge((array) $chatroom, (array) $user[0], (array) $mes)));
            }
        }
        // var_dump($array);
        return $array;
    }
}
