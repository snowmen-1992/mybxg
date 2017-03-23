
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
        datepicker:'assets/bootstrap-datepicker/js/bootstrap-datepicker',
        language:'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        validate:'assets/validate/jquery-validate',
        form:'assets/jquery-form/jquery.form',
        ckeditor:'assets/ckeditor/ckeditor',
        region:'assets/jquery-region/jquery-region',
        
    },
    shim:{
        bootstrap:{
            // 把bootstrap转成标准模块（依赖于标准的jQuery模块）
            deps : ['jquery']
        },
        language:{
            
            deps : ['jquery','datepicker']
        },
        validate:{
            deps : ['jquery']
        },
        ckeditor : {
            exports : 'CKEDITOR',
            deps : ['jquery']
        }
    }
});
