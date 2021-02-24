@extends('layouts.layout')

@section('content')
    <div style="margin-top: 28px">
    <form class="layui-form" action="">
        <div class="layui-form-item">
            <label class="layui-form-label">食品名称</label>
            <div class="layui-input-block">
                <input type="text" name="title" lay-verify="title" lay-reqtext="食品名称不能为空" autocomplete="off" placeholder="请输入食品名称" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">食品价格</label>
            <div class="layui-input-block">
                <input type="text" name="price" lay-verify="required" lay-reqtext="食品价格不能为空" placeholder="请输入食品价格" autocomplete="off" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">食品类型</label>
            <div class="layui-input-block">
                <select name="interest" lay-filter="aihao">
                    <option value="" selected=""></option>
                    <option value="0" >饮料</option>
                    <option value="1">面包</option>
                    <option value="2">奶茶</option>
                    <option value="3">米粉</option>
                    <option value="4">米饭</option>
                </select>
            </div>
        </div>

        <div class="layui-form-item">
            <div class="layui-input-block">
                <button type="submit" class="layui-btn" lay-submit="" lay-filter="demo1">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>
    </div>
@endsection

