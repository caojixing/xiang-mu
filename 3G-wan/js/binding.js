define(['jquery','js/common'],function($,common){
	var utl='https://ticwear-account.mobvoi.com/captcha/img?origin=ticwatch-service';//获取图片验证码
	var arr=[];
	function randNum(max,min){
		return Math.random()*(max-min)+min
	}

	$('#randomImg').on('click',function(){
		
		var tmp=randNum(9999,1000);
		arr.push(tmp);
		tmp=randNum(9999,1000);
		arr.push(tmp);
		arr=common.uniqueArray(arr);
		url=url+'&random_code='+tmp;
		$(this).attr('src',url).attr('data-random-code',tmp);

	})

})