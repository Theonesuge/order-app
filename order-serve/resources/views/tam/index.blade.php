@extends('layouts.layout')

@section('content')
    <div style="padding: 28px;background-color: #FFFFFF;margin-left: 40px;margin-top: 20px;width: 1200px">
        {{-- 搜索 --}}
        <div class="layui-inline" style="margin-bottom: 15px">
            <input class="layui-input" name="id" id="demoReload" autocomplete="off" placeholder="请输入订单名称...">
        </div>
        <button style="margin-bottom: 15px" class="layui-btn layui-btn-normal" data-type="reload"><i class="layui-icon layui-icon-search"></i>搜索</button>
        {{-- 表格 --}}
        <table class="layui-table" lay-data="{width: 1200, height:405, url:'/json/foods.json', page:true, id:'idTest'}" lay-filter="foods">
            <thead>
            <tr>
                <th lay-data="{field:'id', width:80, sort: true, align:'center', fixed: 'left'}">ID</th>
                <th lay-data="{field:'username', width:260, align:'center'}">订单编号</th>
                <th lay-data="{field:'type', width:100, sort: true, align:'center'}">用户名</th>
                <th lay-data="{field:'price', width:180, sort: true, align:'center'}">电话号码</th>
                <th lay-data="{field:'price', width:260, sort: true, align:'center'}">订单列表</th>
                <th lay-data="{field:'create_time', width:218, sort: true, align:'center'}">创建时间</th>
                <th lay-data="{width:160, align:'center', toolbar: '#barFoods', fixed: 'right',}"></th>
            </tr>
            </thead>
        </table>
    </div>

    <script type="text/html" id="barFoods">
        <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon layui-icon-ok-circle"></i>完成</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon layui-icon-logout"></i>退单</a>
    </script>
@endsection

