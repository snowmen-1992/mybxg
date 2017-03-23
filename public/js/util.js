/*工具方法*/
define(['jquery'],function ($) {

    //设置点击菜单选中状态
    return{
        setMenu:function (pathname) {
            //当pathname地址与地址栏一样时，添加类样式
            $('.navs a[href="'+pathname+'"]').addClass('active');
        },
        
        qs : function(pname){
            var pathname = location.search;
            var pathname = pathname.slice(1);
            var obj = {};
            if(pathname){
                var arr = pathname.split('&');
                for (var i = 0; i < arr.length; i++) {
                    var kv = arr[i].split('=');
                    // 把所有的参数键值对都放到对象中
                    obj[kv[0]] = kv[1];
                }
            }
            return obj[pname];
        }
    }
});