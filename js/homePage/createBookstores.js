var name = new Array(); //书店名称
var address = new Array(); //书店地址
var datalist = []; //数组书店
var nameArr = new Array();
var idArr = new Array();

//查询（查看）总书店 || 初始化页面时请求后台 查询有几个书店以便展示
$(document).ready(function() {
				// $(".store-list").css("display", "none");
	// function iframeLoad(){
	$.ajax({
		url: "http://192.168.2.13:8081/booksGuide/bookstoreHeadquarters/selectAllBookstoreHeadquarters",
		type: "get",
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			for (var i = 0; i < data.data.length; i++) {
				datalist = data.data[i];
				console.log("创建书店数据"+data.data);
				// console.log(datalist.name + ' ' + datalist.address);
				nameArr.push(datalist.name);
				idArr.push(datalist.id);
				// console.log(nameArr);
			}
			// console.log("最终nameArr"+nameArr);//["亚博书店", "亚博书店", "总店"]
				console.log("总店id"+idArr);//[1, 2, 3, 4]
			//渲染若干总书店
			var htmlBox = '';
			var htmlBtn = '';
			data.data.forEach((item, index, array) => {
				// console.log(index);
				htmlBox += '<li>'
				// htmlBox += '<div id=box' + (index + 1) + ' class="storeHead">';
				htmlBox += '<div id=' + idArr[index] + ' class="storeHead">';
				htmlBox += '<p>' + nameArr[index] + '</p>';
				htmlBox +=
					'<img class="editIcon" onclick="editBookstore()" src="../../picture/images/edit.png" />';
				htmlBox +=
					'<img class="deleteIcon" onclick="deleteBookstore()" src="../../picture/images/delete.png" />';
				htmlBox += '</div>'
				htmlBox +=
					'<img class="bookstore-img" src="../../picture/images/createStore.png" />';
				htmlBox += '</li>'
				
			});
				htmlBtn += '<div class="backBox">';
				htmlBtn += '<button class="btn backBtn02 blue-background" onclick="backBtnFun()">返回</button>';
				htmlBtn += '</div>';
				
			$(".group-list").append(htmlBox);
			$(".group-list").after(htmlBtn);
			//查看分店
			$(".bookstore-img").on('click',function(){
				console.log($(this).prev().attr('id'));
				console.log($(this).prev().find('p').text());
				var headStoreId=$(this).prev().attr('id');
				var headStoreName=$(this).prev().find('p').text();
				//跳转页面并传值（总店id、总店名称）给分店页面
				var url = encodeURI("partBookStore.html?headStoreId="+headStoreId+"&headStoreName="+headStoreName);
				window.location.href = url;
			});
			
			if (data.data.length == 0) {
				console.log("data数组为空");
				//显示无书店提示页面
				$(".container").css("display", "block");
				$(".store-list").css("display", "none");
				
			} else {
				console.log("name数组不为空");
				//隐藏无书店提示页面
				$(".container").css("display", "none");
				$(".store-list").css("display", "block");
			}
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
		}
	});

});

//添加书店的弹窗
function addBookstoreFun() {
	$(".mask").css("display", "block");
}

//点击确定添加总书店
function sureBtnFun() {
	// console.log("名称"+$("#storeName").val()+"地址"+storeAddress);
	//向后台请求添加书店
	$.ajax({
		url: head + "/booksGuide/bookstoreHeadquarters/addBookstoreHeadquarters",
		type: "get",
		data: {
			"name": $("#storeName").val(),
			"address": $("#storeAddress").val()
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log("进添加总书店success");
			location.reload();
			// window.location.href = "../../window/enterInto/login.html";
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
			console.log("进添加总书店error");
		}
	});
	$(".mask").css("display","none");//隐蔽蒙层 蒙层颜色是不透明白色
	//确定添加就刷新页面 以便加载新书店
	// window.location.reload();//刷新当前页面.
	// parent.location.reload();
	// opener.location.reload();
	// opener.location.reload();
}
//取消添加 关闭（添加和修改总书店）弹窗
$(".cancelBtn").on('click', function() {
	//隐藏弹框添加书店
	$(".mask").css("display", "none");
	//隐藏弹框修改书店
	$(".editMask").css("display", "none");
});


//返回上一页
function backBtnFun(){
	var _iframe = parent.location.reload();
	window.history.go(_iframe);
}
// $('.backBtn').on('click', function() {
	// console.log(_iframe);
	// var _divManage =_iframe.$('#bookstoreManagement');
	// var _divCenter =_iframe.$('#personalCenter');//显示个人中心
	// window.history.go(-1); //返回上一页，直接返回登陆页面了
	// window.history.back(); //返回上一页，直接返回登陆页面了
	// _divManage.show();
	// _divCenter.hide(); 
	// _iframe.window.frames['create-bookstore'].history.back();
// });

//删除总书店
function deleteBookstore(){
	// 获取删除哪一个，获取id传值给后台
	$('.group-list li div').on('click',function(){
		// console.log("点击盒子的id是"+$(this).attr('id'));
		var targetBox=$(this).attr('id');
		console.log("点击盒子的删除id是"+targetBox);
		$.ajax({
			url:head+"/booksGuide/bookstoreHeadquarters/deleteBookstoreHeadquartersById",
			type:"get",
			data:{
				"bookstoreHeadquartersId":targetBox
			},
			dataType:"json",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success:function(data){
				console.log("进删除总书店success");
				console.log(data);
				location.reload();
			},
			error:function(xhr,type,err){
				console.log(xhr.status);
				console.log("进删除总书店error");
			}
		});
	});
}

//修改总书店的弹窗
function editBookstore(){
	// 获取点击盒子id传值给后台
	$('.group-list li div').on('click',function(){
		// console.log("点击盒子的id是"+$(this).attr('id'));
		var targetEdit=$(this).attr('id');
		console.log("点击盒子的修改id是"+targetEdit);
		// 显示修改书店的弹窗
		$(".editMask").css("display", "block");
		// 点击确定修改
		$(".sureEdit").on('click',function(){
			$.ajax({
				url:head+"/booksGuide/bookstoreHeadquarters/updateBookstoreHeadquarters",
				type:"get",
				data:{
					"id":targetEdit,//书店id
					"name": $("#editStoreName").val(),//书店名称
					"address": $("#editStoreAddress").val()//书店地址
				},
				dataType:"json",
				xhrFields: {
					withCredentials: true
				},
				crossDomain: true,
				success:function(data){
					if (data.code == 200) {
						console.log("进修改总书店success");
						console.log(data);
						location.reload();
					}else if (data.code == 201) {
						alert("您没有权限修改和删除，请联系管理员进行操作");
					} else if (data.code == 500) {
						console.log("code==500");
					} else {
						alert(data.message);
					}
				},
				error:function(xhr,type,err){
					console.log(xhr.status);
					console.log("进修改总书店error");
				}
			});
			//隐蔽弹窗和蒙层 蒙层颜色是不透明白色
			$(".editMask").css("display","none");
		});
	});
	
}

function sureAddFun(){
	
}

function seebBookstore() {

	// for(var i = 0; i<$('.store-list>ul').children().length; i++){
	// 	$('.store-name')[i].innerHTML = storeName;
	// 	$('.editIcon')[i].src = '../../picture/images/edit.png';
	// 	$('.deleteIcon')[i].src ='../../picture/images/delete.png';
	// 	$('.bookstore-img')[i].src = '../../picture/images/createStore.png';
	// }
}
