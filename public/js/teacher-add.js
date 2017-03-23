/*
 * 讲师添加、讲师编辑
 * */
define(['jquery', 'util', 'template', 'datepicker', 'language', 'validate', 'form'], function ($, util, template) {

    // 1.设置左侧导航选中
    util.setMenu('/teacher/list');
    //2.获取进行编辑的讲师的ID：tc_id---地址栏中传递了tc_id
    var tc_id = util.qs('tc_id');
    // console.log(tc_id);
    //如果地址栏中有tc_id说明是编辑讲师页面，否则是添加讲师页面
    //3.讲师编辑
    if (tc_id) {
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: tc_id},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                //填充数据--返回的数据增加一项渲染到页面上
                data.result.tInfo='编辑讲师'
                //渲染模板
                var html = template('teacherEdit', data.result);
                $('#teacherInfo').html(html);
                checkForm('/api/teacher/update');
            }
        });
    }else {
        //添加讲师
        var html=template('teacherEdit',{
            tInfo:'添加讲师',
            tc_gender:0
        });
        $('#teacherInfo').html(html);
        checkForm('/api/teacher/add');
    }

    //4.表单验证--添加和编辑都需要
    function checkForm(url) {
        // console.log(url);
        //验证提交
        $('#teacherForm').validate({
            sendForm:false,//阻止默认提交
            valid:function () {
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    dataType:'json',
                    success:function (data) {
                        if(data.code == 200){
                            location.href = '/teacher/list';
                        }
                    }
                });
            },
            //有一项是错误的
            eachInvalidField : function(){
                //as-error和has-success是bootstrap中的样式
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            //有一项是正确的
            eachValidField : function(){
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            description : {
                tcName : {
                    required : '用户名不能为空'
                },
                tcPass : {
                    required : '密码不能为空',
                    pattern : '只能是六位数字'
                },
                joinDate : {
                    required : '入职日期不能为空'
                }
            }
        });
    }

    //5.编辑和添加进行提交：只有地址和ID不同

});
