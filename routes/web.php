<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', [HomeController::class, 'crawler']);
//Default page, to show get url page
Route::get('/', [HomeController::class, 'index']);

//Route::post('/crawl', [HomeController::class, 'gouttecrawler']);

//post data
Route::post('storeData', [PostController::class, 'index']);
