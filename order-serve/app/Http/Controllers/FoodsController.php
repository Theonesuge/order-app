<?php

namespace App\Http\Controllers;

// 返回类型声明
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
// 导入DB
use Illuminate\Support\Facades\DB;

class FoodsController extends Controller
{
    //食品控制器

    /* 首页 */
    public function home(Request $request)
    {
        if($request->session()->has('username')){
            return view('home');
        }else {
            return redirect('/login');
        }
    }

    /* 展示所有食品 */
    public function allFoods()
    {
        $foods = DB::table("foods")->get();
        return view('foods.index',['foods'=>$foods]);
    }

    /* 添加食品 */
    public function addFoods()
    {
        return view('foods.add');
    }

    /* 食品订单 */
    public function tam()
    {
        return view('tam.index');
    }

    // 食品api接口
    public function index(): JsonResponse
    {
        // 获取全部食品数据 需要加上请求方式get、post、put、delete
        $foods = DB::table("foods")->get();
        /* 返回json数据 */
        return response()->json($foods);
    }
}
