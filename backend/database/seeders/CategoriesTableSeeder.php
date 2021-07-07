<?php

namespace Database\Seeders;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('categories')->truncate();

        $datas = [
            '1'  => 'カスタム（車）',
            '2'  => 'カスタム（バイク）',
            '3'  => '板金修理（車）',
            '4'  => '板金修理（バイク）',
            '5'  => '車販売',
            '6'  => 'バイク販売',
            '7'  => '車買取',
            '8'  => 'バイク買取',
            '9'  => 'ロードサービス（車）',
            '10' => 'ロードサービス（バイク）',
            '11' => '車検（車）',
            '12' => '車検（バイク）',
            '13' => 'カーラッピング',
            '14' => 'ワンオフエアロ制作',
            '15' => 'タイヤ販売（車）',
            '16' => 'タイヤ販売（バイク）',
            '17' => 'パーツ販売（車）',
            '18' => 'パーツ販売（バイク）',
        ];

        foreach ( $datas as $key => $value ) {
            DB::table('categories')->insert([
                'id' => $key,
                'name' => $value,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
