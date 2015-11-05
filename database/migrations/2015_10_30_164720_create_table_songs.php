<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSongs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('songs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('title_translit');
            $table->string('artist');
            $table->string('credit');
            $table->decimal('offset');
            $table->string('music');
            $table->string('background');
            $table->string('bg_artist');
            $table->text('bpms');
            $table->text('notes_easy');
            $table->text('notes_medium');
            $table->text('notes_hard');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('songs');
    }
}
