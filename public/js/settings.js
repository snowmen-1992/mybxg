/*个人中心*/
define(['jquery','template','ckeditor','region','validate','form','datepicker','language','uploadify'],function ($,template,CKEDITOR) {
    //请求获取个人资料
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function (data) {
            //模板引擎填充渲染页面
            var html=template('profileTpl',data.result);
            $('#profileInfo').html(html);

            //处理头像图片文件上传
            $('#upfile').uploadify({
                buttonText : '',
                width : 120,
                height : 120,
                fileObjName:'tc_avatar',
                swf :'/public/assets/uploadify/uploadify.swf',
                //头像上传提交的地址
                uploader:'/api/uploader/avatar',
                //上传成功后执行
                onUploadSuccess : function(file,data){
                    //data.result.path上传成功后图片地址
                    //后台返回的data是字符串格式，转换成json格式数据
                    data = JSON.parse(data);
                    //通过直接更改图片地址
                    $('.preview img').attr('src',data.result.path);
                }
            });

            //省市级三级联动
            $('.hometown').region({
                url:'/public/assets/jquery-region/region.json'
            });
            
            //富文本处理
            CKEDITOR.replace('ckeditor',{
                //自定义文本选项中工具
                toolbarGroups : [
                    {name:'clipboard',groups:['clipboard','auto']}
                ]
            });
            
            //提交--表单提交

            $('#profileFormId').validate({

                sendForm:false,
                valid:function () {
                    // 同步更新富文本的内容变化
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }

                    //省市县信息
                    var hometown='';
                    var p=$('#p').find('option:selected').text();
                    var p=$('#c').find('option:selected').text();
                    var p=$('#d').find('option:selected').text();
                    hometown=p+'|'+c+'|'+d;

                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        data:{tc_hometown:hometown},
                        dataType:'json',
                        success:function (data) {
                            if(data.code==200){
                                location.href='/index/settings'
                            }
                        }
                    })
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
                    tcRoster : {
                        required : '昵称不能为空'
                    },
                    joinDate : {
                        required : '入职日期不能为空'
                    }
                }
            });
        }
    });
});