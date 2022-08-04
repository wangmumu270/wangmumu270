var targetNav;
if (targetNav == "navStroe") {
		$('#bookstore-management').show();
		$('#personalCenter').hide();
		$('#clerkOperation').hide();
		// console.log($(this).children('p')[0]);//获取点击的导航栏元素
		var elementsTxt = $(this).children('p').html(); //获取点击的导航栏元素内容
		var targetBox;//获取点击盒子id
		var targetTxt;//获取盒子中的文字
		$('.manageBox div').click(function(event){
			// targetBox = $(this).attr("id");
			// console.log(targetBox);
			targetTxt = $(this).children('p').html();//获取点击的书店管理操作元素文字
			console.log(targetTxt);
			$('.navigationTip').text(elementsTxt+'>'+targetTxt);
		});
		$('.navigationTip').show();
		//显示所在模块位置
		$('.navigationTip').text(elementsTxt);
}

//进入创建书店、查看书店
function createBookstoreFun(){
	$('#bookstore-management').hide();
	$("#create-bookstore").show();
	$('.navList li').click(function() {
		$("#create-bookstore").hide();
	});
}