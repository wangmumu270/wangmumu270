
//初始化页面
$(document).ready(function() {
	//获取上个页面（partBookStore.html）路径传值参数
	var Ohref=decodeURI(window.location.href);
	var headStore=Ohref.split('?headStoreId=');
	var headStoreId = headStore[1].split("&headStoreName")[0];
	var headStoreName = headStore[1].split("&headStoreName=")[1].split("&partStoreId")[0];
	var partStoreId = headStore[1].split("&partStoreId=")[1].split("&partStoreName")[0];
	var partStoreName = headStore[1].split("&partStoreName=")[1];
	console.log(headStore);
	console.log("总店id:"+headStoreId + ';总店name:' + headStoreName);
	console.log('分店id:' + partStoreId + ';分店name:' + partStoreName);
	//渲染到页面标题
	$("#headStore").text(headStoreName);
	$("#partStore").text(partStoreName);
})

//返回上一页病刷新
function backBtnFun() {
	// window.location.href = document.referrer;
	window.history.go(-1);
}

function shelfManageFun(){
	window.location.href = "shelfManage.html";
}