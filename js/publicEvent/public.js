

/**
 * 封装跳转路径
 * @param {Object} url
 * @param {Object} id
 */
function urlJumpTo(url,id,parameter){
	switch(arguments.length){
		case 0:
			throw new Error("跳转未传递参数");
			break;
		case 1:
			throw new Error("请传递参数跳转ID");
			break;
		case 2:
			mui.openWindow({
				url:url,
				id:id,
				styles:{},
				show:{
					autoShow:true,//页面loaded事件发生后自动显示，默认为true
					aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
					duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				extras:{
				 //自定义扩展参数，可以用来处理页面间传值
				},
			});
			break;
		case 3:
			mui.openWindow({
				url:url,
				id:id,
				styles:{},
				show:{
					autoShow:true,//页面loaded事件发生后自动显示，默认为true
					aniShow:"slide-in-right",//页面显示动画，默认为”slide-in-right“；
					duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
				},
				extras:{
				 //自定义扩展参数，可以用来处理页面间传值
				 parameter:parameter
				},
			});
			break;
		default:
			console.error("跳转错误");
	}
}


