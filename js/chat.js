$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    $('#btnSend').on('click',function(){
        //获取输入的内容
        var text=$('#ipt').val().trim()
        if(text.length<=0){
            return $('#ipt').val('')
        }
        //聊天内容追加
        $('#talk-list').append('<li class="right_word"><img src="./img/tzh.png" /> <span>'+text+'</span> </li>')
        //发送消息后清空输入框
        $('#ipt').val('')
        resetui();
        getMsg(text);
    })


    //获取聊聊天机器人返回消息
    function getMsg(text){
        $.ajax({
            type:'GET',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken:text
            },
            success:function(res){
                console.log(res);
                if(res.message==='success'){
                    //接受聊天消息
                    var msg=res.data.info.text
                $('#talk-list').append('<li class="left_word"><img src="./img/dj.png" /> <span>'+msg+'</span> </li>')
                 resetui()
                 getVoice(msg)
                }
            }
        })
    }
    //文字转化为语音
    function getVoice(text){
        $.ajax({
            type:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function(res){
                if(res.status===200){
                    //播放
                    $('#voice').attr('src',res.voiceUrl)
                   
               
                }
            }
        })
    }

    $('#ipt').on('keyup',function(e){
       if(e.keyCode==13){
           $('#btnSend').click()
       }
    })
  })