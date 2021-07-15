<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Message;
use App\Models\Account;

class MessageController extends Controller
{
    // メッセージ受信
    public function MessageRead($room_id, $id)
    {
        $lists = Message::where([
            ['room_id', $room_id],
            ['is_read', false],
            ['send_account_id', '<>', $id]
        ])
        ->get();

        foreach($lists as $list){
            $mes = Message::find($list->id);
            $mes->is_read = 1;
            $mes->save();
        }

        $messages = DB::table('messages')
            ->where("room_id", "=", $room_id)
            ->get();

        return $messages;
    }

    // メッセージ送信
    public function SendMessage(Request $request){
        $data = new Message();
        $data->send_account_id = $request->send_account_id;
        $data->receive_account_id = $request->receive_account_id;
        $data->room_id = $request->room_id;
        $data->is_read = $request->is_read;
        $data->text = $request->text;
        $data->save();

        return $data;
    }
    // 画像送信
    public function SendImage(Request $request){
        $file_name = $request->file('image')->getClientOriginalName();
        $request->file('image')->storeAs('public/message', $file_name);

        $data = new Message();
        $data->send_account_id = $request->send_account_id;
        $data->receive_account_id = $request->receive_account_id;
        $data->room_id = $request->room_id;
        $data->is_read = $request->is_read;
        $data->img = $file_name;
        $data->save();

        return $data;
    }

    public function getUser($id){
        $user = Account::find($id);
        return $user;
    }
    public function getMyself($id){
        $user = Account::find($id);
        return $user;
    }
}
