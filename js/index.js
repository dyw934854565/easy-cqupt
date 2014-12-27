 // Application Constructor
   function initialize() {
        bindEvents();
    }
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    function bindEvents() {
        document.addEventListener('deviceready', onDeviceReady, false);
        document.addEventListener('backbutton', onBackbutton, false);
		document.addEventListener('menubutton', onMenubutton, false);
		document.addEventListener('menubutton', onMenubutton, false);
    }
    function onDeviceReady() {
        checkConnection();     //检查网络连接
		var txt = localStorage.getItem('autologin');
		if(txt=="true"){
		}else{
			localStorage.removeItem('iflogin');
		}
    }

    function stateChange() {
        checkConnection();
	}
	function onMenubutton(){
		
	}

    function onBackbutton() {
    //    navigator.app.exitApp();
	/*	navigator.notification.confirm(
			'真的要离开吗？',  // 显示信息
			onConfirm,              // 按下按钮后触发的回调函数，返回按下按钮的索引	
			'exit',            // 标题
			'再考虑一下,果断离开'          // 按钮标签
		);      */
		window.plugins.toast.show('再按一次退出', 'short', 'bottom');
		document.removeEventListener('backbutton', onBackbutton, false);
		document.addEventListener('backbutton', exitapp, false)
		setTimeout(exitapp2,3000);
	}
	function exitapp(){
		navigator.app.exitApp();
	}
	function exitapp2(){
		document.addEventListener('backbutton', onBackbutton, false);
		document.removeEventListener('backbutton', exitapp, false);
	}
    function checkConnection(){
        var networkState = navigator.network.connection.type;
		if(networkState==Connection.NONE || networkState==Connection.UNKNOW){//当前无连接
            document.addEventListener('online', stateChange, false);
			document.removeEventListener('offline', stateChange, false);
			window.plugins.toast.show('网络断开连接', 'short', 'bottom');
		}else{
            document.addEventListener('offline', stateChange, false);
			document.removeEventListener('online', stateChange, false);
            if(networkState==Connection.WIFI){
                  window.plugins.toast.show('WIFI连接', 'short', 'bottom');
			}else{    //有各种数据2G/3G/4G不作区别
                  window.plugins.toast.show('当前使用数据流量', 'short', 'bottom');
			}
		}
	}