<?php

use App\Http\Controllers\FoodsController;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});

/*
 * php artisan make:controller FoodsController
 * 创建食品路由
 * name给路由器起名
 */

// 创建路由组
Route::prefix('api')->group(function (){
    Route::get('/foods',[FoodsController::class, 'index'])->name('foods.index');
});

