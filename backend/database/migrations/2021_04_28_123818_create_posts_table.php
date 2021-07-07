<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->boolean('type')->comment('投稿タイプ');
            $table->foreignId('account_id')->constrained('accounts')->comment('アカウントID');
            $table->string('text', 255)->comment('投稿テキスト');
            $table->dateTime('limit_at', $precision = 0)->nullable();
            $table->dateTime('created_at', $precision = 0)->nullable();
            $table->dateTime('updated_at', $precision = 0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
