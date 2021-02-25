<?php

namespace App\Http\Controllers;

// 返回类型声明
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
// 导入DB
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    //用户控制器

    public function index()
    {
        return view('login.index');
    }

    /* 用户登录 */
    public function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');
        $remember = $request->input('remember');
        $user = DB::table("users")->get();
        for ($i = 0;$i < count($user);$i++){
            if($user[$i]->name !== $username || $user[$i]->password !== $password){
                return redirect('/login')->with('error','用户名或密码错误，请重新输入');
            }else{
                if($remember === "on"){
                    $request->session()->put('password',$password);
                }else{
                    $request->session()->pull('password',session('password'));
                }
                $request->session()->put('username',$username);
                return redirect('/login')->with('success','登录成功');
            }
        }
        return false;
    }

    /* 退出登录 */
    public function logout(Request $request)
    {
        //判断session里面是否有值
        if($request->session()->has('username')){
            //移除session
            $request->session()->pull('username',session('username'));
            return redirect('/login')->with('out','退出成功');
        }
    }
}
