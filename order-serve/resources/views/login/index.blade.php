<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>登录</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    {{-- 引入layui --}}
    <link  href="{{asset('layui/css/layui.css')}}" rel="stylesheet">
    {{-- 自定义样式表 --}}
    <link href="/css/main.css" rel="stylesheet">
    <style>
        body{
            width: 100%;
            min-height: 100%;
            background: #f0f2f5 url("/images/background.svg") no-repeat 50%;
            background-size: 100%;
            padding: 80px 0 150px;
        }
    </style>
</head>
<body>

<div class="login">
    <h1 style="font-size: 21px;color: #333333;text-align: center">某餐厅点餐系统</h1>
    <p style="font-size: 15px;color: #999999;text-align: center;margin: 15px 0 28px 0">基于点餐小程序的后台管理系统</p>
    <form class="layui-form" action="/userLogin" method="POST">
        @csrf
        <div class="layui-form-item">
            <div class="layui-input-block">
                <label class="login-icon layui-icon layui-icon-username"></label>
                <input type="text" name="username" lay-verify="username" autocomplete="off" placeholder="用户名" class="layui-input input-username">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <label class="login-icon layui-icon layui-icon-password"></label>
                <input type="password" name="password" lay-verify="password" placeholder="密码" value="{{session('password')}}" autocomplete="off" class="layui-input input-pwd">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <label class="login-icon layui-icon layui-icon-vercode"></label>
                <input style="width: 210px;float: left" type="text" name="vercode" lay-verify="vercode" placeholder="图形验证码" autocomplete="off" class="layui-input input-vercode">
                <canvas style="float: right;background: #ffffff;" id="canvas" width="108" height="38"></canvas>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <input type="checkbox" name="remember" lay-skin="primary" title="记住密码">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button type="submit" class="layui-btn layui-btn-fluid" lay-submit="" >登入</button>
            </div>
        </div>
    </form>
</div>
<div class="layadmin-user-login-footer">
    <p style="text-align: center">© 2020 某餐厅点餐管理系统</p>
</div>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="{{asset('layui/layui.js')}}"></script>
<script>

    let show_num = [];
    $(function () {
        draw(show_num);
        $("#canvas").on('click',function (){
            draw(show_num);
        })
    })

    function draw(show_num) {
        var canvas_width = $('#canvas').width();
        var canvas_height = $('#canvas').height();
        var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
        canvas.width = canvas_width;
        canvas.height = canvas_height;
        var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
        var aCode = sCode.split(",");
        var aLength = aCode.length;//获取到数组的长度

        for (var i = 0; i <= 3; i++) {
            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
            var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
            var txt = aCode[j];//得到随机的一个内容
            show_num[i] = txt.toLowerCase();
            var x = 10 + i * 20;//文字在canvas上的x坐标
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);
            context.rotate(deg);

            context.fillStyle = randomColor();
            context.fillText(txt, 0, 0);

            context.rotate(-deg);
            context.translate(-x, -y);
        }
        for (var i = 0; i <= 5; i++) { //验证码上显示线条
            context.strokeStyle = randomColor();
            context.beginPath();
            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
            context.stroke();
        }
        for (var i = 0; i <= 30; i++) { //验证码上显示小点
            context.strokeStyle = randomColor();
            context.beginPath();
            var x = Math.random() * canvas_width;
            var y = Math.random() * canvas_height;
            context.moveTo(x, y);
            context.lineTo(x + 1, y + 1);
            context.stroke();
        }
    }

    function randomColor() {//得到随机的颜色值
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    layui.use(['form','layer'], function(){

        let form = layui.form
        //自定义验证规则
        form.verify({
            username: function(value){
                if(value === ''){
                    return '请输入用户名';
                }else if (value.length < 2){
                    return '用户名至少得2个字符';
                }
            },
            password:[
                    /^[\S]{6,12}$/
                    ,'密码不能为空，密码必须6到12位，且不能出现空格'
                ],
            vercode: function(value){
                let num = show_num.join("");
                if(value === ''){
                    return '验证码不能为空';
                }else if(value.length !== 4){
                    return '验证码应为4个字符';
                }else if(value.toLowerCase() !== num){
                    return '验证码有误，请重新输入';
                }
            }
        });

        // 登录错误提示
        if("{{session('error')}}"){
            layer.msg("{{session('error')}}")
        }

        // 登录成功提示
        if("{{session('success')}}"){
            layer.msg("{{session('success')}}")
            setTimeout(()=>{
                window.location.href="/";
            },3000)
        }

        // 退出成功提示
        if("{{session('out')}}"){
            layer.msg("{{session('out')}}")
        }

        // 监听提交
        // form.on('submit(login)', function(data){
        //     layer.alert(JSON.stringify(data.field), {
        //         title: '最终的提交信息'
        //     })
        //     return false;
        // });
    });
</script>

</body>
</html>

