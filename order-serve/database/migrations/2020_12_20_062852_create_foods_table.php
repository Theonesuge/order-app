<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * php artisan make:migration create_foods_table
         * 创建迁移文件(foods)
         * php artisan make:migration add_想要添加的字段名_to_foods_table
         * php artisan migrate:status
         * migrations 数据库表信息
         * php artisan migrate:rollback
         * 回滚到最近一次运行的迁移任务
         * php artisan migrate:reset
         * 回滚所有的数据库迁移
         * php artisan migrate:refresh
         * 重置并重新运行所有的 migrations
         */
        Schema::create('foods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('price');
            $table->string('details');
            $table->integer('sale');
            $table->boolean('stock');
            $table->integer('praise');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('foods');
    }
}
