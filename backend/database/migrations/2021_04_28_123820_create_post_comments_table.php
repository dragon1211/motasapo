<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_comments', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->unsignedBigInteger('comment_id')->default(null)->comment('親コメントID');
            $table->foreignId('post_id')->constrained('posts')->comment('投稿ID');
            $table->foreignId('account_id')->constrained('accounts')->comment('投稿者ID');
            $table->string('comment', 2200)->comment('コメント');
            $table->boolean('is_read')->comment('未読・既読');
            $table->dateTime('created_at', $precision = 0)->nullable();
            $table->dateTime('updated_at', $precision = 0)->nullable();
            $table->dateTime('deleted_at', $precision = 0)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_comments');
    }
}
