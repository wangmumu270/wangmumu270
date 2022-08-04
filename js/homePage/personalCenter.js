$('#personalCenter').hide(); //显示个人中心
$('#bookstore-management').show(); //隐藏书店管理
$('#clerkOperation').hide(); //隐藏店员操作
$('#create-bookstore').hide();
var userId = localStorage.getItem("userId");
//导航栏图标切换
$('.navStroe img').attr('src','../../picture/images/storeManages.png');
//切换账号
function switchIconFun() {

}
//退出账号
function exitIconFun() {
	$.ajax({
		url:head+"/booksGuide/loginController/logout",
		type:"post",
		xhrFields:{
		        withCredentials:true
		    },
		crossDomain: true,
		success:function(data){
			console.log(data);
			window.location.href = "../../window/enterInto/login.html";
		},
		error:function(xhr,type,err){
			console.log(xhr.status);
		},
		dataType:"json",
		// jsonp:"jsonpCallback",
	});
	// localStorage.removeItem('userId');
}

$('.navStroe').css('background-color', '#00C9FF');
$('.navStroe').children('p').css('color', '#FFFFFF');

// 导航栏 || 个人中心
var targetNav;
$('.navList li').click(function(event) {
	// targetNav = $(this).attr()
	$(this).css('background-color', '#00C9FF');
	$(this).siblings().css('background-color', '#FFFFFF');
	$(this).children('p').css('color', '#FFFFFF');
	$(this).siblings().children('p').css('color', '#000000');
	targetNav = $(this).attr("class");
	//单击导航栏 || 个人中心
	if (targetNav == "navPersonal") {
		$('#personalCenter').show(); //个人中心模块
		$('#bookstore-management').hide(); //书店管理模块
		$('#clerkOperation').hide(); //店员操作模块
		$('.navigationTip').hide(); //进入模块的导航提示
		//导航栏图标切换
		$('.navPersonal img').attr('src','../../picture/images/personalIcons.png');
		$('.navOperate img').attr('src','../../picture/images/clerkIcon.png');
		$('.navStroe img').attr('src','../../picture/images/storeManage.png');
		//单击导航栏 || 书店管理
	} else if (targetNav == "navStroe") {
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
		//导航栏图标切换
		$('.navStroe img').attr('src','../../picture/images/storeManages.png');
		$('.navPersonal img').attr('src','../../picture/images/personalIcon.png');
		$('.navOperate img').attr('src','../../picture/images/clerkIcon.png');
		//单击导航栏 || 店员操作
	} else if (targetNav == "navOperate") {
		$('#clerkOperation').show();
		$('#bookstore-management').hide();
		$('#personalCenter').hide();
		$('.navigationTip').hide();
		//导航栏图标切换
		$('.navOperate img').attr('src','../../picture/images/clerkIcons.png');
		$('.navPersonal img').attr('src','../../picture/images/personalIcon.png');
		$('.navStroe img').attr('src','../../picture/images/storeManage.png');
	} else {
		$('#personalCenter').hide();
		$('#bookstore-management').hide();
		$('#clerkOperation').hide();
		$('.navigationTip').hide();
		//导航栏图标切换
		$('.navPersonal img').attr('src','../../picture/images/personalIcon.png');
		$('.navOperate img').attr('src','../../picture/images/clerkIcon.png');
		$('.navStroe img').attr('src','../../picture/images/storeManage.png');
	}
});

$(document).ready(function(){
	updateMsg();
	
});


function updateMsg(){
	// console.log(head);
	$.ajax({
		url: "http://192.168.2.13:8081/booksGuide/bookstoreShopAssistant/selectBookstoreShopAssistantById",
		//async: false,
		data: {
			"id": userId
		},
		type: "POST",
		xhrFields:{
		        withCredentials:true
		    },
		crossDomain: true,
		dataType:"json",
		success: function(data) {
			console.log(JSON.stringify(data));
			if (data.code == 200) {
				console.log(`${data.message}`);
				//需要循环遍历取得的json数据判断是否为空null，则不能赋值
				$('#personName').text(`${data.data.name}`);
				$('#namePer').val(`${data.data.name}`);
				$("#sexPer").val(`${data.data.sex}`);
				$("#agePer").val(`${data.data.age}`);
				$("#phonePer").val(`${data.data.phone}`);
				$("#accountPer").val(`${data.data.username}`);
				$("#pwdPer").val(`${data.data.password}`);
				$("#addressPer").val(`${data.data.address}`);
				// $("#birthPer").val(`${data.data.birthday}`);
				$("#IdCardPer").val(`${data.data.identityCard}`);
				$("#emailPer").val(`${data.data.email}`);
				$('#managePer').val(`${data.data.bookstoreName}`);
			} else if (data.code == 201) {
				console.log("code==201");
			} else if (data.code == 500) {
				console.log("code==500");
			} else {
				console.log(`${data.message}`);
			}
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
			console.log("错误");
		},
	});
}

var detailsBarInfo = {
		"name": $('#namePer').val(), //姓名
		"sex": $("#sexPer").val(), //性别
		"birthday": $("#birthPer").val(), //出生日期(非必填)
		"age": $("#agePer").val(), //年龄(非必填)
		"identityCard": $("#IdCardPer").val(), //身份证号码(非必填)
		"address": $("#addressPer").val(), //现住地址(非必填)
		"phone": $("#phonePer").val(), //联系电话
		"EMail": $("#emailPer").val(), //电子邮件(非必填)
		"username": $("#accountPer").val(), //账号
		"password": $("#pwdPer").val(), //密码
		"managePer": $("#managePer").val() //管理的书店
}
var detailsBarInfos = JSON.stringify(detailsBarInfo);//转字符串
var flag = true;
// 按钮-修改个人信息
function modifyBtnFun() {
	$('.modifyBtn').css('color', '#FFFFFF');
	//修改上传头像
	$('.file').attr('style', 'display: none');
		$(".file").change(function(e) {
			for (var i = 0; i < e.target.files.length; i++) {
				var file = e.target.files.item(i);
				var freader = new FileReader();
				freader.readAsDataURL(file);
				freader.onload = function(e) {
					var src = e.target.result;
					$("#userIcon").attr("src", src);
					$("#userIcon").attr("position", "relative");
					$("#userIcon").attr("left", "1.85rem");
					$("#userIcon").css("width", "7.5rem");
					$("#userIcon").css("height", "7.5rem");
				}
			}
		});
	//一个按钮实现修改、确定状态的切换
	if(flag){
		$('.file').removeAttr('style');
		$('.modifyBtn').removeClass('blue-background');
		$('.modifyBtn').addClass('green-background');
		$('.modifyBtn').text('确定');
		$(".detailsBar input").css('border', '1px solid #000000');
		$(".detailsBar input").removeAttr('disabled');
		$("#accountPer").attr('disabled', 'disabled');
		$("#accountPer").css('border', 'none');
		$("#managePer").attr('disabled', 'disabled');
		$("#managePer").css('border', 'none');
		flag = false;
		// console.log(flag);
	}else{
			$('.modifyBtn').text('修改');
			$('.modifyBtn').removeClass('green-background');
			$('.modifyBtn').addClass('blue-background');
			$('.file').attr('style', 'display: none');
			$('.modifyBtn').attr('background-color',"#27d1eb");
			$(".detailsBar input").css('border', 'none'); 
			$('.detailsBar input').attr('disabled', 'disabled');
		flag = true; 
		// console.log(flag);
	}
	if ($('.modifyBtn').text() == '确定') {
		$('.modifyBtn').on('click',function(){
			//用户修改信息请求后台
			$.ajax({
				url:head+"/booksGuide/bookstoreShopAssistant/updateBookstoreShopAssistant",
				type:"get",
				traditional:true,
				xhrFields:{
				        withCredentials:true
				    },
				crossDomain: true,
				dataType:"json",
				data:{
					"id":userId,
					"name": $('#namePer').val(), //姓名
					"sex": $("#sexPer").val(), //性别
					"birthday": $("#birthPer").val(), //出生日期(非必填)
					"age": $("#agePer").val(), //年龄(非必填)
					"identityCard": $("#IdCardPer").val(), //身份证号码(非必填)
					"address": $("#addressPer").val(), //现住地址(非必填)
					"phone": $("#phonePer").val(), //联系电话
					"EMail": $("#emailPer").val(), //电子邮件(非必填)
					"username": $("#accountPer").val(), //账号
					"password": $("#pwdPer").val(), //密码
					"managePer": $("#managePer").val() //管理的书店
				},
				success:function(data){
					console.log(data);
				},
				error:function(xhr,type,err){
					console.log(xhr.status);
				},
			});
		});
		console.log(detailsBarInfos);
		console.log($('.detailsBar input').val());
		for (var i = 0; i < $('.detailsBar input').length; i++) {
			//判断选项不能为空
			let detailsBarVal = detailsBarInfo[Object.keys(detailsBarInfo)[i]];
			if (detailsBarVal == "") {
				alert("必填选项不能为空");
				return false;
			}
		}
		
	}
}

//进入创建书店页面
function createBookstoreFun(){
	console.log(history.length);
	console.log(detailsBarInfo[Object.keys("managePer")]);
	$('#bookstore-management').hide();
	$("#create-bookstore").show();
	$('.navList li').click(function() {
		$("#create-bookstore").hide();
	});
}