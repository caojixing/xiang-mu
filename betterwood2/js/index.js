//初始化组件
var Swiper = new Swiper(".index-banner");//图片轮播
var Calendar = new Calendar({
    initDate: "2016-6-1",
    count: 3
});//日历
var Dialog = new Dialog();//弹出框  

//设置初始日期
var date = new Date();
var inDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
$('.get-in-date .index-value').text(inDate);
$('.get-out-date .index-value').text(addDays(inDate,2));


//通过localstorage缓存搜索记录
var getMemory = function(){
    var get_memory = localStorage.getItem("searchMemory");
    if(get_memory){
        get_memory = JSON.parse(get_memory);
        $(".address .index-value").text(get_memory.address);
        $('.hotel .index-value').val(get_memory.hotel);
    }
};
getMemory();

//dom action
document.querySelector('.get-in-date').addEventListener('click',function(){
    var selDate = this.querySelector('.index-value').innerHTML;
    Calendar.show(selDate,this.querySelector('.index-value'));
},false);

document.querySelector('.get-out-date').addEventListener('click',function(){
    var selDate = this.querySelector('.index-value').innerHTML;
    Calendar.show(selDate,this.querySelector('.index-value'));
},false);

$(".calendar").on("hide",function(){
    var i_v = document.querySelector('.get-out-date .index-value');
    var inDate = $(".get-in-date .index-value").html();
    var outDate = $(".get-out-date .index-value").html().split(' ');
    var minusNum = Math.ceil((new Date(outDate)- new Date(inDate))/86400000);


    if(minusNum<=0){
        Dialog._alert("离店日期不能早于住店日期",function(){
            var arr= inDate.split('-');
            if(arr[1].charAt(0) == 0){
                arr[1] = arr[1].charAt(1);
            }

            var resetDate = new Date(arr[0],arr[1]-1,arr[2]*1+2);
            i_v.innerHTML = resetDate.getFullYear()+"-"+(resetDate.getMonth()+1)+"-"+resetDate.getDate()+" (2天)";
        })
    }
    if(i_v.innerHTML.indexOf("(")>-1){
        i_v.innerHTML =i_v.innerHTML.replace(/\(\d+天\)/,"("+minusNum+"天)");
    }else{
        i_v.innerHTML =i_v.innerHTML+" ("+minusNum+"天)";
    }

});

function collectMsg(){
    var address = $.trim($('.address .index-value').text());
    var in_date = $.trim($('.get-in-date .index-value').text());
    var out_date = $.trim($('.get-out-date .index-value').text()).split(" ")[0];
    var hotel = $.trim($('.hotel .index-value').val());
    if(in_date == '' || out_date == ''){
        Dialog._alert("您的信息填写不完整");
        return false;
    }
    return "?address="+address+"&in_date="+in_date+"&out_date="+out_date+"&hotel="+hotel;
}

$(".index-button").on('click',function(){
    console.log(collectMsg());
    var str = collectMsg();
    var msg = getUriParams(str);
    var ls = window.localStorage;
    ls.setItem("searchMemory", JSON.stringify(msg));
    if(str){
        str = encodeURI(str);
        window.location.href = "list.html"+str;
    }
});

checkAgentType();




//定位
var _location;
function getLocation() {
console.log(navigator.geolocation);
    if (navigator.geolocation) { 
        console.log(navigator.geolocation.getCurrentPosition);

        navigator.geolocation.getCurrentPosition(function(position){
            _location = {
                lat : position.coords.latitude || 12,
                log: position.coords.longitude || 116
            };
            $.ajax({
                url:'http://apis.map.qq.com/ws/geocoder/v1/?location='+_location.lat+','+_location.log+'&key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF',
                type:'get',
                dataType: 'jsonp',
                success:function(data){
                    data = JSON.parse(data);
                    console.log(data)
                }
            });
        });
    } else{
        console.log("Geolocation is not supported by this browser.");
    }


    setTimeout(function(){
        if(_location === undefined){
            Dialog._confirm('定位超时，请检查您的GPS是否打开，然后刷新重试',function(){
                location.reload();//刷新效果
                //location.replace  没有历史记录，就是浏览器的前进后退按钮失效（PS:我们部落里的帖子不能前进后退功能失效可能是这个原因）

                //location.href 有历史记录，相当于一个页面的链接跳转。所以不会有"post"数据的问题。
                //location.reload() =>  F5刷新

                //location.relaod(true) => Ctrl + F5 刷新
            })
        }
    },10000)
}
getLocation();

/*[].forEach.call(document.querySelectorAll("*"),function(a){
    a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
});*/
