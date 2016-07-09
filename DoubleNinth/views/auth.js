$(function(){

	var baseUrl="https://activity.camera360.com";
	var host = window.location.hostname;
	var liStatus = true;//线上是true

	if (host.indexOf(10.) >= 0 || host.indexOf(192.) >= 0 || host.indexOf("test") >= 0 || host.indexOf("ktv") >= 0) {
		baseUrl="https://activity-test.camera360.com";
		liStatus = false;
	}
	if(host.indexOf("test") >=0 ) {
		liStatus = true;
	}
	var getQuery = function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return decodeURIComponent(r[2]);
		return null;
	};

	var path = "";
	var hisName = getQuery("hisName");
	var hisImage = getQuery("hisImage");
	var hisOpenid = getQuery("hisOpenid");
	var post = "$$$"+hisName+"$$$"+hisImage+"$$$"+hisOpenid;

	if(hisName) {
		if(liStatus == false){
		     path = "http://activitytest.camera360.com/wechat/oauth?module=photoBazaar&callbackUrl=http://activity-ktv.camera360.com/index.html?hisName="+post;
		}else{
	         path = "http://activitytest.camera360.com/wechat/oauth?module=photoBazaar&callbackUrl=http://"+location.host+"/DoubleNinth/index.html?hisName="+post;
		}
	 }else{
  
	 	if(liStatus == false){
	     	path = "http://activitytest.camera360.com/wechat/oauth?module=photoBazaar&callbackUrl=http://activity-ktv.camera360.com/index.html"; 		
	 	}else {
	     	path = "http://activitytest.camera360.com/wechat/oauth?module=photoBazaar&callbackUrl=http://"+location.host+"/DoubleNinth/index.html";
	 	}
     }
    //微信授权
    setTimeout(function(){
    	window.location.replace(path);
    },500);


});