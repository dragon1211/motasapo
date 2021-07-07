<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->foreignId('account_id')->constrained('accounts')->comment('アカウントID');
            $table->boolean('type')->comment('リクエストタイプ');
            $table->boolean('target')->comment('対象物');
            $table->string('brand', 255)->comment('メッセージ画像');
            $table->string('vehicle', 255)->comment('メッセージ画像');
            $table->string('grade', 255)->comment('メッセージ画像');
            $table->string('color', 50)->comment('メッセージ画像');
            $table->string('mileage', 50)->comment('走行距離');
            $table->string('price', 100)->comment('金額');
            $table->foreignId('prefecture_id')->constrained('prefectures')->comment('都道府県ID');
            $table->string('remark', 1000)->nullable()->comment('備考');
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
        Schema::dropIfExists('requests');
    }
}
