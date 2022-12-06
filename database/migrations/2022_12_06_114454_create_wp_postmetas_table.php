<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWpPostmetasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('wp_postmetas', function (Blueprint $table) {
      $table->id();
      $table->string('meta_id')->nullable();
      $table->string('post_id')->nullable();
      $table->string('meta_key')->nullable();
      $table->text('meta_value')->nullable();
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
    Schema::dropIfExists('wp_postmetas');
  }
}
