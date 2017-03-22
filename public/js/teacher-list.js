/*讲师管理*/

define(['jquery', 'template', 'util', 'bootstrap', 'overlay'], function ($, template, util) {
    //5.获取讲师列表页的地址location.pathname;
    util.setMenu(location.pathname);

    //1.实现教师数据加载
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        datatype: 'json',
        success: function (data) {
            //2.使用模板将数据库中数据渲染到页面上
            var html = template('teacherTpl', {list: data.result});
            $('#teacherList').html(html);

            //3.实现讲师查看功能
            $('.teacherBtns').find('a:eq(0)').click(function () {

                //获取被点击的查看按钮的ID值
                var tc_id = $(this).parent('td').attr('data-tcid');
                //console.log(tc_id);
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {tc_id: tc_id},
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            //处理籍贯格式
                            // data.result.tc_hometown=data.result.tc_hometown.split('|').join(" ");
                            data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g, ' ');

                            var html = template('teacherInfoModal', data.result);
                            $('#teacherInfo').html(html);
                            //调用弹窗
                            $('#teacherModal').modal();
                        }
                    }
                });
            });

            //4.启用和注销讲师
            $('.teacherBtns').find('a:eq(2)').click(function () {
                //获取被点击的查看按钮的ID值
                var tc_id = $(this).parents('td').attr('data-tcid');
                // console.log(tc_id);
                //获取按钮点击时的状态
                var tc_status = $(this).parents('td').attr('data-status');
                console.log(tc_status);
                var td = $(this).parent('td');
                var that = this;
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data: {tc_id: tc_id, tc_status: tc_status},
                    datatype: 'json',
                    success: function (data) {
                        console.log(data);
                        //修改状态对应文本
                        if (data.result.tc_status == 0) {
                            $(that).text('启用');
                        } else {
                            $(that).text('注销');
                        }
                        // 修改浏览器端状态--保证再次点击时状态更改
                        td.attr('data-status', data.result.tc_status);
                    }
                })
            });

            //控制全局遮罩


        }
    });
});