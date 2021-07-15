<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement()->comment('ID');
            $table->string('email', 255)->unique()->comment('メールアドレス');
            $table->datetime('email_verified_at')->nullable()->comment('メール認証');
            $table->string('password', 255)->comment('パスワード');
            $table->string('account', 50)->unique()->nullable()->comment('アカウント名');
            $table->boolean('type')->nullable()->comment('アカウントタイプ');
            $table->string('name', 100)->nullable()->comment('お名前');
            $table->string('profile', 1000)->nullable()->comment('プロフィール');
            $table->string('img', 100)->nullable()->comment('プロフィール画像');
            $table->rememberToken()->nullable();
            $table->dateTime('last_login_at')->comment('最終ログイン');
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
        Schema::dropIfExists('accounts');
    }
}
