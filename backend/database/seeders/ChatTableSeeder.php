<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Message;

class ChatTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $chat = new Message();
        $chat->room_id = 1;
        $chat->send_account_id = 1;
        $chat->receive_account_id = 2;
        $chat->text = "こんにちは";
        $chat->is_read = true;
        $chat->save();

        //
        $chat2 = new Message();
        $chat2->room_id = 1;
        $chat2->send_account_id = 2;
        $chat2->receive_account_id = 1;
        $chat2->text = "よろしくお願いします。";
        $chat2->is_read = true;
        $chat2->save();

    }
}
