var name = new Array(); //会员卡名称
var vipCardMoney = new Array(); //会员卡金额
var validTime = new Array(); //有效时间
var borrowBooksSum = new Array(); //可借数量
var loseBooksFineTimes = new Array(); //丢失罚金倍数
var rates = new Array(); //收费标准
var overDueChargeStandard = new Array(); //超期收费标准

var datalist = []; //数组
var nameArr = new Array();
var vipId = new Array();
var guestId = new Array();
//散客卡变量声明
var guestName = new Array(); //散客卡名称
var cashPledge = new Array(); //押金
var guestBorrowBooksSum = new Array(); //可借数量
var guestLoseBooksFineTimes = new Array(); //丢失罚金倍数
var guestRates = new Array(); //收费标准
var guestOverDueStandard = new Array(); //超期收费标准

var guest_datalist = []; //数组


$(document).ready(function() {
	$.ajax({
		url: "http://192.168.2.13:8081/booksGuide/membershipCard/selectMembershipCard?sign=1",
		type: "get",
		async: false,
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			console.log("查看会员卡success");
			console.log(data);

			for (var i = 0; i < data.data.length; i++) {
				datalist = data.data[i];
				// console.log(data.data);
				// console.log(datalist.name + ' ' + datalist.address);
				nameArr.push(datalist.name);
				vipCardMoney.push(datalist.transactionMoney);
				validTime.push(datalist.validTime);
				borrowBooksSum.push(datalist.borrowBooksSum);
				loseBooksFineTimes.push(datalist.loseBooksFineTimes);
				rates.push(datalist.rates);
				overDueChargeStandard.push(datalist.overDueChargeStandard);
				vipId.push(datalist.id);
			}
			console.log("会员卡名称："+nameArr + ' && vipId数组：' + vipId); 
			//渲染若干书店
			var htmlBox = '';
			data.data.forEach((item, index, array) => {
				// console.log(index);
				htmlBox += '<tr id='+ vipId[index] +'>'
				htmlBox += '<td><input type="checkbox"/></td>';
				htmlBox += '<td>' + (index+1) +
				'</td>'; //<div id=' + idArr[index] + ' class="storeHead">
				htmlBox += '<td>' + nameArr[index] + '</td>';
				htmlBox += '<td>' + vipCardMoney[index] + '</td>';
				htmlBox += '<td>' + validTime[index] + '</td>';
				htmlBox += '<td>' + borrowBooksSum[index] + '</td>';
				htmlBox += '<td>' + loseBooksFineTimes[index] + '</td>';
				htmlBox += '<td>' + rates[index] + '</td>';
				htmlBox += '<td>' + overDueChargeStandard[index] + '</td>';
				htmlBox +=
					'<td><span class="line-exit">&nbsp; 修改&nbsp;</span>&nbsp; &nbsp;<span class="line-delete" onclick="deleteCard()">&nbsp;删除&nbsp;</span> </td>';
				htmlBox += '</tr>'
			});
			$(".vip-table-head").after(htmlBox);
			// 点击修改，显示修改弹窗
			$(".line-exit").on('click',function(){
				var exit_guest=$(this).parent().parent().attr("id");
				$(".exit_vip_mask").css('display','block');
				console.log(exit_guest);
				//确定修改会员卡，发送请求
				$(".updateVipCard").on('click',function(){
					//判断必填项不能为空
					if($("#exit_vip_name").val()==""){
						alert("会员卡名称不能为空!");
						$("#exit_vip_name").focus();
						return;
					} else if($("#exit_vip_money").val()==""){
						alert("会员卡金额不能为空");
						$("#exit_vip_money").focus();
						return;
					} else if($("#exit_vip_validTime").val()==""){
						alert("有效时间不能为空");
						$("#exit_vip_validTime").focus();
						return;
					}else if($("#exit_vip_borrowNum").val()==""){
						alert("可借数量不能为空");
						$("#exit_vip_borrowNum").focus();
						return;
					}else if($("#exit_vip_borrowDays").val()==""){
						alert("可借天数不能为空");
						$("#exit_vip_borrowDays").focus();
						return;
					}else if($("#exit_vip_standard").val()==""){
						alert("超期收费标准不能为空");
						$("#exit_vip_standard").focus();
						return;
					}else if($("#exit_vip_multiple").val()==""){
						alert("丢失罚金倍数不能为空");
						$("#exit_vip_multiple").focus();
						return;
					}else{
						$.ajax({
							url: head + "/booksGuide/membershipCard/updateMembershipCard",
							type: "get",
							data: {
								"bookstoreHeadquartersId": headStoreId,//总店id
								"id": exit_guest,//会员卡id
								"sign": 1,//0为散客，1为会员
								"name": $("#exit_vip_name").val(),//会员卡名称
								"validTime": $("#exit_vip_validTime").val(),//有效时间
								"borrowBooksDay": $("#exit_vip_borrowDays").val(),//可借图书天数
								"borrowBooksSum": $("#exit_vip_borrowNum").val(),//可借图书数量
								"loseBooksFineTimes": $("#exit_vip_multiple").val(),//丢失图书罚金倍数
								"overDueChargeStandard": $("#exit_vip_standard").val(),//超期收费标准
								"transactionMoney": $("#exit_vip_money").val()//办理金额
							},
							dataType: "json",
							xhrFields: {
								withCredentials: true
							},
							crossDomain: true,
							success: function(data) {
								console.log("修改会员卡success");
								console.log(data);
								//隐藏修改会员卡弹窗
								$(".exit_vip_mask").css('display','none');
								location.reload();
							},
							error: function(xhr, type, err) {
								console.log(xhr.status);
								console.log("修改会员卡error");
							}
						});
					}
				});
				
			});
			//如果数据长度不为零，就隐藏空页面
			if(data.data.length!=0){
				$("#vip-table").css('display','block');
				$(".container").css('display','none');
				console.log("会员数据长度不为零");
			}else{
				$("#vip-table").css('display','none');
				$(".container").css('display','block');
				console.log("会员数据长度为零");
			}
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
			console.log("查看会员卡error");
		}
	});
	$.ajax({
		url: "http://192.168.2.13:8081/booksGuide/membershipCard/selectMembershipCard?sign=0",
		type: "get",
		dataType: "json",
		async: false,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			console.log("查看散客success");
			console.log(data); //{code: 200, message: "查询成功", data: Array(1)}
			// console.log(data.data); //[{…}]
			for (var i = 0; i < data.data.length; i++) {
				guest_datalist = data.data[i];
				// console.log(data.data);
				// console.log(datalist.name + ' ' + datalist.address);
				guestName.push(guest_datalist.name);
				cashPledge.push(guest_datalist.cashPledge);
				guestBorrowBooksSum.push(guest_datalist.borrowBooksSum);
				guestLoseBooksFineTimes.push(guest_datalist.loseBooksFineTimes);
				guestRates.push(guest_datalist.rates);
				guestOverDueStandard.push(guest_datalist.overDueChargeStandard);
				guestId.push(guest_datalist.id);
			}
			console.log("散客卡名称："+ guestName + ' && guestId数组：' + guestId); //["散客卡"]
			//渲染若干书店
			var htmlBox = '';
			data.data.forEach((item, index, array) => {
				// console.log(index);
				htmlBox += '<tr id='+ guestId[index] +'>';
				htmlBox += '<td><input type="checkbox"/></td>';
				htmlBox += '<td>' + (index+1) +
				'</td>'; 
				htmlBox += '<td>' + guestName[index] + '</td>';
				htmlBox += '<td>' + cashPledge[index] + '</td>';
				htmlBox += '<td>' + guestBorrowBooksSum[index] + '</td>';
				htmlBox += '<td>' + guestLoseBooksFineTimes[index] + '</td>';
				htmlBox += '<td>' + guestRates[index] + '</td>';
				htmlBox +=
					'<td><span class="line-exit">&nbsp; 修改&nbsp;</span>&nbsp; &nbsp;<span class="line-delete" onclick="deleteCard()">&nbsp;删除&nbsp;</span> </td>';
				htmlBox += '</tr>'
			});
			$(".guest-table-head").after(htmlBox);
			// 点击修改，显示修改散客卡弹窗
			$(".line-exit").on('click',function(){
				var exit_guest=$(this).parent().parent().attr("id");
				console.log($(this).parent().parent().attr("id"));
				$(".exit_guest_mask").css('display','block');
				//确定修改散客卡，发送请求
				$(".updateGuestCard").on('click',function(){
					//判断必填项不能为空
					if($("#exit_guest_name").val()==""){
						alert("散客卡名称不能为空!");
						$("#exit_guest_name").focus();
						return;
					} else if($("#exit_guest_deposit").val()==""){
						alert("押金金额不能为空");
						$("#exit_guest_deposit").focus();
						return;
					} else{
						$.ajax({
							url: head + "/booksGuide/membershipCard/updateMembershipCard",
							type: "get",
							data: {
								"bookstoreHeadquartersId": headStoreId,//总店id
								"id": exit_guest,//散客卡id
								"sign": 0,//0为散客，1为会员
								"name": $("#exit_guest_name").val(),//散客卡名称
								"cashPledge": $("#exit_guest_deposit").val(),//押金
								"borrowBooksSum": $("#exit_guest_borrowNum").val(),//可借图书数量
								"loseBooksFineTimes": $("#exit_guest_multiple").val(),//丢失图书罚金倍数
								"rates": $("#exit_guest_standard").val()//收费标准
							},
							dataType: "json",
							xhrFields: {
								withCredentials: true
							},
							crossDomain: true,
							success: function(data) {
								console.log("修改会员卡success");
								console.log(data);
								//隐藏修改会员卡弹窗
								$(".exit_guest_mask").css('display','none');
								location.reload();
							},
							error: function(xhr, type, err) {
								console.log(xhr.status);
								console.log("修改会员卡error");
							}
						});
					}
				});
			});
			//如果数据长度不为零，就隐藏空页面
			if(data.data.length!=0){
				$("#guest-table").css('display','block');
				$(".container").css('display','none');
				console.log("散客数据长度不为零");
			}else{
				$("#guest-table").css('display','none');
				$(".container").css('display','block');
				console.log("散客数据长度为零");
			}
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
			console.log("查看散客error");
		}
	});
});


// 复选框全选
$("#vipAllChecked").change(function() {
	$("#vip-table input:checkbox").prop('checked', $(this).prop("checked"));
});
$("#guestAllChecked").change(function() {
	$("#guest-table input:checkbox").prop('checked', $(this).prop("checked"));
});

//返回上一页
function backBtnFun() {
	// var _iframe = parent.location.reload();
	// window.history.go(_iframe);
	window.location.href = document.referrer;
	console.log(document.referrer);
}

// 显示选择添加(会员卡、散客卡)弹窗
function showSelect() {
	//显示弹框添加
	$(".mask").css("display", "block");
}

//取消选择添加 关闭弹窗
$(".cancelBtn").on('click', function() {
	//隐藏选择弹框
	$(".mask").css("display", "none");
});

// 选择卡片种类的状态切换
var flag;
$("#vip-card").on('click', function() {
	$(this).children('img').attr('src', '../../picture/images/vip-light.png');
	$('.guest-icon').attr('src', '../../picture/images/disperse-guest-dark.png');
	flag = true;
});
$("#guest-card").on('click', function() {
	$(this).children('img').attr('src', '../../picture/images/disperse-guest-light.png');
	$('.vip-icon').attr('src', '../../picture/images/vip-dark.png');
	flag = false;
});

//确定选择添加 判断显示会员||散客弹窗
function sureBtnFun() {
	if (flag) {
		//隐藏选择弹框
		$(".mask").css("display", "none");
		//显示弹窗添加会员卡
		$(".vip_mask").css("display", "block");
		//隐藏弹窗添加散客卡
		$('.guest_mask').css("diaplay","none");
	} else {
		//隐藏选择弹框
		$(".mask").css("display", "none");
		//显示弹窗添加散客卡
		$(".guest_mask").css("display","block");
		//隐藏弹窗添加会员卡
		// $(".vip_mask").css("display", "none");
	}
}

//关闭添加会员卡弹窗
function vipCancelFun() {
	$(".vip_mask").css("display", "none");
}
//关闭添加散客卡弹窗
function guestCancelFun(){
	$(".guest_mask").css("display","none");
}

var vip_name=$("#vip_name").val();
var vip_money=$("#vip_money").val();
var vip_validTime=$("#vip_validTime").val();
var vip_borrowNum=$("#vip_borrowNum").val();
var vip_borrowDays=$("#vip_borrowDays").val();
var vip_standard=$("#vip_standard").val();
var vip_multiple=$("#vip_multiple").val();
var Ohref=decodeURI(window.location.href);
var headStore=Ohref.split('?headStoreId=');
var headStoreId = headStore[1].split("&")[0];
var headStoreName = headStore[1].split("&headStoreName=")[1];
console.log("会员卡页面的 总店id:"+headStoreId + ';总店name:' + headStoreName);
//确定添加会员卡 发送请求
function vipSubmitFun() {
	//判断必填项不能为空
	if($("#vip_name").val()==""){
		alert("会员卡名称不能为空");
		$("#vip_name").focus();
		return;
	} else if($("#vip_money").val()==""){
		alert("会员卡金额不能为空");
		$("#vip_money").focus();
		return;
	} else if($("#vip_validTime").val()==""){
		alert("有效时间不能为空");
		$("#vip_validTime").focus();
		return;
	}else if($("#vip_borrowNum").val()==""){
		alert("可借数量不能为空");
		$("#vip_borrowNum").focus();
		return;
	}else if($("#vip_borrowDays").val()==""){
		alert("可借天数不能为空");
		$("#vip_borrowDays").focus();
		return;
	}else if($("#vip_standard").val()==""){
		alert("超期收费标准不能为空");
		$("#vip_standard").focus();
		return;
	}else if($("#vip_multiple").val()==""){
		alert("丢失罚金倍数不能为空");
		$("#vip_multiple").focus();
		return;
	}else{
		$.ajax({
			url: head + "/booksGuide/membershipCard/addMembershipCard",
			type: "get",
			data: {
				"bookstoreHeadquartersId": headStoreId,//总店id
				"sign": 1,//0为散客，1为会员
				"name": $("#vip_name").val(),//会员卡名称
				"validTime": $("#vip_validTime").val(),//有效时间
				"borrowBooksDay": $("#vip_borrowDays").val(),//可借图书天数
				"borrowBooksSum": $("#vip_borrowNum").val(),//可借图书数量
				"loseBooksFineTimes": $("#vip_multiple").val(),//丢失图书罚金倍数
				"overDueChargeStandard": $("#vip_standard").val(),//超期收费标准
				"transactionMoney": $("#vip_money").val()//办理金额
			},
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log("添加会员卡success");
				console.log(data);
				location.reload();//刷新页面
			},
			error: function(xhr, type, err) {
				console.log(xhr.status);
				console.log("添加会员卡error");
			}
		});
	}
}

//确定添加散客卡，发送请求
function guestSubmitFun(){
	//判断必填项不能为空
	if($("#guest_name").val()==""){
		alert("散客卡名称不能为空");
		$("#guest_name").focus();
		return;
	} else if($("#guest_deposit").val()==""){
		alert("押金金额不能为空");
		$("#guest_deposit").focus();
		return;
	} else{
		$.ajax({
			url: head + "/booksGuide/membershipCard/addMembershipCard",
			type: "get",
			data: {
				"bookstoreHeadquartersId": headStoreId,//总店id
				"sign": 0,//0为散客，1为会员
				"name": $("#guest_name").val(),//散客卡名称
				"cashPledge": $("#guest_deposit").val(),//押金
				"borrowBooksSum": $("#guest_borrowNum").val(),//可借图书数量
				"loseBooksFineTimes": $("#guest_multiple").val(),//丢失图书罚金倍数
				"rates": $("#guest_standard").val()//收费标准
			},
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log("添加会员卡success");
				console.log(data);
				location.reload();//刷新页面
			},
			error: function(xhr, type, err) {
				console.log(xhr.status);
				console.log("添加会员卡error");
			}
		});
	}
}

var idNum;
// 删除会员/散客卡
function deleteCard() {
	// console.log(id);
	$("#vip-details tr").on('click',function(){
		console.log($(this).attr('id'));
		idNum = $(this).attr('id');
		$.ajax({
			url: head + "/booksGuide/membershipCard/deleteMembershipCardById",
			type: "get",
			data: {
				"membershipCardId":idNum
			},
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
			success: function(data) {
				console.log("删除会员/散客卡success");
				console.log(data);
				location.reload();
			},
			error: function(xhr, type, err) {
				console.log(xhr.status);
				console.log("删除会员/散客卡error");
			}
		});
	});
	
}


// 确定修改会员卡
function updateVipCard() {
	console.log(idNum);
	/* $.ajax({
		url: head + "/booksGuide/membershipCard/updateMembershipCard",
		type: "get",
		data: {
			"bookstoreHeadquartersId": headStoreId,//总店id
			"sign": 1,//0为散客，1为会员
			"name": $("#exit_vip_name").val(),//会员卡名称
			"validTime": $("#exit_vip_validTime").val(),//有效时间
			"borrowBooksDay": $("#exit_vip_borrowDays").val(),//可借图书天数
			"borrowBooksSum": $("#exit_vip_borrowNum").val(),//可借图书数量
			"loseBooksFineTimes": $("#exit_vip_multiple").val(),//丢失图书罚金倍数
			"overDueChargeStandard": $("#exit_vip_standard").val(),//超期收费标准
			"transactionMoney": $("#exit_vip_money").val()//办理金额
		},
		dataType: "json",
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data) {
			console.log("修改会员卡success");
			console.log(data);
			// location.reload();
		},
		error: function(xhr, type, err) {
			console.log(xhr.status);
			console.log("修改会员卡error");
		}
	}); */
}

// 关闭修改会员卡弹窗 
function cancelExitVip(){
	$(".exit_vip_mask").css('display','none');
}
//关闭修改散客卡弹窗
function exitGuestCancel(){
	$(".exit_guest_mask").css('display','none');
}