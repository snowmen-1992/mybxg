/*工具方法*/
define(['jquery'],function ($) {

    //设置点击菜单选中状态
    return{
        setMenu:function (pathname) {
            //当pathname地址与地址栏一样时，添加类样式
            $('.navs a[href="'+pathname+'"]').addClass('active');
        }
    }
});