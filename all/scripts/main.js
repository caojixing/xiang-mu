require.config({
	baseUrl:"",
	paths:{
		"jquery":"lib/jquery-1.7.2",
		"index":"scripts/index"
	}
})

require(["jquery","index"],function($,index){
	console.log(index);
})
