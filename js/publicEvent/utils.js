var head;
var request;

//v1和v2盘点进度中的样本盒名称 
$(document).ready(function() {
	$.getJSON("../../deploy.json", function(data) {
		head = data.urlHead;
		request = data.request;
	})
});