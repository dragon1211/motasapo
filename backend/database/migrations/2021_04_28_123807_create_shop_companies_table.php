<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateShopCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
    **/
    public function up()
    {
        Schema::create('shop_companies', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->foreignId('account_id')->constrained('accounts')->comment('アカウントID');
            $table->string('company', 255)->comment('会社名');
            $table->string('person', 100)->comment('担当者名');
            $table->string('post', 7)->comment('郵便番号');
            $table->foreignId('prefecture_id')->constrained('prefectures')->comment('都道府県ID');
            $table->string('address', 255)->comment('住所');
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
        Schema::dropIfExists('shop_companies');
    }
}
