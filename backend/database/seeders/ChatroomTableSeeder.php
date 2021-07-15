<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chatroom;

class ChatroomTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $cr = new Chatroom();
        $cr->user1 = 1;
        $cr->user2 = 2;
        $cr->save();
        //
        $cr2 = new Chatroom();
        $cr2->user1 = 1;
        $cr2->user2 = 3;
        $cr2->save();
        //
        $cr3 = new Chatroom();
        $cr3->user1 = 2;
        $cr3->user2 = 3;
        $cr3->save();
    }
}
