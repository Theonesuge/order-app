<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>某餐厅点餐管理系统</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    {{-- 引入layui --}}
    <link  href="{{asset('layui/css/layui.css')}}" rel="stylesheet">
    {{-- 自定义样式表 --}}
    <link href="/css/main.css" rel="stylesheet">
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header layui-bg-cyan">
        <div class="layui-logo" style="color: #FFFFFF">
            <img style="margin-top: -5px" src="/images/logo.png" width="35px" height="35px" alt="logo">
            <span>某餐厅点餐管理系统</span>
        </div>
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item" lay-unselect="">
                <a lay-href="app/message/index.html" layadmin-event="message" lay-text="消息中心">
                    <i class="layui-icon layui-icon-notice"></i>

                    <!-- 如果有新消息，则显示小圆点 -->
                    <span class="layui-badge-dot"></span>
                </a>
            </li>
            <li class="layui-nav-item">
                <a href="javascript:;">管理员</a>
                <dl class="layui-nav-child">
                    <dd><a href="">基本资料</a></dd>
                    <dd><a href="">退出登录</a></dd>
                </dl>
            </li>
            <li class="layui-nav-item layui-hide-xs" lay-unselect="">
                <a href="javascript:;" layadmin-event="fullscreen">
                    <i class="layui-icon layui-icon-screen-full"></i>
                </a>
            </li>
        </ul>
    </div>

    <div class="layui-side layui-bg-cyan">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree layui-bg-cyan" lay-filter="nav">
                <li class="layui-nav-item"><a href="{{route('home.home')}}"><i class="layui-icon layui-icon-home" style="font-size: 15px; color: #1E9FFF;margin-right: 5px"></i>首页</a></li>
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;"><i class="layui-icon layui-icon-app" style="font-size: 15px; color: #1E9FFF;margin-right: 5px"></i>管理</a>
                    <dl class="layui-nav-child">
                        <dd><a href="{{route('allFoods.allFoods')}}">食品管理</a></dd>
                        <dd><a href="javascript:;">订单管理</a></dd>
                        <dd><a href="javascript:;">账号管理</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item"><a href="{{route('addFoods.addFoods')}}"><i class="layui-icon layui-icon-add-1" style="font-size: 15px; color: #1E9FFF;margin-right: 5px"></i>发布食品</a></li>
            </ul>
        </div>
    </div>

    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div class="layui-card">
            <div style="padding: 15px 40px;font-size: 20px" class="layui-breadcrumb">
                <a href="">首页</a>
                <a href="">国际新闻</a>
                <a href="">亚太地区</a>
                <a><cite>正文</cite></a>
            </div>
        </div>
        @yield('content')
    </div>
</div>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="{{asset('layui/layui.js')}}"></script>
<script>
layui.use('element', function(){
    let element = layui.element;
});
// 使用表格
layui.use('table', function(){
    let table = layui.table;
    //监听工具条
    table.on('tool(foods)', function(obj){
        var data = obj.data;
        console.log(data)
        if(obj.event === 'detail'){
            layer.msg('ID：'+ data.id + ' 的查看操作');
        } else if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            layer.alert('编辑行：<br>'+ JSON.stringify(data))
        }
    });
});


</script>
</body>
</html>
