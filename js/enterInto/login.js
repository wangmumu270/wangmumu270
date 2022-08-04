var account;
var password;
console.log(head);
window.onload=function(){
	//页面打开，判断是否存储过用户名
	var uName = window.localStorage.getItem('userAccount');
	var uPassword = window.localStorage.getItem('userPassword');
	if(uName != null){//说明之前存储过值，说明用户希望记住用户信息
		$("#account").val(uName);
		console.log(uName);
		// $("#password").value=uName;
	}
	if(uPassword != null){
		$("#password").val(uPassword);
		console.log(uPassword);
	}
}
// $(document).ready(function(){
// });

// 绑定登录按钮点击事件的函数
function checkForm(){
	//得到账号和密码
	account = $("#account").val();
	password = $("#password").val();
	//存储用户名
	localStorage.setItem('UserName',account);
	
	// 判断账号和密码是否为空
	if ((account == "" || account == null) && (password == "" || password == null)) {
		$('#result').text("请输入账号和密码!");
		return false;
	} else if (account == "" || account == null) {
		$('#result').text("请输入账号!");
		return false;
	} else if (password == "" || password == null) {
		$('#result').text("请输入密码!");
		return false;
	}else{
		$('#result').text("");
		$.ajax({
		   url:"http://192.168.2.13:8081/booksGuide/loginController/login",//ServletUrl
		   //async:false,//是否异步
		   type:"POST",
		   xhrFields:{
		           withCredentials:true
		       },
		   crossDomain: true,
		   dataType:"json",//传送的数据类型
		   data:{
		    "loginType": "1",
		    "username":$("#account").val(),
		    "password":$("#password").val(),
		     },//往Servlet或者Controller发送数据
		   success:function(data){//回调函数
		    // console.log("进来了");
		    console.log(JSON.stringify(data));
		    
		    if (data.code == 200) { //账号密码正确登陆成功
		      localStorage.setItem("userId", `${data.data.id}`);
		     //勾选记住密码则存储密码
		     if($('#remember_check').is(':checked')){
		      localStorage.setItem("userAccount", `${data.data.username}`);
		      localStorage.setItem("userPassword", `${data.data.password}`);
		      // console.log(localStorage.getItem("userPassword"));
		     }else{
		      localStorage.removeItem('userAccount');
		      localStorage.removeItem('userPassword');
		     }
		     console.log("code==200");
		     window.location.href = "../../window/homePage/personalCenter.html";
		    } else if (data.code == 201) {
		     // console.log("code==201;用户名或密码错误");
		     $('#result').text("用户名或密码错误!");
		    } else if (data.code == 500) {
		     console.log("code==500");
		    } else {
		     $('#result').text(data.message);
		    }
		   },
		   error:function(xhr, type, err){
		    console.log(xhr.status);
		    console.log("错误");
		   },
		  });
	}
}