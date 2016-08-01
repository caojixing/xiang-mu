//调用日历插件
var date=new Date();
var detailCal=new Calendar({
  initDate:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+1,
  callback:function(){

  }
})

$(".get-in-date").text(searchData.inDate).on("click",function(){
  detailCal.show($(this).text(),this);
})

$(".get-out-date").text(searchData.outDate).on("click",function(){
  detailCal.show($(this).text(),this);
})

/*//侧边栏插件
$.fn.slideSelect=function(param){
  var options={//配置项
    data:[],//待渲染的数据
    title:"slideSelect Tool",//组件头信息
    init:1,//显示初始值
    parent:document.body,//组件将要生成的位置
    dom:$(this),//
    callback:function(){//会带奥函数，

    }
  };

  var settings=$.extend({},options,param);//合并并继承我们的入参，也就是配置项
  //基本的页面dom结构
  var baseDom='<div class="plugin slideSelect none">'+
                  '<div class="mask-layer"></div>'+
                 ' <div class="slideContent">'+
                   ' <div class="slideTitle">'+
                      '<span class="slide-title"></span><span class="right cancel"></span>'+
                   ' </div>'+
                   ' <ul>{content}</ul>'+
                 ' </div>'+
              '</div>';

  function render(){//渲染options
    var str="";
    if($.isArray(settings.data)){
      $.each(settings.data,function(i,v){
        str+='<li data-index="'+i+'">'+v+'</li>';
      })
    }

    return baseDom.replace(/\{content\}/,str);
  }

  var wrap=$(settings.parent).append($(render()));//生成dom并添加到我们想要放置的位置的父元素下

  //绑定事件
  wrap.on("click","li",function(){
    hide();
  })
  .on("click",".cancel",function(){
    hide();
  });

  $(this).on("click",function(){//点击触发组件的元素，并显示组件
    show();
  });

  function hide(){
    wrap.find(".slideSelect").addClass("none");
  }

  function show(){
    wrap.find(".slideSelect").removeClass("none");
  }
}*/


//调用示例：
$(function(){
  $(".room-time").slideSelect({
       init: 3,
       title: '选择到店时间',
       id: 'room-time',
       target: '.time',
       data: ['14:00前','17:00前','19:00前','23:00前','20:00前'],
       parent: $('.order-page'),
       callback: function(){
       }
   });

  $(".room-num").slideSelect({
       init: 3,
       title: '选择房间人数',
       id: 'room-num',
       target: '.count',
       data: [1,2,3,4],
       parent: $('.order-page'),

       callback: function(data){
          var str='<h2>入住人信息</h2>';
          for(var i=0;i<data ;i++){
            str+='<div class="c-i">'+
                    '<p><span class="left">姓名</span><input type="text" placeholder="每间只需填写一个姓名" class="right"></p>'+
                    '<p><span class="left">证件</span><input type="text" placeholder="入住人身份证号/护照号" class="right"></p>'+
                  '</div>';
          }

          $(".customer-info").html(str);

       }
   });
})


//dom action
$('.back').on('click',function(){
    window.location.href = "detail.html";
});
 


 
$.fn.slideSelect = function(param){
    var options = {//配置项
        data: [],//待渲染的数据
        id: '',
        title: 'slideSelect Tool',//组件头信息（标题）
        init: 1,//显示初始值
        cls: 'selected',
        parent: document.body,//组件将要生成的位置
        target: '',//选择完option时，将selected的值赋给指定的dom
        callback: function(){//回调函数，选择完option时触发

        }
    };
    var settings = $.extend({},options,param);//合并并继承我们的入参，也就是配置项
    //基本的页面dom结构
    var baseDom = '<div class="plugin slideSelect none" id="'+settings.id+'"><div class="mask-layer"></div>' +
        '<div class="slideContent">' +
        '<div class="slideTitle"><span class="slide-title">'+settings.title+'</span><span class="right cancel">取消</span></div>' +
        '<ul>{content}</ul></div></div>';


    function render(){//渲染options
        var str = '';
        if($.isArray(settings.data)){
            $.each(settings.data,function(i,v){
                if(i == settings.init-1){
                    str+='<li data-index="'+i+'" class="'+settings.cls+'">'+v+'</li>';
                }else{
                    str+='<li data-index="'+i+'">'+v+'</li>';
                }
            })
        }

        return baseDom.replace(/\{content\}/,str);
    }

    var wrap = $(settings.parent).append($(render()));//生成dom并添加到我们想要放置的父元素下
              //$('.order-page')           $(baseDom)

    //绑定事件
    $('#'+settings.id).on('click','li',function(){//给option绑定事件
        $(this).addClass(settings.cls).siblings().removeClass(settings.cls);

        settings.parent.find(settings.target).text($(this).text());

        settings.callback && settings.callback($(this).text());

        hide();
    })
    .on('click','.cancel',function(){
        hide()
    });

    $(this).on('click',function(){//点击触发组件的元素，并显示组件
        show();
    });

    function hide(){
        wrap.find('#'+settings.id).addClass('none');

    }
    function show(){
        wrap.find('#'+settings.id).removeClass('none');
    }
};


                             