var searchData=getUriParams(location.search);
console.log(searchData);
console.log(location.search);

$(".hotel-info-name").text(searchData.name);
$(function(){
	//选项卡
	
	$(".hotel-info-tab").on("click","span",function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".tab-wrap").animate({
			"margin-left":-100*index+"%"
		});
	})
})

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

//初始化dialog组件
var Dialog=new Dialog();

//根据id请求对应的数据，并进行渲染操作
renderDetail(searchData);
function renderDetail(searchData){
	$.ajax({
		url:"data/hotelDetail.json",
		data:searchData,
		type:"post",
		dataType:"json",
		success:function(data){
			if(data.errcode==0){
				render(data.result);
			}else{
				Dialog._alert(data.errmsg,function(){})
			}
		},
		error:function(err){
			console.log(err);
		}
	})

	function render(data){
		var hotelDom=$(".tab-win"),
			starvar=["一星级酒店","二星级酒店","三星级酒店","四星级酒店","五星级酒店"];
		hotelDom.find(".hotel-info-name").text(data.name);
		hotelDom.find(".hotel-star").text(starvar[data.star]);
		hotelDom.find(".hotel-phone").text(data.tel);
		hotelDom.find(".hotel-address").text(data.addr);
		hotelDom.find(".hotel-info-detail").text(data.desc);
		/*<div class="room-type">
			<div class="type-item">
				<p class="type-name">标准大床房</p>
				<p class="type-character"><span>人床</span><span>无早</span></p>
			</div>
			<div class="type-item">
				<span class="detail-price">&yen;320</span>
				<span class="detail-ensure">担保</span>
			</div>
			<div class="type-item">
				<button class="book disable">满房</button>
			</div>
		</div>*/

		//渲染房间
		var rooms=data.room_types,str='';
		
		console.log(rooms[0]);
		for(var i=0;i<rooms.length;i++){
			var tempstr="";
			if(rooms[i].goods[0].guarantee){
				tempstr+='<span class="detail-price">&yen'+rooms[i].goods[0].guarantee/100+'</span>';
			}else{
				tempstr+='<span class="detail-price">&yen'+rooms[i].goods[0].price[0]/100+'</span>';
			}

			var tempstr2='<button class="book disable">满房</button>';
			if(rooms[i].goods[0].room_state == 0){
				tempstr2='<button class="book disable">满房</button>';
			}else{
				tempstr2='<button class="book">预订</button>';
			}
		str+='<div class="room-type" id="'+rooms[i].type_id+'">'+
				'<div class="type-item">'+
					'<p class="type-name">'+rooms[i].name+'</p>'+
					'<p class="type-character"><span>'+rooms[i].bed_type+'</span><span>'+(rooms[i].breakfast || "无早")+'</span></p>'+
				'</div>'+
				'<div class="type-item">'+
					tempstr+
					'<span class="detail-ensure">担保</span>'+
				'</div>'+
				'<div class="type-item">'+
					tempstr2+
				'</div>'+
			'</div>';
		}

		$(".detail-room-type").html(str);
	}
}

//展开展示全部
$(".load-more").on("click",function(){
	if(!$(".detail-room-type").is(".Height")){
		$(".detail-room-type").addClass("Height");
	}else{
		$(".detail-room-type").removeClass("Height").addClass(".detail-room-type")
	}
})

//渲染数据面积，人数等
//点击预订按钮是，弹出详情
$(".detail-room-type").on("click",".book",function(){
	$(".mask-layer").removeClass("hide");
	//假如为满房则什么都不做
	if($(this).hasClass("disable")) return;
	//否则弹出有关面积、人数的详情页

	//获取它的id是为了保证值渲染和这一项有关的数据，其它的数据不考虑
	var _id=$(this).parents(".room-type").attr("id");
	$(".room-detail").show();
	console.log(_id);
	$.ajax({
		url:"data/roomdetail.json",
		type:"post",
		data:{id:_id},//传入相对应的id值
		success:function(data){
			//如果errcode=0的话那么就说明我们成功拿到了数据，否则就弹出错误信息
			/*if(data.errcode!=0){
				Dialog._alert(data.msg,function(){})
			}else{
				hotel_render(_id,data.result);
			}*/
			if(data.errcode==0){
				alert(0)
			}else{
				hotel_render(_id,data.result);
			}
			console.log(data);
		},
		error:function(error){
			console.log("出现错误");
		}
	})

	//渲染数据
	function hotel_render(id,list){
		console.log(list);
		var str='';
		list.forEach(function(v,i){
			//v指的是值，i指的是索引
			if(v.id==id){
				str+='<ol>'+
						'<li><span class="left">面积</span><span class="right">'+v.area+'</span></li>'+
						'<li><span class="left">可住</span><span class="right">'+v.count+'</span></li>'+
						'<li><span class="left">床型</span><span class="right">单人床'+v.bed[0]+','+v.bed[1]+'张</span></li>'+
						'<li><span class="left">宽带</span><span class="right">'+v.wifi+'</span></li>'+
						'<li><span class="left">提供</span><span class="right">'+v.meal+'</span></li>'+
					'</ol>';
			}
		})

		/*$.each(data.result,function(i,v){

			str+='<ol>'+
					'<li><span class="left">面积</span><span class="right">'+v.price+'</span></li>'+
					'<li><span class="left">可住</span><span class="right">'+v.count+'人</span></li>'+
					'<li><span class="left">床型</span><span class="right">单人床'+v.bed[0]+'米，'+v.bed[1]+'张</span></li>'+
					'<li><span class="left">宽带</span><span class="right">'+v.wifi+'</span></li>'+
					'<li><span class="left">提供</span><span class="right">'+v.meal+'</span></li>'+
				'</ol>';
		})
*/
		$(".ol").html(str);
		
	}
})

//点击关闭
$(".close").on("click",function(){
	
	$(".mask-layer").addClass("hide");
	$(".room-detail").hide();
})

//点击立即预订跳转到下一个页面
$('.room-detail').on("click",".yd",function(){
	var id=$(this).data("id");
	alert(id);
	var inDate=$(".get-in-date").text();
	var outDate=$(".get-out-date").text();
	var hname=searchData.name;
	var hid=searchData.id;
	var param="?roomid="+id+"&hotelid="+hid+"&hotelname="+hname+"&indate="+inDate+"&outDate="+outDate;
	location.href="order.html"+encodeURI(param);
})

//dom action
$('.back').on('click',function(){
    window.location.href = "list.html";
});