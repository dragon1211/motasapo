<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shops', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->foreignId('account_id')->constrained('accounts')->comment('アカウントID');
            $table->string('tel', 20)->comment('電話番号');
            $table->string('url', 255)->nullable()->comment('URL');
            $table->string('detail', 1000)->nullable()->comment('詳細');
            $table->string('hour', 1000)->nullable()->comment('営業時間・休日');
            $table->string('post', 7)->nullable()->comment('郵便番号');
            $table->string('address1', 255)->nullable()->comment('住所1');
            $table->string('address2', 255)->nullable()->comment('住所2');
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
        Schema::dropIfExists('shops');
    }
}
