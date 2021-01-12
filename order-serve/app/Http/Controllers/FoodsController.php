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
    public function index(): JsonResponse
    {
        // 获取全部食品数据 需要加上请求方式get、post、put、delete
        $foods = DB::table("foods")->get();
        /* 返回json数据 */
        return response()->json($foods);
    }
}
