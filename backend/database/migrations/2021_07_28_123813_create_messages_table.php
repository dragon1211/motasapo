<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->unsignedBigInteger('room_id');
            $table->foreignId('send_account_id')->constrained('accounts')->comment('送信者アカウントID');
            $table->foreignId('receive_account_id')->constrained('accounts')->comment('受信者アカウントID');
            $table->string('text', 1000)->nullable()->comment('メッセージテキスト');
            $table->string('img', 255)->nullable()->comment('メッセージ画像');
            $table->boolean('is_read');
            $table->dateTime('created_at', $precision = 0)->nullable();
            $table->dateTime('updated_at', $precision = 0)->nullable();
            $table->dateTime('deleted_at', $precision = 0)->nullable();

            $table->foreign('room_id')
                ->references('id')
                ->on('chatrooms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
