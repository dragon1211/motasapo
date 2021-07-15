<?php

namespace Database\Factories;

use App\Models\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;

class ShopFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Shop::class;
    private static $sequence = 1;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'account_id' => function () { return self::$sequence++; },
            'tel'        => $this->faker->phoneNumber(),
            'url'        => $this->faker->url,
            'detail'     => $this->faker->sentence,
            'hour'       => $this->faker->sentence,
        ];
    }
}
