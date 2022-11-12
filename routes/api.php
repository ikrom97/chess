<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PlayersController;
use App\Http\Controllers\TournamentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{slug}', [ArticleController::class, 'show']);

Route::get('news', [NewsController::class, 'index']);
Route::get('news/{slug}', [NewsController::class, 'show']);

Route::get('players', [PlayersController::class, 'index']);

Route::get('tournaments', [TournamentController::class, 'index']);
Route::get('tournaments/{slug}', [TournamentController::class, 'show']);

Route::get('login', [AuthController::class, 'check']);
Route::post('login', [AuthController::class, 'login']);
Route::delete('login', [AuthController::class, 'logout']);
