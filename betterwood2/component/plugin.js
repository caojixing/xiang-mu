var plugins = {
    transitionEnd: function(){
        var el = document.createElement('element'), t;
        var transitions = {
            'WebkitTransform': 'webkitTransitionEnd',
            'OTransform': 'oTransitionEnd',
            'MozTransform': 'TransitionEnd',
            'MsTransform': 'msTransitionEnd',
            'transform': 'transitionEnd'
        };
        for (t in transitions) {
            if (el.style[t] !== undefined) {
                this.transform = t;
                return transitions[t];
            }
        }
    }
};

var getUriParams = function (url){
    console.log(url);
    url = decodeURI(url).slice(1);
    console.log(decodeURI(url));
    var obj = {};
    url.split("&").forEach(function(t){
        console.log(t);//address=北京 in_date=2016-6-24 out_date=2016-6-26  hotel=汉庭酒店
        t = t.split("=");
        console.log(t);//["address", "北京"] ["in_date", "2016-6-24"] ["out_date", "2016-6-26"] ["hotel", "汉庭酒店"]
        obj[t[0]] = t[1];
    });
    return obj;
};

var addDays = function(startDay,num){
    var signal = startDay.indexOf("-")>-1? "-":"/";
    var arr= startDay.split(signal);
    if(arr[1].charAt(0) == 0){
        arr[1] = arr[1].charAt(1);
    }

    var resetDate = new Date(arr[0],arr[1]-1,arr[2]*1+num);
    return resetDate.getFullYear()+signal+(resetDate.getMonth()+1)+signal+resetDate.getDate();
};

//测试是属于哪个设备的
var checkAgentType = function(){
    var html = document.querySelector("html");
    var userAgent = navigator.userAgent;

    if(userAgent.match(/iphone/i) && userAgent.match(/iphone/i).length>0){
        html.setAttribute('data-type',"iphone")
    }else
    if(userAgent.match(/ipad/i) && userAgent.match(/ipad/i).length>0){
        html.setAttribute('data-type',"ipad")
    }else
    if(userAgent.match(/android/i) && userAgent.match(/android/i).length>0){
        html.setAttribute('data-type',"android")
    }else{
        html.setAttribute('data-type',"winphone")
    }
};


function startLoading(wrap){
    var dom = $('<div class="loading"></div><div class="light-mask-layer"></div>');
    $(wrap).append(dom);
}
function stopLoading(wrap){
    wrap = $(wrap);
    if(wrap.find('.loading')){
        wrap.find('.loading').remove();
        wrap.find('.light-mask-layer').remove();
    }

}