var searchMsg = getUriParams(location.search);
console.log(searchMsg);
//Object {address: "北京", in_date: "2016-06-12", out_date: "2016-6-14", hotel: ""}

//从服务器端获取数据
getData(searchMsg.in_date,searchMsg.out_date);
var oldInDate = searchMsg.in_date,
    oldOutDate = searchMsg.out_date;

//初始化组件
var calendar = new Calendar({
   initDate:"2016-6-1"
});
var dialog = new Dialog();

//dom action
$('.back').on('click',function(){
    window.location.href = "index.html";
});

var i_year = searchMsg.in_date.substr(0,5),
    getInDateDom = $(".get-in-date"),
    getOutDateDom = $('.get-out-date');
getInDateDom.text(searchMsg.in_date.substr(5)).on('click',function(){
    var txt = $(this).text();
    calendar.show(i_year+txt,this);
});
var o_year = searchMsg.out_date.substr(0,5);
getOutDateDom.text(searchMsg.out_date.substr(5)).on('click',function(){
    calendar.show(o_year+$(this).text(),this);
});

function getRidOfYear(){
    getInDateDom.text(getInDateDom.text().length<5?getInDateDom.text():getInDateDom.text().substr(5));
    getOutDateDom.text(getOutDateDom.text().length<5?getOutDateDom.text():getOutDateDom.text().substr(5));
}

$('.calendar').on('hide',function(){
    var in_date = getInDateDom.text(),
        out_date = getOutDateDom.text();
    if(in_date.length<5){
        in_date = i_year +in_date;
    }
    if(out_date.length<5){
        out_date = i_year +out_date;
    }
    var gap = new Date(out_date) - new Date(in_date);
    if(gap < 0){
        dialog._alert("你的离店日期不能早于入住日期");
        getOutDateDom.text(addDays(in_date,2));
    }


    if(in_date != oldInDate || out_date!= oldOutDate){
        getData(in_date, out_date);
        oldInDate = in_date;
        oldOutDate = out_date;
    }
    getRidOfYear()
});



var brandIscroll;

//进行筛选操作
var filter = function(data){
    this.data = data;
    this.domWrap = document.querySelector('.filter');
    this.init();
    this.render();
    this.bindEvent();
    brandIscroll = new IScroll('.brand',{
        click:true
    });

};
filter.prototype={
    tpl:{
        range:'<p class="unlimited active" data-flag="1"><span class="left">由近到远</span><span class="checkbox checked right"></span></p><p data-flag="2"><span class="left">由远到近</span><span class="checkbox right"></span></p>',
        price:'<p class="unlimited active"><span class="left">不限</span><span class="checkbox checked right"></span></p><p><span class="left">100以下</span><span class="checkbox right"></span></p> <p><span class="left">100-200</span><span class="checkbox right"></span></p> <p><span class="left">200-300</span><span class="checkbox right"></span></p> <p><span class="left">300以上</span><span class="checkbox right"></span></p>',
        brand:'',
        star:'<p class="unlimited active"><span class="left">不限</span><span class="checkbox checked right"></span></p> <p><span class="left">二星及以下</span><span class="checkbox right"></span></p> <p><span class="left">三星</span><span class="checkbox right"></span></p> <p><span class="left">四星</span><span class="checkbox right"></span></p> <p><span class="left">五星</span><span class="checkbox right"></span></p>'
    },
    init:function(){
        var str ='<p class="unlimited active"><span class="left">不限</span><span class="checkbox checked right"></span></p>';
        this.data.brand.forEach(function(v){
            str+='<p><span class="left">'+v+'</span><span class="checkbox right"></span></p>'
        });
        this.tpl.brand = '<div class="scroller">'+str+'</div>';
    },
    render:function(){
        for(var i in this.tpl){
             $(this.domWrap).append($('<div class="act-area '+i+'"></div>').html(this.tpl[i]));
             //console.log(i);//range price brand star
             //console.log(this.tpl[i]);//'<p class="unlimited active" data-flag="1"><span class="left">由近到远</span><span class="checkbox checked right"></span></p><p data-flag="2"><span class="left">由远到近</span><span class="checkbox right"></span></p>'等等后面就不写了
        }

    },
    bindEvent:function(){
        var actArea = $(this.domWrap).find('.act-area'),that =this;
        actArea.on('click','p',function(){
            if($(this).hasClass('unlimited')){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            }else{
                $(this).addClass('active').siblings('.unlimited').removeClass('active');

            }
            that.filterMethod(that.flag,$(this).attr('data-flag'));
            console.log(that.flag);
        });
        $(this.domWrap).next().on('click',function(){
            that.hide();
        })
    },
    filterMethod:function(type,flag){
        var allli = $('.lists').find('//li'),arr=[];
        //console.log(allli);数组
        allli.each(function(i,v){
            arr.push({
                datadis: $(this).attr('data-dis'),
                dom: v
            })

        });

     
        if(type=='range'){
            arr.sort(function(a,b){
                if(a.datadis*1> b.datadis*1){
                    return 1
                }else if(a.datadis*1< b.datadis*1  ){
                    return -1
                }else{
                    return 0;
                }
            });
            if(flag != '1'){
                arr = arr.reverse();
            }
            var str ='';
            arr.forEach(function(v,i){
                str+= v.dom.outerHTML
            });
            $('.lists').html(str);
        }else
        if(type == 'price'){

        }
    },
    hide:function(){
        this.domWrap.className = this.domWrap.className.replace('filter-show','filter-hide');
        $(this.domWrap).next().addClass('hide');
    },
    show:function(flag){
        this.flag = flag;
        $(this.domWrap).next().removeClass('hide');
        this.domWrap.className = this.domWrap.className.replace('filter-hide','filter-show');

        /*var tmpDom = $(this.domWrap).find('div');
        tmpDom.html(this.tpl[flag]);*/
        $(this.domWrap).find('.'+flag).addClass('area-show').siblings().removeClass('area-show')
    }
};
var Filter = new filter({
    brand: ['汉庭酒店','和颐酒店','希尔顿酒店','四季酒店','如家酒店','7天酒店','格林豪泰酒店','金叶子大酒店','云怡大酒店','檀驿栈酒店']
});

$('.bottom-bar').on('click','li',function(){

    if($(this).hasClass('high')){
        $(this).removeClass('high');
        Filter.hide();
    }else{
        $(this).addClass('high').siblings().removeClass('high');
        var data = $(this).attr('data');
        Filter.show(data);
    }

});

//请求数据
function getData(a,b){

    startLoading(".list-wrap");

    setTimeout(function(){
        $.ajax({
            url:'data/hotel.json',
            dataType:"json",
            data:{
                in_date:a,
                out_date:b
            },
            type: "post",
            success:function(data){
                stopLoading(".list-wrap");
                if(data.errcode == 0){
                    renderLists(data.result);
                    new IScroll('.list-wrap',{
                        click:true
                    })
                }else{
                    dialog._alert(data.errmsg,function(){

                    })
                }
            },
            error:function(e,e2){
                for(var i in e){
                    console.log(e[i]);
                }
                console.log(e2);
            }
        });
    },2000);
}
//渲染页面
function renderLists(data){
    var datalist = data.hotel_list, str='';
    for(var i=0; i<datalist.length; i++ ){
        str += '<li class="list-item clearfix" data-id="'+datalist[i].hotel_id+'" data-dis="'+datalist[i].distance+'"><div class="list-item-img"><img src="'+datalist[i].image+'" alt=""></div>'
            +'<div class="list-item-info">'
            +'<p class="hotel-name">'+datalist[i].name+'</p>'
            +'<p class="hotel-score"><span>4.8分 <em>礼</em><em>返</em><em>促</em></span><span class="hotel-price">'+datalist[i].low_price/100+'￥</span></p>'
            +'<p class="hotel-range"><span class="list-star">'+datalist[i].stars+'</span><span></span></p>'
            +'<p class="hotel-address"><span>'+datalist[i].addr+'</span><span class="distance">'+datalist[i].distance/1000+'km</span></p>'
            +'</div></li>'
    }
    $(".lists").html(str);
}

//给li添加单击事件
$(".list-wrap").on("click","li",function(){
    var id=$(this).data("id"),
        name=$(this).find(".hotel-name").text(),
        inDate=new Date().getFullYear()+'-'+$(".get-in-date").text(),
        outDate=new Date().getFullYear()+'-'+$(".get-out-date").text();

    var str='?id='+id+'&name='+name+'&inDate='+inDate+'&outDate='+outDate;
    location.href="detail.html"+encodeURI(str);
})
