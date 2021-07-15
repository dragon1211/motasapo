<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AccountsTableSeeder::class);
        $this->call(AdminsTableSeeder::class);
        $this->call(ShopsTableSeeder::class);
        $this->call(PostsTableSeeder::class);
        $this->call(PostImagesTableSeeder::class);
        $this->call(PostLikesTableSeeder::class);
        $this->call(PostTagsTableSeeder::class);
        $this->call(PostViewsTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(PrefecturesTableSeeder::class);
        $this->call(LocationTableSeeder::class);
    }
}
