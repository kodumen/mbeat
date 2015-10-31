<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/play/{song}/{difficulty}', 'GameController@play')
    ->where('song', '[[:digit:]]+')
    ->where('difficulty', '(easy)|(medium)|(hard)');

Route::get('/song/{song}/{difficulty}', 'SongController@getNotes')
    ->where('song', '[[:digit:]]+')
    ->where('difficulty', '(easy)|(medium)|(hard)');

// auth.basic uses email for the username field [0]
Route::group(['middleware' => 'auth.basic'], function () {
    Route::get('/admin', 'AdminController@index');
    Route::post('/admin/song/add', 'SongController@add');
});

/*
 * NOTES:
 * [0] http://laravel.com/docs/5.1/authentication#http-basic-authentication
 */
