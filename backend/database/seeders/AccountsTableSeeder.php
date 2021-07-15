<?php

namespace Database\Seeders;

use App\Models\Account;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Account::factory()->count(19)->create();
        Account::create([
            'email'             => 'account@account.account',
            'email_verified_at' => now(),
            'password'          => Hash::make('password'),
            'account'           => 'account',
            'type'              => '0',
            'name'              => '名前',
            'profile'           => 'プロフィール',
            'last_login_at'     => now(),
            'created_at'        => now(),
            'updated_at'        => now(),
        ]);
    }
}
