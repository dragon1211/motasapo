<?php

namespace Database\Factories;

use App\Models\PostImage;
use Illuminate\Database\Eloquent\Factories\Factory;
// use Illuminate\Support\Int;

class PostImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PostImage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'post_id'        => 1,
            'url'            => '/storage/base/sample_human1.png',
            'created_at'     => now(),
            'updated_at'     => now(),
        ];
    }
}
