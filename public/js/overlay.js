
/*遮罩层*/
define(['jquery','nprogress'],function ($,nprogress) {
    //6.控制全局document遮罩
    $(document).ajaxStart(function () {
        $('.overlay').show();
    });
    $(document).ajaxStop(function () {
        $('.overlay').hide();
    });
    nprogress.start();
    nprogress.done();
});