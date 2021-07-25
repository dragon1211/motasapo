<?php

namespace Database\Seeders;

use App\Models\PostImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PostImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PostImage::create([
            'post_id'        => 1,
            'url'            => '/storage/base/sample_human1.png',
            'created_at'     => now(),
            'updated_at'     => now(),
        ]);
    }
}
