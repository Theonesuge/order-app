<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CrossMiddleware
{
    /**
     * @param Request $request
     * @param Closure $next
     * @return mixed
     * php artisan make:middleware CrossMiddleware
     * 创捷中间件
     * 配置跨域
     *
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        $origin = $request->server('HTTP_ORIGIN') ? $request->server('HTTP_ORIGIN') : '';
        $allow_origin = [
            'http://127.0.0.1:8080',//允许访问
        ];
        if (in_array($origin, $allow_origin)) {
            $response->header('Access-Control-Allow-Origin', $origin);
            $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
            $response->header('Access-Control-Expose-Headers', 'Authorization, authenticated');
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
            $response->header('Access-Control-Allow-Credentials', 'true');
        }
        return $response;
    }
}
/* 下面列出一些标准中可用的响应头和请求头。
Response Header
Access-Control-Allow-Origin : 指明哪些请求源被允许访问资源，值可以为 “*”，”null”，或者单个源地址。
Access-Control-Allow-Credentials : 指明当请求中省略 creadentials 标识时响应是否暴露。对于预请求来说，它表明实际的请求中可以包含用户凭证。
Access-Control-Expose-Headers : 指明哪些头信息可以安全的暴露给 CORS API 规范的 API。
Access-Control-Max-Age : 指明预请求可以在预请求缓存中存放多久。
Access-Control-Allow-Methods : 对于预请求来说，哪些请求方式可以用于实际的请求。
Access-Control-Allow-Headers : 对于预请求来说，指明了哪些头信息可以用于实际的请求中。
Origin : 指明预请求或者跨域请求的来源。
Access-Control-Request-Method : 对于预请求来说，指明哪些预请求中的请求方式可以被用在实际的请求中。
Access-Control-Request-Headers : 指明预请求中的哪些头信息可以用于实际的请求中。
Request Header
Origin : 表明发送请求或预请求的来源。
Access-Control-Request-Method : 在发送预请求时带该请求头，表明实际的请求将使用的请求方式。
Access-Control-Request-Headers : 在发送预请求时带有该请求头，表明实际的请求将携带的请求头。
Author:leedaning
*/
