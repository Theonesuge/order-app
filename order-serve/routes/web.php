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

// 视图路由器
//Route::get('/', function () {
//    return view('welcome');
//});

//Route::get('/', function () {
//    return view('home');
//});

Route::get('/',[FoodsController::class, 'home'])->name('home.home');

Route::get('/login', function () {
    return view('login.index');
});

Route::get('/allFoods',[FoodsController::class, 'allFoods'])->name('allFoods.allFoods');
Route::get('/addFoods',[FoodsController::class, 'addFoods'])->name('addFoods.addFoods');

Route::get('/tam', function () {
    return view('tam.index');
});

/*
 * php artisan make:controller FoodsController
 * 创建食品路由
 * name给路由器起名
 */

// 创建路由组(api)
Route::prefix('api')->group(function (){
    Route::get('/foods',[FoodsController::class, 'index'])->name('foods.index');
});

