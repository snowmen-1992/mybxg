
//控制菜单
$('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
});

//没有登录的时候跳转到登录页面
var pathname = location.pathname;
console.log(pathname);
//没有登录的时候跳转到登录页面
var flag = $.cookie('PHPSESSID');
if(!flag && pathname.indexOf('login') == -1){
    // 没有登录
    location.href = '/login';
}