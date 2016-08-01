var Calendar = function(obj){
    $.extend(this,plugins);
    this.count = obj.count || 3;
    this.initDate = new Date(obj.initDate) || new Date();
    this.callback = obj.callback || null;
    this.renderAllMonth();
    this.pluginDom = document.querySelector('.calendar');
    this.pluginDom.innerHTML = this.renderAllMonth();
    this.bindEvent();

};
Calendar.prototype={
    currentDate: {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth(),
        currentDay: new Date().getDate()
    },
    renderAllMonth:function(){
        var str = '';
        for(var i = 0; i<this.count;i++){
            str+=this.render(i)+"\n";
        }
        return '<h3 class="title"><span class="left-arrow go-back"></span>选择日期</h3>'+str;
    },
    getDays:function(date){
        var year = date.getFullYear(),month = date.getMonth()+1,days;
        if(month == 1 ||month == 3 ||month == 5 ||month == 7 ||month == 8 ||month == 10 ||month == 12 ){
            days = 31;
        } else if(month == 4 ||month == 6 ||month == 9 ||month == 11){
            days = 30;
        }else{
            days = (year%400==0 || year%100 !==0 && year%4 ==0)? 29 : 28;
        }
        this.year = year;
        this.month = month - 1;
        return days;
    },
    getDaysByMonth:function(c){
        var preMonth = this.initDate.getMonth()+c,
            curYear = this.initDate.getFullYear(),
            preDate = new Date(curYear,preMonth,1);

        return this.getDays(new Date(preDate));
    },
    render:function(count){
        var days = this.getDaysByMonth(count);
        var month = this.month;
        var year = this.year;
        var week = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"];
        var MbetweenM = new Date(this.year,this.month,1).getDay();
        var weekday = week[MbetweenM];

        console.log("当前月份的天数："+days+" ,  一号对应的星期"+weekday);

        var preMonthStr ="", curMonthStr= "", nextMonthStr ="";
        var num = this.getDaysByMonth(count-1);
        for(var i= MbetweenM-1; i>=0;i--){
            preMonthStr += "<li class='to-gray'>"+(num-i)+"</li>";
        }

        for(var j = 1; j<=days;j++){
            if(year == this.currentDate.currentYear && month == this.currentDate.currentMonth && j == this.currentDate.currentDay){
                curMonthStr += "<li class='now'>"+j+"</li>";
            }else {
                curMonthStr += "<li data-day="+j+">"+j+"</li>";
            }
        }

        var leftDays = 42-days-MbetweenM;

        for (var k = 1;k<=leftDays;k++){
            nextMonthStr += "<li class='to-gray'>"+k+"</li>";
        }

        var tmpStr ='<div class="calendar-item" data-ym="'+year+'-'+(month*1+1)+'"><h2 class="month-title">'+year+'年'+(month*1+1)+'月'+'</h2><div class="week clearfix"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>';
        return (tmpStr+'<ul class="clearfix">'+preMonthStr+curMonthStr+nextMonthStr+'</ul></div>');
    },
    show:function(selectedDate, elem){
        this.elem = elem;
        console.log(selectedDate);
        var _now = this.pluginDom.querySelector(".now");
        _now && (_now.className="");
        if(selectedDate.indexOf("(")>-1){
            selectedDate = selectedDate.split(" ")[0]
        }
        var selDate = new Date(selectedDate);
        var y = selDate.getFullYear(),
            m = selDate.getMonth()+ 1,
            d = selDate.getDate();
        var y_m = $(this.pluginDom).find("div[data-ym="+y+"-"+m+"]");
        y_m.find("li[data-day="+d+"]").addClass("now");
        this.pluginDom.className = this.pluginDom.className.replace("plugin-hide","plugin-show");
    },
    hide:function(){
        var that =this;
        setTimeout(function(){
            that.pluginDom.className = that.pluginDom.className.replace("plugin-show","plugin-hide");
        },0);

    },
    bindEvent:function(){
        var that = this;
        this.pluginDom.querySelector('.go-back').addEventListener("click",function(){
            that.hide();
        },false);
        $(this.pluginDom).on('click',"li",function(){
            if($(this).hasClass('to-gray')) return;
            $(this).addClass("now");
            that.pluginDom.querySelector(".now").className="";
            var YM = $(this).parent().prev().prev().text();
            YM = YM.replace(/年/,'-').replace(/月/,'-');
            that.elem.innerHTML = YM+$(this).text();
            that.hide();
        });
        this.pluginDom.addEventListener(that.transitionEnd(),function(){
            if($(this).hasClass("plugin-hide")){
                $('.calendar').trigger("hide",function(){
                    console.log("123123");
                })
            }
        },false);
    }
};

