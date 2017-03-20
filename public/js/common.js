
//有返回值的放到前边，无返回值的放到后边
define(['jquery','echarts','cookie'],function ($,echarts) {
    //控制菜单
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    //1.没有登录的时候跳转到登录页面
    var pathname = location.pathname;
    console.log(pathname);
    //没有登录的时候跳转到登录页面
    var flag = $.cookie('PHPSESSID');
    //indexOf如果不存在返回
    if(!flag && pathname.indexOf('login') == -1){
        // 没有登录
        location.href = '/login';
    }

    //2.实现登录功能
    $('#loginForm').submit(function () {
        //首先按接口要求设置input 的name 属性：tc_name；tc_pass
        //获取表单中input的数据
        var formData = $(this).serialize();
        //console.log(formData);//得到字符串格式数据
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: formData,
            dataType: 'json',
            success: function (data) {
                //获取不到数据原因是因为没有开启反向代理，路径就会出现问题
                //console.log(data);
                if(data.code==200){
                    //console.log(data);
                    //获取具体的头像地址和名字
                    //console.log(data.result);
                    //把获取到的头像地址和名字转化成json格式的数据
                    var logInfo = JSON.stringify(data.result);
                    //创建一个cookie并设置 cookie的有效路径：
                    //$.cookie('the_cookie', 'the_value', { expires: 7, path: '/' });
                    // 实现cookie数据的跨页面共享
                    $.cookie('logInfo',logInfo,{path : '/'});
                    //登陆成功跳转到主页
                    location.href='/index/index';
                }
            },
            error: function (data) {
                console.log(data.responseText);
            }
        });
        //阻止表单默认跳转事件
        return false;
    });


    //3.登录成功后个人信息---cookie不需要返回值
    //cookie中所存的数据信息是字符串格式---因为登录页已经设置了cookie的内容，并且网页未关闭状态下，信息不回丢失
    //console.log($.cookie('logInfo'));
    //cookie中所存的数据信息转化成json格式
    var obj = JSON.parse($.cookie('logInfo'));
    //设置头像图片
    $('.aside>.profile>img').attr('src',obj.tc_avatar);
    //设置登录人名字
    $('.aside>.profile>h4').html(obj.tc_name);


    
})
