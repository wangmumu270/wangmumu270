
var headStoreId;//总店id
var headStoreName;//总店name

var datalist;//总data, (2) [{…}, {…}]
var storeDetail=new Array();
var booksNum = new Array();//书架数量
var bookrackStruNum = new Array();//书籍数量
var branchName = new Array();//分店名称
var branchId = new Array();//分店id

var targertBoxId;
var targertBoxIds;
var targertBoxNames;
//根据总店id查询所有分店
$(document).ready(function() {
	var Ohref=decodeURI(window.location.href);
	var headStore=Ohref.split('?headStoreId=');//?
	// var headStoreName=Ohref.split('headStoreName=');+"总店name==="+headStoreName[2]
	headStoreId = headStore[1].split("&")[0];
	headStoreName = headStore[1].split("&headStoreName=")[1];
	console.log("总店id:"+headStoreId + ';总店name:' + headStoreName);
	//把总店id和name传给添加会员卡页面(可点击事件跳转页面，也可改变html属性href的值跳转页面)
	var url = encodeURI("addClubCard.html?headStoreId="+headStoreId+"&headStoreName="+headStoreName);
	$(".addClubCardHref").attr('href',url);
	//查询分店
	$.ajax({
		url:"http://192.168.2.13:8081/booksGuide/bookstore/SelectAllBookstore",
		type: "get",
		data: {
			"BookstoreHeadquartersId": headStoreId
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			console.log("查看分店success"+data);
			for (var i = 0; i < data.data.length; i++) {
				datalist = data.data[i];
				booksNum.push(datalist.booksNum);
				bookrackStruNum.push(datalist.bookrackStruNum);
				storeDetail = datalist.bookstore;
				branchId.push(storeDetail.id);
				branchName.push(storeDetail.name);
			}
			console.log("查看分店data:"+datalist);
			console.log("查看分店success");
			console.log("书架数量:"+bookrackStruNum+"书籍数量:"+booksNum);
			console.log("分店id==="+branchId+";branchName==="+branchName);
			//渲染若干分店
			var htmlBox = '';
			htmlBox +='<p class="head-name-style">'+headStoreName+'</p>';
			data.data.forEach((item, index, array) => {
				// console.log(index);
				htmlBox += '<li>';
				htmlBox += '<div id=' + branchId[index] + ' class="storeHead">';
				htmlBox += '<p>' + branchName[index] + '</p>';
				htmlBox +=
					'<img class="editIcon" onclick="editFun()" src="../../picture/images/edit.png" />';
				htmlBox +=
					'<img class="deleteIcon" onclick="" src="../../picture/images/delete.png" />';
				htmlBox += '</div>';
				htmlBox +=
					'<img class="bookstore-img" src="../../picture/images/createStore.png" />';
				htmlBox += '<div class="bookcase">';
				htmlBox += '<div><p>书架数量</p>';
				htmlBox += '<p class="bluetxt">'+ bookrackStruNum[index] +'</p>';
				htmlBox += '</div>';
				htmlBox += '<div><p>书籍数量</p>';
				htmlBox += '<p class="bluetxt">' + booksNum[index] + '</p>';
				htmlBox += '</div>';
				htmlBox += '</li>';
			});
			$(".part-group-list").append(htmlBox);
			// 判断有无分店
			if(datalist==0 || datalist==null || datalist==""){
				console.log("datalist为空");
				$(".container").css('display','block');//显示空分店提示页面
				$(".backBtn02").css('display','none');//隐藏其中一个按钮
				$(".head-name-style").css('display','none');//隐藏所在总店
			}else{
				console.log("datalist不为空");
				$(".container").css('display','none');
				$(".backBtn02").css('display','block');
				$(".head-name-style").css('display','block');
			}
			//获取点击分店的id和Name
			$(".storeHead").on('click',function(){
				console.log($(this).attr('id'));
				targertBoxIds=$(this).attr('id');
				targertBoxNames=$(this).children('p');
			});
			
			// 跳转到分店详情页面,传值 总店id和name，分店id和name
			$(".bookstore-img").on("click",function(){
				var partStoreId = $(this).prev().attr('id');
				var partStoreName = $(this).prev().find('p').text();
				var partStoreDetailUrl = encodeURI("partBookStoreDetail.html?headStoreId="+headStoreId+
				"&headStoreName="+headStoreName+"&partStoreId="+partStoreId+"&partStoreName="+partStoreName);
				window.location.href = partStoreDetailUrl;
			});
			
			// 删除分店，发送请求
			$(".deleteIcon").on('click',function(){
				console.log("删除的分店id："+$(this).parent().attr('id'));
				targertBoxId=$(this).parent().attr('id');
				$.ajax({
					url:head+"/booksGuide/bookstore/deleteBookstoreById",
					type: "get",
					data: {
						"bookstoreId": targertBoxId
					},
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data){
						console.log(data);
						console.log("删除分店success");
						// 刷新当前页面
						location.reload();
					},
					error:function(xhr,type,err){
						console.log(xhr.status);
						console.log("删除分店error");
					}
				});
			});
			// 修改分店，发送请求
			$(".exitPartBookStore").on('click',function(){
				console.log(targertBoxIds);
				$.ajax({
					url:head+"/booksGuide/bookstore/updateBookstore",
					type: "get",
					data: {
						"bookstoreHeadquartersId": headStoreId,//总店id
						"id": targertBoxIds,//分店id
						"name":$("#exitStoreName").val(),
						"address":$("#exitStoreAddress").val()
					},
					dataType: "json",
					xhrFields: {
						withCredentials: true
					},
					crossDomain: true,
					success: function(data){
						console.log(data);
						console.log("修改分店success");
						// 刷新当前页面
						location.reload();
					},
					error:function(xhr,type,err){
						console.log(xhr.status);
						console.log("修改分店error");
					}
				});
			});
			
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
			console.log("查看分店error");
		}
	});
	
})

//返回上一页
function backBtnFun() {
	window.location.href = document.referrer;
	// console.log(document.referrer);
}


// 显示弹窗添加分店
$('.add-bookstore').on('click',function(){
	$(".mask").css("display", "block");
});
// 隐藏弹窗添加分店、修改分店
$('.cancelBtn').on('click',function(){
	$(".mask").css("display", "none");
	$(".exit-mask").css("display", "none");
});
// 确定添加分店，发送请求
function addPartBookStore(){
	// console.log(headStoreId);总店id
	$.ajax({
		url:head+"/booksGuide/bookstore/addBookstore",
		type: "get",
		data: {
			"bookstoreHeadquartersId": headStoreId,//总店id
			"name":$("#storeName").val(),
			"address":$("#storeAddress").val()
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data){
			console.log(data);
			console.log("添加分店success");
			// 刷新当前页面
			location.reload();
		},
		error:function(xhr,type,err){
			console.log(xhr.status);
			console.log("添加分店error");
		}
	});
}

// 显示弹窗修改分店
function editFun(){
	$(".exit-mask").css('display','block');
}

// 确定修改分店，发送请求
/* function exitPartBookStore(){
	// console.log(headStoreId);总店id
	$.ajax({
		url:head+"/booksGuide/bookstore/updateBookstore",
		type: "get",
		data: {
			"bookstoreHeadquartersId": headStoreId,//总店id
			"name":$("#exitStoreName").val(),
			"address":$("#exitStoreAddress").val()
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data){
			console.log(data);
			console.log("修改分店success");
		},
		error:function(xhr,type,err){
			console.log(xhr.status);
			console.log("修改分店error");
		}
	});
} */

// 删除分店，发送请求
/* function deletePartBookStore(){
	console.log(targertBoxId);
	$.ajax({
		url:head+"/booksGuide/bookstore/deleteBookstoreById",
		type: "get",
		data: {
			"bookstoreId": branchId
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data){
			console.log("删除分店success");
		},
		error:function(xhr,type,err){
			console.log(xhr.status);
			console.log("删除分店error");
		}
	});
} */
