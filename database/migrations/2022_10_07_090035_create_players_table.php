<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlayersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('players', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('avatar')->nullable();
      $table->integer('rating');
      $table->integer('rank');
      $table->string('title')->nullable();
      $table->string('country');
      $table->string('flag');
      $table->boolean('global');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('players');
  }
}
