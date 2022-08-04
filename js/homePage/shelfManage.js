
//初始化页面
$(document).ready(function(){
	//查询书架，渲染页面
	$.ajax({
		url:"http://192.168.2.13:8081/booksGuide/bookstoreHeadquarters/deleteBookstoreHeadquartersById",
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
			console.log("进查看书架success");
			console.log(data);
			location.reload();
		},
		error:function(xhr,type,err){
			console.log(xhr.status);
			console.log("进查看书架error");
		}
	});
})