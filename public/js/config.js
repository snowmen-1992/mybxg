
//requirejs只能用来管理js
require.config({
    //RequireJS以一个相对于baseUrl的地址来加载所有的代码
   baseUrl:'/public',
    paths:{
        jquery:'assets/jquery/jquery.min',
        cookie:'assets/jquery-cookie/jquery.cookie',
        echarts:'assets/echarts/echarts.min',
        template:'assets/artTemplate/template',
        bootstrap:'assets/bootstrap/js/bootstrap',
        util:'js/util',
        overlay:'js/overlay',
        nprogress:'assets/nprogress/nprogress',
        
    },
    shim:{
        bootstrap:{
            // 把bootstrap转成标准模块（依赖于标准的jQuery模块）
            deps : ['jquery']
        },
    }
});
