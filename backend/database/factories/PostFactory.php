<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;
    private static int $sequence = 1;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        static $password;
        return [
            'type'           => function() { return rand(0, 1); },
            'account_id'     => function () { return 1; },
            'text'           => $this->faker->sentence,
            // 'limit_at'       => NULL,
            'limit_at'       => now(),
        ];
    }
}
