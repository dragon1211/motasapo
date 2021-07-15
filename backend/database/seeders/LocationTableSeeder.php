<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = DB::table('accounts')->get('id');
        
        foreach($user as $item){
            $value = $item->id;
            $lat = rand(3539300, 3539800)/100000;
            $lng = rand(13869000, 13869800)/100000;
            $locate = (string)$lat.', '.$lng;
            DB::table('locations')->insert(['account_id'=> $value, 'location'=>$locate, 'created_at'=>now(), 'updated_at'=>now()]);
        }

        foreach($user as $item){
            $value = $item->id;
            $rand = rand(1, 10);
            if($rand%2==0) $sex='w';
            else $sex='m';
            DB::table('users')->insert(['account_id'=> $value, 'sex'=> $sex, 'created_at'=>now(), 'updated_at'=>now()]);
        }
    }
}
