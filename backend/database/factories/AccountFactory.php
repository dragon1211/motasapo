<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AccountFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Account::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        static $password;
        return [
            'email'             => $this->faker->unique()->safeEmail,
            'email_verified_at' => now(),
            'password'          => $password ?: $password = bcrypt('password'),
            'account'           => Str::random(10),
            'type'              => 1,
            'name'              => $this->faker->name,
            'profile'           => $this->faker->sentence,
            'img'               => '/storage/base/logo-square.png',
            'last_login_at'     => now(),
            'created_at'        => now(),
            'updated_at'        => now(),
        ];
    }
}
