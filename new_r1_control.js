if(!ip){
	var ip = '';
}
if(!ver){
    var ver = 1000;
}
if(!custom_ip){
	var custom_ip = true;
}
var iframe = document.createElement('iframe');
var qrcode_load = false;
var web_ver = 2016;
var main_div = document.createElement('div');
var connect_timer = -1;
var qrstate = 0;
var ping_timer = -1;
var login_state_timer = -1;
var qrstate_timer = -1;
var qrcode_msg = document.createElement('text');
var qrcode = document.createElement('img');
var login_div = document.createElement('div');
var mousedown = false;
var sound_effects_timer = -1;
var preset_div = document.createElement('div');
var eqs_div = document.createElement('div');
var bass_div = document.createElement('div');
var loudness_div = document.createElement('div');
var sound_effects_div = document.createElement('div');
var music_lrc = document.createElement('span');
var my_modal = document.createElement('div');
var play_index = 0;
var music_title = '';
var title_scrolling_timer = -1;
var switch_btns = document.createElement('div');
var btn_states = [];
var info_time = [];
var title_display_time = 0;
var lrcs = [];
var lrc_timer = -1;
var api_music_info = null;
var init_state = true;
var ws = null;
var tips_data = [];
var current_page = null;
var mousewheel_interval = -1;
var startx = -1;
var starty = -1;
var vols_disabled_timer = -1;
var u_ver = 0;
var music_id = '';
var timer = -1;
var screen_timer = -1;
var screen_div = document.createElement('div');
var h3 = document.getElementsByTagName('h3')[0];
var divs = document.createElement('div');
var texts_div = document.createElement('div');
var btns_div = document.createElement('div');
var musics_div = document.createElement('div');
var vols = document.createElement('input');
var music_pic = document.createElement('img');
var music_time = document.createElement('input');
var music_time_position = document.createElement('text');
var music_time_duration = document.createElement('text');
var div_list = document.createElement('div');
var lists = document.createElement('div');
var list = document.createElement('table');
var vol_text = document.createElement('text');
var buttons = [['点播音乐',{ws_type:'send_message',input:'obj',param:{what:65536,arg1:0,arg2:1,obj:'播放${obj}'},type:1,min_ver:1600,min_uver:1700,err:'请输入要点播的音乐！',succ:'点播成功！'}],
['点播电台',{ws_type:'send_message',input:'obj',param:{what:65536,arg1:0,arg2:1,obj:'收听${obj}'},type:1,min_ver:1600,min_uver:1700,err:'请输入要点播的电台！',succ:'点播成功！'}],
['点播歌单',{ws_type:'send_message',input:'obj',param:{what:65536,arg1:0,arg2:9,obj:'${obj}'},type:1,min_ver:1700,min_uver:1700,err:'请输入要点播的歌单链接！',succ:'点播成功！'}],
['我的收藏',{ws_type:'send_message',param:{what:65536,arg1:0,arg2:8},type:0,min_ver:1700,min_uver:1700,succ:'好的，播放收藏歌单！'}],
['打开蓝牙',{ws_type:'send_message',param:{what:64,arg1:1,arg2:-1},type:0,max_ver:1810,max_uver:1000,succ:'已开启蓝牙！'}],
['打开蓝牙',{ws_type:'send_message',param:{what:256,arg1:3,arg2:-1},type:0,max_ver:1810,min_uver:1001,succ:'已开启蓝牙！'}],
['关闭蓝牙',{ws_type:'send_message',param:{what:64,arg1:2,arg2:-1},type:0,max_ver:1810,succ:'已关闭蓝牙！'}],
['打开氛围灯',{ws_type:'send_message',param:{what:4,arg1:64,arg2:1},type:0,max_ver:1810,succ:'已开启氛围灯！'}],
['关闭氛围灯',{ws_type:'send_message',param:{what:4,arg1:64,arg2:0},type:0,max_ver:1810,succ:'已关闭氛围灯！'}],
['打开蓝牙',{ws_type:'send_message',title:['打开蓝牙','关闭蓝牙'],param:[{what:64,arg1:1,arg2:-1},{what:64,arg1:2,arg2:-1}],type:2,min_ver:1820,max_uver:1000,succ:['已开启蓝牙！','已关闭蓝牙！'],state:[0,'device_state',[[0,1,2],3]]}],
['打开蓝牙',{ws_type:'send_message',title:['打开蓝牙','关闭蓝牙'],param:[{what:256,arg1:3,arg2:-1},{what:64,arg1:2,arg2:-1}],type:2,min_ver:1820,min_uver:1001,succ:['已开启蓝牙！','已关闭蓝牙！'],state:[0,'device_state',[[0,1,2],3]]}],
['执行shell',{ws_type:'shell',input:'shell',param:{shell:'${shell}'},type:1,err:'请输入要执行的命令！'}],
['重启小讯',{type:-1,itemType:'reboot_unisound'}],
['打开氛围灯',{ws_type:'send_message',title:['打开氛围灯','关闭氛围灯'],param:[{what:4,arg1:64,arg2:1},{what:4,arg1:64,arg2:0}],type:2,min_ver:1820,succ:['已开启氛围灯！','已关闭氛围灯！'],state:[0,'music_light_enable',[false,true]]}],
['修改唤醒词',{ws_type:'send_message',input:'obj',param:{what:65536,arg1:0,arg2:3,obj:'${obj}'},type:1,min_ver:1600,err:'请输入要修改的唤醒词！',succ:'唤醒词修改成功！'}],
['设置氛围灯亮度',{ws_type:'send_message',input:'arg2',param:{what:4,arg1:65,arg2:'${arg2}'},type:1,err:'请输入要修改的亮度(默认100，最低可设置1，最高不建议超过200)！',succ:'氛围灯亮度修改成功！'}],
['切换官方氛围效果',{ws_type:'send_message',param:{what:4,arg1:67,arg2:0},type:0,max_ver:1500,succ:'已切换为官方氛围效果！'}],
['切换七彩氛围效果',{ws_type:'send_message',param:{what:4,arg1:67,arg2:1},type:0,max_ver:1500,succ:'已切换为七彩氛围效果！'}],
['切换官方氛围效果',{ws_type:'send_message',param:{what:4,arg1:68,arg2:0},type:0,min_ver:1600,max_ver:1810,succ:'已切换为官方氛围效果！'}],
['切换七彩氛围效果',{ws_type:'send_message',param:{what:4,arg1:68,arg2:2},type:0,min_ver:1600,max_ver:1810,succ:'已切换为七彩氛围效果！'}],
['切换七彩氛围效果',{ws_type:'send_message',title:['切换七彩氛围效果','切换官方氛围效果'],param:[{what:4,arg1:68,arg2:2},{what:4,arg1:68,arg2:0}],type:2,min_ver:1820,succ:['已切换为七彩氛围效果！','已切换为官方氛围效果！'],state:[0,'music_light_mode',[0,[1,2,3]]]}],
['设置背景图片',{type:-1,itemType:'set_background'}]
];
var reg_ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
var background = 'background-color:#A9D0F5';
var update_log = ['2021-03-19:音量条增加防误触(双击激活后可调节)。',
'2021-03-20:增加顶部歌词显示，页面按钮精简(1.8.2.0版本生效)。',
'2021-03-22:更新页面效果，增加滚动歌词(双击封面切换)。',
'2021-03-26:增加音效控制页面(1.8.2.2版本生效)。',
'2021-04-01:优化布局，修复最后最后一句歌词显示错误。',
'2021-04-15:适配new_Unisound1.8、EchoService1.8.25登录功能。',
'2021-04-16:增加音箱连接页面，优化页面布局。'
];
load();
window.onload = function(){
	if(location.href.indexOf('?message') > -1){
		if(window.addEventListener){
			window.addEventListener("message",displayMessage, false);
		}else{
			window.attachEvent("onmessage", displayMessage);
		}

		function displayMessage(e){
			var data = e.data;
			if(data.type = 'set_background'){
				if(data.value == ''){
					img = background;
					localStorage.removeItem('background');
				}else{
					img = 'background: url("'+data.value+'") center top / cover no-repeat fixed;';
					localStorage.setItem('background',img);
				}
				document.getElementsByTagName("body")[0].style.cssText = img;
			}
		};
		return;
	}
	if(custom_ip){
		custom_ip_page();
	}else{
		init_login();
		init();
	}
}


function custom_ip_page(){
	document.title = 'R1音箱连接页面'
	document.getElementsByTagName('h3')[0].innerHTML = '请输入音箱IP进行连接！';
	var div = document.createElement('div');
	div.id = 'custom_ip_page';
	var text = document.createElement('text');
	text.innerHTML = 'IP(不需要输入端口)：';
	div.appendChild(text);
	var input = document.createElement('input');
    input.type = 'text';
    input.id = 'input';
    div.appendChild(input);
	var btn = document.createElement("input");
	btn.type = 'button';
	btn.className = 'btn';
	btn.value = '连接';
	btn.setAttribute('data','');
	btn.onclick = function(){
		test_connect();
	};
	div.appendChild(btn);
	
	var btn = document.createElement("input");
	btn.type = 'button';
	btn.className = 'btn';
	btn.value = '配网';
	btn.setAttribute('data','');
	btn.onclick = function(){
		onhide_config_net();
	};
	//div.appendChild(btn);
	var div1 = document.createElement('div');//占位
	div1.style.height = '10px';
	div.appendChild(div1);
	divs.appendChild(div);
	var tmp = window.localStorage.getItem('ip');
	if(tmp != ''){tmp = tmp.substring(0,tmp.indexOf(':'));}
	if(reg_ip.test(tmp)){
		main_div.onclick = function(){
			main_div.onclick = function(){};
			clearTimeout(connect_timer);
			connect_timer = -1;
			document.getElementsByTagName('h3')[0].innerHTML = '已取消自动连接！';
			setTimeout(function(){
				if(document.getElementsByTagName('h3')[0].innerHTML == '已取消自动连接！'){
					document.getElementsByTagName('h3')[0].innerHTML = '请输入音箱IP进行连接！';
				}
			},1000);
		};
		input.value = tmp;
		document.getElementsByTagName('h3')[0].innerHTML = '检测到上次连接记录，2秒后自动连接，点击页面空白处取消连接！';
		connect_timer = setTimeout(function(){
			main_div.onclick = function(){};
			test_connect();
		},2000);
	}
	
	//config_net_page
	var div = document.createElement('div');
	div.id = 'config_net_page';
	div.style = 'display:none;';
	
	
}

function test_connect(){
	var test_connect_state = false;
	var input_ip = document.getElementById('input');
	ip = input_ip.value;
	if(!reg_ip.test(ip)){
		alert('请输入正确的IP');
	}else{
		document.getElementsByTagName('h3')[0].innerHTML = '请稍候，正在连接音箱。。。';
		ip = ip + ':8080';
		ws = new WebSocket("ws://"+ip);
		ws.onopen = function(data){
			console.log("socket测试连接成功")
			divs.removeChild(document.getElementById('custom_ip_page'));
			test_connect_state = true;
			document.getElementsByTagName('h3')[0].innerHTML = '连接音箱成功，正在初始化。。。';
			window.localStorage.setItem('ip',ip);
			ws.close();
			ws = null;
			console.log("socket测试关闭")
			init();
			
			// custom_ip_page();
			// window.location.href = 'http://'+ip;
			
			return;
			init_login();
			init();
			start_unisound();
			ws.send(JSON.stringify({type:'get_info'}));
		};
		ws.onclose = function(data){
			test_connect_state = true;
			if(data.code == 1006){
				document.getElementsByTagName('h3')[0].innerHTML = '请输入音箱IP进行连接！';
				var msg = '连接音箱失败，请检查音箱IP是否正确或重启音箱再试！';
				alert(msg);
			}
		};
		setTimeout(function(){
			if(!test_connect_state){
				document.getElementsByTagName('h3')[0].innerHTML = '请输入音箱IP进行连接！';
				ws.close();
				var msg = '连接音箱超时，请检查音箱IP是否正确或重启音箱再试！';
				alert(msg);
			}
		},5000);
			
	}
}

function init(){
	if(ver < 1){
		ver = 1000;
	}
	var h3 = document.getElementsByTagName('h3')[0];
	if(h3.innerHTML == ''){
		h3.innerHTML = '请稍后。。。';
	}
	h3.style.minHeight = h3.clientHeight;
	
	if(ip == ''){
		ip = document.location.host;
	}
	if(ws == null || ws.readyState == WebSocket.CLOSED){
		ws = new WebSocket("ws://"+ip);
	}
	ws.onopen = function(data){
		console.log("socket连接成功！")
		var h3 = document.getElementsByTagName('h3')[0];
		if(init_state){
			//ping_timer = setInterval(function(){ws.send(JSON.stringify({type:'ping'}));},3000);
			h3.innerHTML = '连接音箱成功，正在初始化。。。';
			start_unisound();
			ws.send(JSON.stringify({type:'get_info'}));
		}else{
			start_updateinfo();
			h3.innerHTML = '已恢复连接！';
			setTimeout(function(){
				var h3 = document.getElementsByTagName('h3')[0];
				if(current_page == null){
					current_page = document.getElementById('btn_page_music');
				}
				var data = current_page;
				title = data.getAttribute('data');
				if(title == data.value){
					h3.innerHTML = 'R1音箱控制页面';
				}else{
					data.value = title;
					switch_page(data);
				}
			},1000);
		}
	};
	
	ws.onclose = function(data){
		clearInterval(ping_timer);
		stop_updateinfo();
		if(data.code == 1006){
			var h3 = document.getElementsByTagName('h3')[0];
			if(init_state){
				h3.innerHTML = '连接音箱失败，3秒后重试。。。';
				setTimeout("init();",3000);
			}else{
				h3.innerHTML = '与音箱断开连接，3秒后尝试重新连接。。。';
				setTimeout("init();",3000);
			}
		}else if(data.code == 1005){
			
		}
	};
	
	ws.onerror = function(data){
		
	};
	
	ws.onmessage = function(data){
		
		if(typeof(data.data) == "string"){
			data = JSON.parse(data.data);
			message(data);
		}else{
			document.getElementById('screen_img').src = URL.createObjectURL(data.data);
		}
	};
}

function start_unisound(){
	// if(ver > 1825){
	// 	ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am start com.phicomm.speaker.device/.ui.MainActivity'}));
	// }
}

function init_login(){
	login_div.style = 'display:none;';
	qrcode.style = 'margin: 10px auto;position: relative;';
	login_div.appendChild(qrcode_msg);
	login_div.appendChild(document.createElement('div'));
	login_div.appendChild(qrcode);
	var div = document.createElement('div');
	var btn = document.createElement("input");
	btn.type = 'button';
	btn.className = 'btn';
	btn.value = '刷新二维码';
	btn.setAttribute('data','');
	btn.onclick = function(){
		update_qrcode();
	};
	div.appendChild(btn);
	
	if(ver > 1825){
		var btn = document.createElement("input");
		btn.type = 'button';
		btn.className = 'btn';
		btn.value = '重启小讯';
		btn.setAttribute('data','');
		btn.onclick = function(){
			document.getElementsByTagName('h3')[0].innerHTML = '重启中。。。';
			ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am force-stop com.phicomm.speaker.device'}));
			setTimeout(function(){
				ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am start com.phicomm.speaker.device/.ui.MainActivity'}));
				setTimeout(function(){
					document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱登录页面';
					alert('重启完毕！');
				},10000);
			},3000);
		};
		div.appendChild(btn);
	}
	
	login_div.appendChild(div);
	var div = document.createElement('div');//占位
	div.style.height = '10px';
	login_div.appendChild(div);
}


function onhide_login(){
	qrcode.style = 'margin: 10px auto;position: relative;';
	if(!confirm("您是否同意小飞获取您的QQ音乐key和QQ会员ck进行身份验证？")){
		ws.close();
		window.opener = null;
		window.open("about:blank","_self").close();
		window.location.href = "about:blank";
		document.body.innerHTML = "";
	}else{
		document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱登录页面';
		login_div.style.display = 'block';
		//update_qrcode();
		load_qrcode();
	}
}

function hide_login(){
	stop_update_qrstate();
	login_div.style.display = 'none';
}

function load_qrcode(){
	var qrcode_state = localStorage.getItem('qrcode_state');
	var qrcode_data = localStorage.getItem('qrcode_data');
	if(qrcode_state == 1 && qrcode_data != ''){
		qrcode_load = false;
		qrcode_msg.innerHTML = '<h3>请稍候。。。</h3><h3></h3>';
		qrcode.onload = function(){
			qrcode_load = true;
			qrcode.onload = function(){}
			qrcode_msg.getElementsByTagName('h3')[0].innerText = '请扫码登录！(可在手机QQ内粘贴打开此页面地址，长按二维码图片扫码登录！)';
			start_update_qrstate();
		}
		update_qrcode_data(JSON.parse(qrcode_data));
	}else{
		update_qrcode();
	}
}

function update_qrcode(){
	qrcode_load = false;
	qrcode_msg.innerHTML = '<h3>请稍候。。。</h3><h3></h3>';
	qrcode.onload = function(){
		qrcode_load = true;
		qrcode.onload = function(){}
		qrcode_msg.getElementsByTagName('h3')[0].innerText = '请扫码登录！(可在手机QQ内粘贴打开此页面地址，长按二维码图片扫码登录！)';
		start_update_qrstate();
	}
	setTimeout(function(){
		if(!qrcode_load){
			ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am start com.phicomm.speaker.device/.ui.MainActivity'}));
			qrcode_msg.innerHTML = '<h3>二维码加载超时，请点击刷新二维码(如多次加载超时请点击重启小讯，提示重启完毕后再点击刷新二维码！)！</h3><h3></h3>';
		}
	},5000);
	ws.send(JSON.stringify({type:'send_to_unisound',data:{type:'get_qrcode'}}));
}

function start_update_qrstate(){
	stop_update_qrstate();
	qrstate_timer = setInterval(function(){
		ws.send(JSON.stringify({type:'send_to_unisound',data:{type:'qrcode_state',qrsig:qrcode.qrsig}}));
	},1500);
}

function stop_update_qrstate(){
	clearInterval(qrstate_timer);
	qrstate_timer = -1;
}

function update_qrcode_data(data){
	qrstate = 0;
	qrcode.src = data.image;
	qrcode.qrsig = data.cookies.qrsig;
	localStorage.setItem('qrcode_state',1);
	localStorage.setItem('qrcode_data',JSON.stringify(data));
}

function update_qrstate(data){
	if(qrstate == 1){
		return;
	}
	qrcode_state = data.qrcode_state;
	call = qrcode_state[qrcode_state.call];
	msg = call[4];
	if((qrcode_state.code != 66 && qrcode_state.code != 67) || data.code == 0){
		localStorage.removeItem('qrcode_state');
		localStorage.removeItem('qrcode_data');
		stop_update_qrstate();
	}
	if(qrcode_state.code == '0'){
		qrstate = 1;
		//cookies = get_cookies(qrcode_state.cookies);
		//cookies = cookies.concat(get_cookies(qrcode_state.location.cookies));
		var uin = get_uin(qrcode_state.location.cookies.p_uin);
		qrcode_msg.getElementsByTagName('h3')[0].innerText = "扫码登录用户："+call[5]+"("+uin+")";
		msg = "正在查询用户信息，请稍候。。。";
		qrcode.style = 'margin: 10px auto;position: relative;border-radius: 100%;';
		qrcode.src = "http://q1.qlogo.cn/g?b=qq&nk="+uin+"&s=100";
		console.log(JSON.stringify(qrcode_state));
		ws.send(JSON.stringify({type:'send_to_unisound',data:{type:'login',qrcode_state:qrcode_state}}));
	}
	qrcode_msg.getElementsByTagName('h3')[1].innerText = msg;
}

function login(data){
	if(data.code == 1){
		if(data.login_state == 1){
			ws.send(JSON.stringify({type:'send_to_unisound',data:{type:'login_state'}}));
			alert('登录成功,欢迎'+data.nick+'['+data.userid+']');
		}else{
			alert(data.login_msg);
			window.opener = null;
			window.open("about:blank","_self").close();
			window.location.href = "about:blank";
			document.body.innerHTML = "";
		}
	}
}

function login_state(data){
	clearTimeout(login_state_timer);
	login_state_timer = -1;
	if(data.code == 1){
		if(!init_state){
			location.reload();
			//hide_login();
			//onhide_index();
			//ws.send(JSON.stringify({type:'get_info'}));
			return;
		}
		if(data.login_state == 0){
			document.getElementsByTagName('h3')[0].innerHTML = '等待小讯初始化。。。(请确保您当前安装的new_Unisound版本是1.8或以上！)';
			login_state_timer = setTimeout(function(){ws.send(JSON.stringify({type:'get_info'}));},1000);
		}else if(data.login_state == 1){
			hide_login();
			onhide_index();
			ws.send(JSON.stringify({type:'get_info'}));
		}else if(data.login_state == -4){
			document.getElementsByTagName('h3')[0].innerHTML = '连接授权服务器失败，请稍候再试！';
			login_state_timer = setTimeout(function(){
				ws.send(JSON.stringify({type:'send_to_unisound',data:{type:'login_state'}}));
			},10000);
			
		}else{
			
			if(data.login_msg.indexOf('授权') > -1){
				if(ver > 1825){
					var btn = document.createElement("input");
					btn.type = 'button';
					btn.className = 'btn';
					btn.value = '重启小讯';
					btn.setAttribute('data','');
					btn.onclick = function(){
						document.getElementsByTagName('h3')[0].innerHTML = '重启中。。。';
						ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am force-stop com.phicomm.speaker.device'}));
						setTimeout(function(){
							ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am start com.phicomm.speaker.device/.ui.MainActivity'}));
							setTimeout(function(){
								document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱登录页面';
								alert('重启完毕！');
								location.reload();
							},10000);
						},3000);
					};
					document.getElementsByTagName('h3')[0].parentNode.appendChild(btn);
				}
				document.getElementsByTagName('h3')[0].innerHTML = data.login_msg;
				return;
			}
			alert(data.login_msg);
			if(!init_state){
				location.reload();
				return;
			}
			onhide_login();
		}
	}
}

function get_uin(uin){
	uin = uin.substr(1);
	for(i=0;i<uin.length;i++){
		if(uin[i] != 0){
			return uin.substr(i);
		}
	}
	return uin;
}

function get_cookies(data){
	cookies = [];
	for(var key in data){
		if(data.hasOwnProperty(key)){
			cookies.push(key+"="+data[key]);
		}
	}
	return cookies;
}

function Unisound(data){
	console.log(data);
	var data = JSON.parse(data.data);
	if(data != null){
		if(data.code == 1){
			if(data.type == 'get_qrcode'){
				update_qrcode_data(data.data);
			}else if(data.type == 'qrcode_state'){
				update_qrstate(data.data);
			}else if(data.type == 'login'){
				login(data);
			}else if(data.type == 'login_state'){
				login_state(data);
			}
		}
	}
}


function message(data){
	var type = data.type;
	if(type == 'get_info'){
		data = JSON.parse(data.data);
		if(init_state){
			index(data);
			return;
		}
		update_info(data);
	}else if(type == 'list'){
		data = JSON.parse(data.data);
		update_list(data);
	}else if(type == 'get_eq_config'){
		data = JSON.parse(data.data);
		update_sound_effects(data);
	}else if(type == 'login_state'){
		login_state(data.data);
	}else if(type == 'Unisound'){
		data = data.data;
		Unisound(data);
	}else{
		var type_id = data.type_id;
		if(type_id != null){
			var text = document.getElementById('text');
			if(data.code == 200){
				if(type_id.substr(0,2) == '点播' || type_id == '我的收藏'){
					switch_page(document.getElementById('btn_page_music'));
				}
				var tips = get_tips(type_id);
				if(tips != null){
					text.value = '['+type_id+']:'+tips;
				}else{
                    text.value = '['+type_id+']:'+data.data;
				}
            }else{
                text.value = '['+type_id+']:'+data.msg;
            }
		}
	}
}

function get_tips(type_id){
	return tips_data[type_id];
	var tips = null;
	for(var i=0;i<buttons.length;i++){
		var data = buttons[i];
		if(type_id == data[0]){
			return data[1].succ;
		}
	}
	return tips;
}

window.onclick = function(event) {
    if (event.target == my_modal) {
        my_modal.style.display = "none";
    }
}

function index(data){
	
	init_state = false;
    if(data.ver != null){
        ver = data.ver;
    }
    if(data.u_ver != null){
        u_ver = data.u_ver;
    }
	
	iframe.style.display = 'none';
	if(custom_ip){
		iframe.url = 'http://'+ip;
	}else{
		iframe.url = 'http://r1.wxfsq.com';
	}
	iframe.src = iframe.url+'/?message';
	main_div.appendChild(iframe);
	
	//首页
	var div = document.createElement('div');
	my_modal.className = 'modal';
	div.appendChild(my_modal);
	divs.appendChild(div);
	document.title = 'R1音箱控制页面';
	document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱控制页面';
	var text = document.createElement('text');
	text.innerHTML = '信息：';
	texts_div.appendChild(text);
	var textarea = document.createElement('textarea');
	textarea.setAttribute('readonly','readonly');
	textarea.id = 'text';
	texts_div.appendChild(textarea);
	texts_div.appendChild(document.createElement('br'));
	var text = document.createElement('text');
	text.innerHTML = '输入：';
	texts_div.appendChild(text);
	var input = document.createElement('input');
    input.type = 'text';
    input.id = 'input';
    texts_div.appendChild(input);
	var div = document.createElement('div');
	var text = document.createElement('text');
	text.innerHTML = '发音人:';
	div.appendChild(text);
	var arr = [['萱萱','SWEET'],['小雯','FEMALE'],['糖糖','CHILDREN'],['玲玲','LZL'],['小峰','MALE'],['天天','TIANTIAN']];
	var tts_speaker = document.createElement('select');
    tts_speaker.id = 'tts_speaker';
	tts_speaker.onchange = function(){
		update_TtsSpeaker(this.value);
	}
	for(var i=0;i<arr.length;i++){
		var option = document.createElement('option');
		option.innerHTML = arr[i][0];
		option.value = arr[i][1];
		
		if(option.value == data.ttsModelType){
			option.selected = 'selected';
		}
		tts_speaker.appendChild(option);
	}
	div.appendChild(tts_speaker);
	//div.appendChild(document.createElement('br'));
    if(ver > 1600 && u_ver > 1700){
        var text = document.createElement('text');
	    text.innerHTML = '音乐源:';
	    div.appendChild(text);
	    var arr = [['QQ音乐','qq'],['酷我音乐','kuwo'],['网易云音乐','netease']];
	    var music_source = document.createElement('select');
        music_source.id = 'music_source';
		music_source.onchange = function(){
	    	set_music_source(this.value);
	    }
	    for(var i=0;i<arr.length;i++){
	    	var option = document.createElement('option');
	    	option.innerHTML = arr[i][0];
	    	option.value = arr[i][1];

	    	if(option.value == data.music_source){
		    	option.selected = 'selected';
	    	}
	    	music_source.appendChild(option);
	    }
	    div.appendChild(music_source);
    }else if(ver > 1600 && u_ver > 1600){
        var text = document.createElement('text');
	    text.innerHTML = '音乐源:';
	    div.appendChild(text);
	    var arr = [['酷我音乐','kuwo'],['QQ音乐','qq'],['网易云音乐','netease']];
	    var music_source = document.createElement('select');
        music_source.id = 'music_source';
		music_source.onchange = function(){
	    	set_music_source(this.value);
	    }
	    for(var i=0;i<arr.length;i++){
	    	var option = document.createElement('option');
	    	option.innerHTML = arr[i][0];
	    	option.value = arr[i][1];

	    	if(option.value == data.music_source){
		    	option.selected = 'selected';
	    	}
	    	music_source.appendChild(option);
	    }
	    div.appendChild(music_source);
	}
	texts_div.appendChild(div);
    divs.appendChild(texts_div);
	if(ver+1 > 1825 && u_ver+1 > 1800){
		//用户信息
		
		
		
	}
	//音效页面
	if(ver > 1821){
		sound_effects_div.style = 'display:none;';
		var text = document.createElement('text');
		text.innerHTML = "EQ：";
		sound_effects_div.appendChild(text);
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'eq_switch';
		checkbox.onclick = function(){
			console.log(this.checked);
			ws.send(JSON.stringify({type:'set_eq_enable',enable:this.checked}));
			ws.send(JSON.stringify({type:'get_eq_config'}));
		};
		sound_effects_div.appendChild(checkbox);
		sound_effects_div.appendChild(eqs_div);
		
		var text = document.createElement('text');
		text.innerHTML = "低音：";
		sound_effects_div.appendChild(text);
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'bass_switch';
		checkbox.onclick = function(){
			ws.send(JSON.stringify({type:'set_bass_enable',enable:this.checked}));
			ws.send(JSON.stringify({type:'get_eq_config'}));
		};
		sound_effects_div.appendChild(checkbox);
		sound_effects_div.appendChild(bass_div);
		
		var text = document.createElement('text');
		text.innerHTML = "响度：";
		sound_effects_div.appendChild(text);
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.id = 'loudness_switch';
		checkbox.onclick = function(){
			ws.send(JSON.stringify({type:'set_loudness_enable',enable:this.checked}));
			ws.send(JSON.stringify({type:'get_eq_config'}));
		};
		sound_effects_div.appendChild(checkbox);
		sound_effects_div.appendChild(loudness_div);
		sound_effects_div.appendChild(preset_div);
		divs.appendChild(sound_effects_div);
	}
    //屏幕控制
	if(ver > 1000){
		screen_div.id = 'screen_div';
		screen_div.style = 'display:none;';
		var img = document.createElement('img');
		img.id = 'screen_img';
		img.style = 'max-width:100%;height: auto;';
		img.onclick = function(e){
			x = e.offsetX;
			y = e.offsetY;
			x = (x/this.clientWidth)*this.naturalWidth;
			y = (y/this.clientHeight)*this.naturalHeight;
			x = parseInt(x);
			y = parseInt(y);
			ws.send(JSON.stringify({type:'input',input:'tap '+x+' '+y}));
		};
		function handleTouchEvent(event) {
        var output = document.getElementById("output");
        switch (event.type) {
            case "touchstart":
				var x = event.changedTouches[0].clientX;
				var y = event.changedTouches[0].clientY;
				x = (x/this.clientWidth)*this.naturalWidth;
				y = (y/this.clientHeight)*this.naturalHeight;
				x = parseInt(x);
				y = parseInt(y);
				startx = x;
				starty = y;
               // output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
            case "touchend":
				var x = event.changedTouches[0].clientX;
				var y = event.changedTouches[0].clientY;
				x = (x/this.clientWidth)*this.naturalWidth;
				y = (y/this.clientHeight)*this.naturalHeight;
				x = parseInt(x);
				y = parseInt(y);
				if(startx == -1 || starty == -1){
					break;
				}
			    if(y-starty < 50 && x-startx < 50){
					if(starty-y < 50 && startx-x < 50){
						startx = -1;
						starty = -1;
						break;
					}
				}
				
				
				ws.send(JSON.stringify({type:'input',input:'swipe '+startx+' '+starty+' '+x+' '+y}));
				startx = -1;
				starty = -1;
                //output.innerHTML += "Touch ended (" + event.changedTouches[0].clientX + "," + event.changeTouches[0].clientY + ")";
                break;
            case "touchmove":
			
				event.preventDefault(); //阻止滚动
                //output.innerHTML += "Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
                break;
		}
	}
		img.addEventListener("touchstart", handleTouchEvent, false);
		img.addEventListener("touchend", handleTouchEvent, false);
		img.addEventListener("touchmove", handleTouchEvent, false);
		img.onmousewheel = function(data){
			data.preventDefault();
			var x = data.offsetX;
			var y = data.offsetY;
			x = (x/this.clientWidth)*this.naturalWidth;
			y = (y/this.clientHeight)*this.naturalHeight;
			if(data.deltaY > -1){
				var new_y = y-100;
			}else{
				var new_y = y+100;
			}
			if(new Date().valueOf() - mousewheel_interval>0){
				mousewheel_interval = new Date().valueOf() +100;
				ws.send(JSON.stringify({type:'input',input:'swipe '+x+' '+y+' '+x+' '+new_y}));
			}
		
		}
		screen_div.appendChild(img);
		screen_div.appendChild(document.createElement('br'));
		var arr = [['上',19],['左',21],['确定',23],['右',22],['下',20]];
		arr = [];
		for(var i=0;i<arr.length;i++){
			var btn = document.createElement("input");
			btn.type = 'button';
			btn.className = 'btn';
			btn.value = arr[i][0];
			btn.setAttribute('data',arr[i][1]);
			btn.onclick = function(){
			send_keyevent(this.getAttribute('data'));
			};
			screen_div.appendChild(btn);
		}
		screen_div.appendChild(document.createElement('br'));
		var arr = [['返回',4]];
		for(var i=0;i<arr.length;i++){
			var btn = document.createElement("input");
			btn.type = 'button';
			btn.className = 'btn';
			btn.value = arr[i][0];
			btn.setAttribute('data',arr[i][1]);
			btn.onclick = function(){
				send_keyevent(this.getAttribute('data'));
			};
			screen_div.appendChild(btn);
		}
		divs.append(screen_div);
	}
	//音乐
	musics_div.style = 'display: none;';
    music_pic.id= 'music_pic';
	music_pic.style = 'display: block;margin: 0px auto;position: relative;width: 200px;height: 200px;border: 2px solid #66ccff;overflow: hidden;border-radius: 100%;-webkit-animation: img 8s linear infinite;animation: img 8s linear infinite;animation-play-state:paused;';
    music_pic.src = '';
	music_lrc.innerHTML = '';
	musics_div.appendChild(music_pic); 
	music_lrc.style = 'display: none;margin: 1px auto;width: 100%;height: 203px;';
	musics_div.appendChild(music_lrc);
	music_pic.ondblclick = function(){
		var title = get_music_title(music_info);
		document.getElementsByTagName('h3')[0].innerHTML = '正在播放：'+title;
		music_pic.style.display = 'none';
		music_lrc.style.display = 'block';
		update_lrc(true);
	};
	music_lrc.ondblclick = function(){
		music_lrc.style.display = 'none';
		music_pic.style.display = 'block';
	};
	musics_div.appendChild(document.createElement('br'));
	//music_time_position.style = 'color:#66ccff;';
	music_time_position.innerHTML = '00:00';
	var div = document.createElement('div');div.style = 'width:50px;display:inline-block;';div.appendChild(music_time_position);
	musics_div.appendChild(div);
	music_time.type = 'range';
    music_time.min = 0;
    music_time.step = 1;
    music_time.max = 0;
	music_time.value = 0;
    //music_time.addEventListener('input', function() {vol_text.innerHTML = '   '+this.value+'/'+this.max;$.ajax({type:'GET',ws_type:'set_vol',dataType:'jsonp',data:{'vol':this.value}})});
	musics_div.appendChild(music_time);
	//music_time_duration.style = 'color:#66ccff;';
	music_time_duration.innerHTML = '00:00';
	var div = document.createElement('div');div.style = 'width:50px;display:inline-block;';div.appendChild(music_time_duration);
	musics_div.appendChild(div);
	musics_div.appendChild(document.createElement('br'));
	var arr = [['上一首','prev'],['播放','play'],['下一首','next']];
	for(var i=0;i<arr.length;i++){
		var btn = document.createElement("input");
		btn.id = 'music_btn_'+arr[i][1];
		btn.type = 'button';
		btn.className = 'btn';
		btn.value = arr[i][0];
		btn.setAttribute('data',arr[i][1]);
		btn.onclick = function(){
			send_music_cmd(this);
		};
		musics_div.appendChild(btn);
	}
	musics_div.appendChild(document.createElement('br'));
    var arr = [['收藏歌曲','collect'],['取消收藏','cancel_collect'],['随机播放','playmode']];
	for(var i=0;i<arr.length;i++){
		var btn = document.createElement("input");
		btn.id = 'music_btn_'+arr[i][1];
		btn.type = 'button';
		btn.className = 'btn';
		btn.value = arr[i][0];
		if(arr[i][1] == 'playmode'){
			arr1 = [['随机播放',1],['顺序播放',2],['单曲循环',3]];
			playmode = arr1[0];
			for(ii=0;ii<arr1.length;ii++){
				if(arr1[ii][1] == data.play_mode){
					playmode = arr1[ii];
				}
			}
			btn.setAttribute('mode',playmode[1]);
			btn.value = playmode[0];
			btn.onclick = function(){
				arr1 = [['随机播放',1],['顺序播放',2],['单曲循环',3]];
				mode = parseInt(this.getAttribute('mode'))+1;
				playmode = arr1[0];
				for(i=0;i<arr1.length;i++){
					if(arr1[i][1] == mode){
						playmode = arr1[i];
					}
				}
				//this.setAttribute('mode',playmode[1]);
				//this.value = playmode[0];
				ws.send(JSON.stringify({type:'set_play_mode',mode:playmode[1]}));
				ws.send('{"type":"get_info"}');
				//$.ajax({type:'GET',ws_type:'set_play_mode',dataType:'jsonp',data:{mode:playmode[1]},success:function(data){}});
			};
		}else{
			btn.setAttribute('data',arr[i][1]);
			btn.onclick = function(){
				send_music_cmd(this);
			};
		}
		musics_div.appendChild(btn);
	}
	divs.appendChild(musics_div);
	//音量
	var vols_div = document.createElement('div');
    var text = document.createElement('text');
	text.innerHTML = '音量：';
	var div = document.createElement('div');div.style = 'width:50px;display:inline-block;';div.appendChild(text);
	vols_div.appendChild(div);
	vols.type = 'range';
    vols.min = 0;
    vols.step = 1;
    vols.max = 15;
	vols.value = data.vol;
    vols.addEventListener('input', function() {
		clearTimeout(vols_disabled_timer);
		vols_disabled_timer = setTimeout(function(){vols.disabled = true;},3000);
		vol_text.innerHTML = '   '+this.value+'/'+this.max;
		ws.send(JSON.stringify({type:'set_vol',vol:this.value}));
		ws.send(JSON.stringify({type:'get_info'}));
	});
	vols.disabled = true;
	vols_div.appendChild(vols);
    vol_text = document.createElement('text');
	vol_text.innerHTML = ' '+vols.value+'/'+vols.max;
	var div = document.createElement('div');div.style = 'width:30px;display:inline-block;';div.appendChild(vol_text);
	vols_div.appendChild(div);
	vols_div.style = 'color:red;';
	vols_div.addEventListener('dblclick',function(){
		vols.disabled = false;
		clearTimeout(vols_disabled_timer);
		vols_disabled_timer = setTimeout(function(){vols.disabled = true;},3000);
	});
	divs.appendChild(vols_div);
	//音乐列表
	var div = document.createElement('div');//占位
	div.style.height = '15px';
	div_list.appendChild(div);
	var div = document.createElement('div');
	var text = document.createElement('text');
	text.id = 'list_title';
	text.innerHTML = '播放列表[0]';
	div_list.style = 'max-width:600px;display:none;margin: 10px auto;background-color: rgba(0, 0, 0, 0.6);border-radius:15px;';
	div.appendChild(text);
	var text = document.createElement('text');
	text.id = 'list_ico';
	text.style = 'font-size: 13px';
	text.innerHTML = '	▼';
	div.appendChild(text);
	//div_list.appendChild(document.createElement('br'));
	div.onclick = function(){
		var list_ico = document.getElementById('list_ico');
		var list_occupancy = document.getElementById('list_occupancy');
		if(lists.style.display == 'none'){
			list_occupancy.style.display = 'none';
			lists.style.display = 'block';
			list_ico.innerHTML = '	▼';
		}else{
			list_occupancy.style.display = 'block';
			lists.style.display = 'none';
			list_ico.innerHTML = '	▲';
		}
	}
	div_list.appendChild(div);
	var div = document.createElement('div');//占位
	div.id = 'list_occupancy';
	div.style.display = 'none';
	div.style.height = '15px';
	div_list.appendChild(div);
	div_list.appendChild(lists);
	lists.style = 'margin: 15px auto;max-width:600px;max-height:500px;overflow-x:hidden;overflow-y:auto;';
	list.setAttribute('border','0');
	list.setAttribute('cellspacing','0');
	list.setAttribute('cellpadding','0');
	list.setAttribute("style", "width:100%;color:#66ccff;margin: 0px auto;");
	lists.appendChild(list);
	//按钮
	//switch_btns.appendChild(document.createElement('br'));
	var arr = [['音乐','music',1000],['屏幕','screen',1000],['音效','sound_effects',1822]];
	for(var i=0;i<arr.length;i++){
		if(ver+1 > arr[i][2]){
		var btn = document.createElement("input");
		btn.id = 'btn_page_'+arr[i][1];
		btn.type = 'button';
		btn.className = 'btn';
		//btn.style = 'padding: 10px 15px;';
		btn.value = arr[i][0];
		btn.setAttribute('data',arr[i][0]);
		btn.onclick = function(){
			switch_page(this);
		};
		switch_btns.appendChild(btn);
		}
	}
	//
	//divs.appendChild(switch_btns);
	if(location.href.indexOf('type=1') != -1){
		switch_btns.style = 'margin: 20px auto;';
		texts_div.before(switch_btns);
	}else{
		vols_div.before(switch_btns);
	}
	divs.appendChild(div_list);
	btn_states = [];
	for(var i=0;i<buttons.length;i++){
        if(buttons[i][1].min_ver == null){
            buttons[i][1].min_ver = ver;
        }
        if(buttons[i][1].max_ver == null){
            buttons[i][1].max_ver = ver;
        }
		if(buttons[i][1].min_uver == null){
            buttons[i][1].min_uver = u_ver;
        }
		if(buttons[i][1].max_uver == null){
            buttons[i][1].max_uver = u_ver;
        }
		
		// if((ver+1 > buttons[i][1].min_ver && ver-1 < buttons[i][1].max_ver) && (u_ver+1 > buttons[i][1].min_uver && u_ver-1 < buttons[i][1].max_uver)){
			var btn = document.createElement("input");
			btn.id = 'btn_'+i;
		    btn.type = 'button';
		    btn.className = 'btn';
		    btn.value = buttons[i][0];
		    btn.setAttribute('data',JSON.stringify(buttons[i][1]));
		    btn.onclick = function(){
			    click(this);
		    };
			if(buttons[i][1].type == 2){
				btn_states.push(btn);
			}
		    btns_div.appendChild(btn);
		// }
	}
	update_btn_state(data);
    var ver_div = document.getElementById('ver_div');
    ver_div.innerHTML = '<a style="color:red;" href="javascript:alert(get_ver());">版本号：'+ver+'</a>';
	divs.appendChild(btns_div);
	start_updateinfo();
}

function send_keyevent(key){
	ws.send(JSON.stringify({type:'input',input:'keyevent '+key}));
}

function switch_page(data){
	current_page = data;
	title = data.getAttribute('data');
	if(data.id == 'btn_page_music'){
		if(data.value != title){
			hide_music();
            hide_screen();
			hide_sound_effects();
			onhide_index();
		}else{
			hide_index();
            hide_screen();
			hide_sound_effects();
			onhide_music();
			ws.send('{"type":"list"}');
		}
	}else if(data.id == 'btn_page_screen'){
		if(data.value != title){
			hide_screen();
            hide_music();
			hide_sound_effects();
			onhide_index();
		}else{
			hide_index();
			hide_music();
			hide_sound_effects();
			onhide_screen();
		}
	}else if(data.id == 'btn_page_sound_effects'){
		if(data.value != title){
			hide_screen();
            hide_music();
			hide_sound_effects();
			onhide_index();
		}else{
			hide_index();
			hide_music();
			hide_screen();
			onhide_sound_effects();
		}
	}
	
	if(data.value != title){
		var arr = document.getElementsByClassName('btn');
		for(var i=0;i<arr.length;i++){
			if(arr[i].id.substr(0,8) == 'btn_page' && arr[i].id != data.id){
				arr[i].value = arr[i].getAttribute('data');
			}
		}
		data.value = title;
	}else{
		var arr = document.getElementsByClassName('btn');
		for(var i=0;i<arr.length;i++){
			if(arr[i].id.substr(0,8) == 'btn_page' && arr[i].id != data.id){
				arr[i].value = arr[i].getAttribute('data');
			}
		}
		data.value = '首页';
	}
}

function onhide_index(){
	document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱控制页面';
	document.title = "R1音箱控制页面";
	texts_div.style.display = "block";
	btns_div.style.display = "block";
}

function hide_index(){
	texts_div.style.display = "none";
	btns_div.style.display = "none";
}

function onhide_music(){
	start_title_scrolling();
	start_lrc();
	document.title = "R1音箱音乐控制页面";
	document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱音乐控制页面';
	document.getElementsByTagName('h3')[0].onclick = function(){
		title_display_time = new Date().getTime() + 2000;
		if(music_info.artist){
			var title = music_info.title+'-'+music_info.artist;
		}else{
			var title = music_info.title;
		}
		document.getElementsByTagName('h3')[0].innerHTML = '正在播放：'+title;
	};
	musics_div.style.display = "block";
	div_list.style.display = "block";
}

function hide_music(){
	stop_title_scrolling();
	stop_lrc();
	document.getElementsByTagName('h3')[0].onclick = function(){};
	musics_div.style.display = "none";
	div_list.style.display = "none";
}

function start_title_scrolling(){
	stop_title_scrolling();
	var title_scrolling = function(){
		if(music_title == ''){
			return;
		}

	music_title = music_title.substring(1) + music_title.substring(0,1);
		document.title = '正在播放：' + music_title;
	};
	title_scrolling_timer = setInterval(title_scrolling,500);
}

function stop_title_scrolling(){
	clearInterval(title_scrolling_timer);
}


function start_lrc(){
	title_display_time = new Date().getTime() + 1000;
	stop_lrc();
	lrc_timer = setInterval('update_lrc()',10);
}

function stop_lrc(){
	clearInterval(lrc_timer);
	lrc_timer = -1;
}

function onhide_screen(){
	document.title = "R1音箱屏幕控制页面";
	document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱屏幕控制页面';
	screen_div.style.display = "block";
	start_screen();
}

function hide_screen(){
	if(screen_div.id == 'screen_div' && screen_div.style.display != 'none'){
		screen_div.style.display = "none";
		stop_screen();
	}
}

function onhide_sound_effects(){
	document.title = "R1音箱音效控制页面";
	document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱音效控制页面';
	sound_effects_div.style.display = "block";
	start_sound_effects();
}

function hide_sound_effects(){
	sound_effects_div.style.display = "none";
	stop_sound_effects();
}

function start_sound_effects(){
	stop_sound_effects();
	sound_effects_timer = setInterval(function(){ws.send(JSON.stringify({type:'get_eq_config'}));},1000);
}

function stop_sound_effects(){
	clearInterval(sound_effects_timer);
	sound_effects_timer = -1;
}

function start_screen(){
	ws.send('{"type":"start_screencap"}');
	document.onkeydown = function(data){
			if(data.keyCode == 13){
				send_keyevent(23);
				return false;
			}else if(data.keyCode == 37){
				send_keyevent(21);
				return false;
			}else if(data.keyCode == 38){
				send_keyevent(19);
				return false;
			}else if(data.keyCode == 39){
				send_keyevent(22);
				return false;
			}else if(data.keyCode == 40){
				send_keyevent(20);
				return false;
			}
		};
	//screen_timer = setInterval('update_screencap()',300);
}

function stop_screen(){
	ws.send('{"type":"stop_screencap"}');
	document.onkeyup = function(){};
	//clearInterval(screen_timer);
	//screen_timer = -1;
}

function update_screencap(){
	document.getElementById('screen_img').src = ip+'/screencap?t='+new Date().getTime();
}

function get_ver(){
    return "new_EchoService版本："+ver.toString().split("").join('.')+"\r\nnew_Unisound版本："+u_ver.toString().split("").join('.')+"\r\nWEB页面版本："+web_ver.toString().split("").join('.')+"\r\n---WEB更新日志---\r\n"+update_log.join("\r\n");
}

function set_music_source(source){
    send('修改音乐源成功！','修改音乐源','send_message',{what:65536,arg1:0,arg2:4,obj:source});
}

function update_sound_effects(data){
	console.log(data);
	var eq = data.eq;
	var bass = data.bass;
	var loudness = data.loudness;
	document.getElementById("eq_switch").checked = (eq.sound_effects_eq_enable == true);
	document.getElementById("bass_switch").checked = (bass.sound_effects_bass_enable == true);
	document.getElementById("loudness_switch").checked = (loudness.sound_effects_loudness_enable == true);
	
	if(eqs_div.innerHTML == ''){
		var init = false;
	}else{
		var init = true;
	}
	var Bands = eq.Bands;
	var hz_names = {60000:'低频',230000:'中低',910000:'中频',3600000:'中高',14000000:'高频'};
	for(var i=0;i<Bands.list.length;i++){
		if(!init){
			var hz = document.createElement('text');
			//hz.innerHTML = (Bands.list[i].Frequency/1000)+'Hz：';
			hz.innerHTML = hz_names[Bands.list[i].Frequency]+'：';
			var div = document.createElement('div');div.style = 'width:80px;display:inline-block;';div.appendChild(hz);
			eqs_div.appendChild(div);
			var band  = document.createElement('input');
			band.id = 'band_'+Bands.list[i].Band;
			band.type = 'range';
			band.min = parseInt(Bands.minBandLevel/100);
			band.max = parseInt(Bands.maxBandLevel/100);
			band.setAttribute('Band',Bands.list[i].Band);
			band.addEventListener('input', function() {
				var Band = this.getAttribute('Band');
				//document.getElementById('band_text_'+Band).innerHTML = '   '+parseInt(this.value/100)+'dB';
				document.getElementById('band_text_'+Band).innerHTML = '   '+this.value+'dB';
				ws.send(JSON.stringify({type:'set_eq_bandlevel',band:Band,level:(this.value*100)}));
				ws.send(JSON.stringify({type:'get_sq_config'}));
			});
			eqs_div.appendChild(band);
			
			var text = document.createElement('text');
			text.id = 'band_text_'+Bands.list[i].Band;
			var div = document.createElement('div');div.style = 'width:50px;display:inline-block;';div.appendChild(text);
			eqs_div.appendChild(div);
			
			eqs_div.appendChild(document.createElement('div'));
		}else{
			var band  = document.getElementById('band_'+Bands.list[i].Band);
			var text = document.getElementById('band_text_'+Bands.list[i].Band);
		}
		
		if(!mousedown){
			band.value = parseInt(Bands.list[i].BandLevel/100);
		}
		text.innerHTML = '   '+(Bands.list[i].BandLevel/100)+'dB';
	}
	
	if(bass_div.innerHTML == ''){
		var init = false;
	}else{
		var init = true;
	}
	if(!init){
		var title = document.createElement('text');
		title.innerHTML = '低音增强：';
		var div = document.createElement('div');div.style = 'width:80px;display:inline-block;';div.appendChild(title);
		bass_div.appendChild(div);
		
		var range  = document.createElement('input');
		range.id = 'bass_value';
		range.type = 'range';
		range.min = 0;
		range.max = 1000;
		range.addEventListener('input', function() {
			document.getElementById('bass_text_value').innerHTML = '   '+(this.value/10)+'%';
			ws.send(JSON.stringify({type:'set_bass_strength',strength:this.value}));
			ws.send(JSON.stringify({type:'get_sq_config'}));
		});
		bass_div.appendChild(range);
		
		var text = document.createElement('text');
		text.id = 'bass_text_value';
		var div = document.createElement('div');div.style = 'width:50px;display:inline-block;';div.appendChild(text);
		bass_div.appendChild(div);
	}else{
		var range  = document.getElementById('bass_value');
		var text = document.getElementById('bass_text_value');
	}
	
	if(!mousedown){
		range.value = bass.Current_Strength;
	}
	text.innerHTML = '   '+(bass.Current_Strength/10)+'%';
	
	if(loudness_div.innerHTML == ''){
		var init = false;
	}else{
		var init = true;
	}
	if(!init){
		var title = document.createElement('text');
		title.innerHTML = '响度控制：';
		var div = document.createElement('div');div.style = 'width:80px;display:inline-block;';div.appendChild(title);
		loudness_div.appendChild(div);
		
		var range  = document.createElement('input');
		range.id = 'loudness_value';
		range.type = 'range';
		range.min = -3000;
		range.max = 3000;
		range.addEventListener('input', function() {
			document.getElementById('loudness_text_value').innerHTML = '   '+(this.value/100)+'dB';
			ws.send(JSON.stringify({type:'set_loudness_gain',gain:this.value}));
			ws.send(JSON.stringify({type:'get_sq_config'}));
		});
		loudness_div.appendChild(range);
		
		var text = document.createElement('text');
		text.id = 'loudness_text_value';
		var div = document.createElement('div');div.style = 'width:50px;display:inline-block;';div.appendChild(text);
		loudness_div.appendChild(div);
	}else{
		var range  = document.getElementById('loudness_value');
		var text = document.getElementById('loudness_text_value');
	}
	
	if(!mousedown){
		range.value = loudness.Current_Gain;
	}
	text.innerHTML = '   '+(loudness.Current_Gain/100)+'dB';
	
	if(preset_div.innerHTML == ''){
		var init = false;
	}else{
		var init = true;
	}
	var Preset_list = eq.Preset_list;
	var Current_Preset = eq.Current_Preset;
	if(Preset_list.length > 0 && Current_Preset == -1){
		Preset_list.unshift({Preset:-1,Name:'Custom'});
	}
	if(!init){
		var title = document.createElement('text');
		title.innerHTML = '预设EQ：';
		var div = document.createElement('div');div.style = 'display:inline-block;';div.appendChild(title);
	    var preset = document.createElement('select');
        preset.id = 'preset_list';
		preset.onchange = function(){
			ws.send(JSON.stringify({type:'set_eq_preset',preset:this.value}));
			ws.send(JSON.stringify({type:'get_sq_config'}));
	    };
	    for(var i=0;i<Preset_list.length;i++){
	    	var option = document.createElement('option');
	    	option.innerHTML = Preset_list[i].Name;
	    	option.value = Preset_list[i].Preset;
	    	if(option.value == Current_Preset){
		    	option.selected = 'selected';
	    	}
	    	preset.appendChild(option);
	    }
	    div.appendChild(preset);
		//preset_div.appendChild(div);
	}else{
		var preset = document.getElementById('preset_list');
		for(var i=0;i<preset.length;i++){
			if(preset[i].value == Current_Preset){
				preset[i].selected = 'selected';
			}
		}
	}
}

function update_list(data){
		var i = 0;
		if(data.playList.length<1){
			return;
		}
		list.innerHTML = '';
		var list_title = document.getElementById('list_title');
		list_title.innerHTML = '播放列表['+data.playList.length+']';
		play_index = data.playIndex;
		for(i=0;i<data.playList.length;i++){
			var tr = document.createElement('tr');
			tr.className = 'span';
			if(data.playIndex == i){
				var span = document.createElement('span');
				span.innerHTML = '[正在播放]';
				//span.style.color = 'red';
				tr.setAttribute('playing',true);
				tr.appendChild(span);
			}else{
				tr.setAttribute('playing',false);
			}
			tr.onclick  = function(){
				if(this.getAttribute('playing') == 'true'){
					return;
				}
				send(null,'播放指定歌曲','play',{index:this.getAttribute('index')});
			};
			var span = document.createElement('span');
			span.innerHTML = (i+1)+'.'+get_music_title(data.playList[i]);
			tr.setAttribute('index',i);
			tr.appendChild(span);
			list.appendChild(tr);
		}
        if(data.playIndex>-1){
            lists.scrollTop = list.getElementsByTagName('tr')[data.playIndex].offsetTop;
        }
}

function send_music_cmd(data){
	type = data.getAttribute('data');
	if(type == 'prev'){
		send(null,null,'prev',{});
	}else if(type == 'next'){
		send(null,null,'next',{});
	}else if(type == 'pause'){
		send(null,null,'send_message',{what:4,arg1:2,arg2:-1,obj:true});
	} if(type == 'play'){
		send(null,null,'send_message',{what:4,arg1:3,arg2:-1,obj:true});
	}else if(type == 'collect'){
		send(null,null,'send_message',{what:65536,arg1:0,arg2:6});
	}else if(type == 'cancel_collect'){
		send(null,null,'send_message',{what:65536,arg1:0,arg2:7});
	}
	ws.send('{"type":"get_info"}');
}

function update_btn_state(data){
	if(btn_states.length > 0){
		for(var i=0;i<btn_states.length;i++){
			var param = JSON.parse(btn_states[i].getAttribute('data'));
			if(param.type == 2){
				if(param.state[0] == 0){
					var is = [];
					var index = -1;
					for(var ii=0;ii<param.state[2].length;ii++){
					    if(!Array.isArray(param.state[2][ii])){
					    	is.push(param.state[2][ii]);
					    }else{
					    	is = param.state[2][ii];
					    }
						for(var iii=0;iii<is.length;iii++){
							if(is[iii] == data[param.state[1]]){
								index = ii;
								break;
							}
						}
						if(index != -1){
							break;
						}
					}
					btn_states[i].value = param.title[ii];
				}
			}
		}
	}
}


function update_info(data){
	$('input[type=range]').bind('mousedown',function(){mousedown = true;});
	$('input[type=range]').bind('mouseup',function(){mousedown = false;});
	
	if(data.u_ver != null){
       u_ver = data.u_ver;
    }
     if(data.ver != null){
        ver = data.ver;
        var ver_div = document.getElementById('ver_div');
        ver_div.innerHTML = '<a style="color:red;" href="javascript:alert(get_ver());">版本号：'+ver+'</a>';
    }
			if(!mousedown){
				vols.value = data.vol;
			}
			vol_text.innerHTML = '   '+vols.value+'/'+vols.max;
            var tts_speaker = document.getElementById('tts_speaker');
            if(tts_speaker != null){
			    for(i=0;i<tts_speaker.length;i++){
			    	if(tts_speaker[i].value == data.ttsModelType){
			    		tts_speaker[i].selected = 'selected';
			    	}
		    	}
            }
			update_btn_state(data);
            if(ver > 1600 && u_ver > 1600){
                var music_source = document.getElementById('music_source');
                for(i=0;i<music_source.length;i++){
				    if(music_source[i].value == data.music_source){
				    	music_source[i].selected = 'selected';
				    }
			    }
                arr = [['随机播放',1],['顺序播放',2],['单曲循环',3]];
                playmode = arr[0];
                for(i=0;i<arr.length;i++){
                    if(arr[i][1] == data.play_mode){
                        playmode = arr[i];
                    }
                }
                btn = document.getElementById('music_btn_playmode');
                btn.setAttribute('mode',playmode[1]);
                btn.value = playmode[0];
            }

	        if(musics_div.style.display != "block"){
		        return;
	        }
			music_info = data.music_info;
			if(data.play_type == 2){
				document.getElementsByTagName('h3')[0].innerHTML = '正在播放：DLNA模式';
				document.title = document.getElementsByTagName('h3')[0].innerHTML;
			}else if(data.play_type == 3){
				document.getElementsByTagName('h3')[0].innerHTML = '正在播放：投屏模式';
				document.title = document.getElementsByTagName('h3')[0].innerHTML;
			}else if(data.play_type == 4){
				document.getElementsByTagName('h3')[0].innerHTML = '正在播放：蓝牙模式';
				document.title = document.getElementsByTagName('h3')[0].innerHTML;
			}
			
			var music_btn_play = document.getElementById('music_btn_play');
            if(music_info != null){
				if(typeof(music_info.arist) != 'undefined'){
					music_info.artist = music_info.arist;
				}
                if(data.play_state || data.music_info.state != 2){
				    music_pic.style.webkitAnimationPlayState = "running";
                    music_btn_play.value = '暂停';
                    music_btn_play.setAttribute('data','pause');
                }else{
                    music_pic.style.webkitAnimationPlayState = "paused";
				    music_btn_play.value = '播放';
                    music_btn_play.setAttribute('data','play');
                }
                if(music_id != music_info.id){
					info_time = [];
					lrcs = [];
					music_id = music_info.id;
					music_pic.src = '';
					music_lrc.innerHTML = '';
					stop_title_scrolling();
					music_title = '';
					var title = get_music_title(music_info);
					document.getElementsByTagName('h3')[0].innerHTML = '正在播放：'+title;
					update_music_info();
				}
				music_time.max = music_info.duration;
				music_time.value = music_info.position;
				info_time[0] = new Date().getTime();
				info_time[1] = music_info.position;
				info_time[2] = music_info.duration;
				music_time_duration.innerText = ms_to_is(music_time.max);
				music_time_position.innerText = ms_to_is(music_time.value);
                var title = get_music_title(music_info);
				if(title_display_time - new Date().getTime() > 0){
				    document.getElementsByTagName('h3')[0].innerHTML = '正在播放：'+title;
				}
            }else{
                if(music_id != null){
					stop_title_scrolling();
					music_title = '';
					info_time = [];
                    music_id = null;
					lrcs = [];
                    list.innerHTML = '';
					var list_title = document.getElementById('list_title');
					list_title.innerHTML = '播放列表[0]';
                    document.getElementsByTagName('h3')[0].innerHTML = 'R1音箱音乐控制页面';
					document.title = 'R1音箱音乐控制页面';
                    music_pic.src = '';
					music_lrc.innerHTML = '';
                }
                if(data.play_state){
				    music_pic.style.webkitAnimationPlayState = "running";
                    music_btn_play.value = '暂停';
                    music_btn_play.setAttribute('data','pause');
                }else{
                    music_pic.style.webkitAnimationPlayState = "paused";
				    music_btn_play.value = '播放';
                    music_btn_play.setAttribute('data','play');
        }
    }
}

function get_music_title(data){
	if(!data.title){
        return data.album;
	}else if(data.artist){
		return data.title+'-'+data.artist;
    }else if(data.album){
        return data.title+'-'+data.album;
    }else{
		return data.title;
	}
}

function update_music_info(){
	var success = function(data){
		if(data.code == 1){
			var title = get_music_title(music_info);
			title = title + '	';
			title_display_time = new Date().getTime() + 1000;
			document.getElementsByTagName('h3')[0].innerHTML = '正在播放：'+title;
			document.title = '正在播放：' + title;
			music_title = title;
			start_title_scrolling();
			api_music_info = data.data;
			if(music_id != api_music_info.id){
				update_music_info();
				return;
			}
			music_pic.src = api_music_info.pic;
			var arr = api_music_info.lrc.split("\n");
			lrcs = [];
			for(var i = 0;i<arr.length;i++){
				var match = arr[i].match(/(\[\d{1,3}:\d{1,2}.\d{1,3}\])(.*)/);
				if(match != null){
					var arr1 = [];
					arr1[0] = match[1].substring(0,match[1].length-1);
					arr1[1] = match[2];
					var lrc = [];
					var key = is_to_ms(arr1[0].substr(1));
					if(!isNaN(key)){
						lrc[0] = key;
						lrc[1] = arr1[1];
						lrcs.push(lrc);
					}
				}
			}
		}else{
			lrcs = [];
		}
		update_lrc(true);
	};
	var error = function(){
	};
	// $.ajax({type:'GET',url:'http://wxfsq.com:86/music/',dataType:'jsonp',data:{info:music_id},success:success,error:error});
	ws.send('{"type":"list"}');
}

function update_lrc(update=false){
	if(update == false){
		if(title_display_time - new Date().getTime() > 0 || music_pic.style.webkitAnimationPlayState != 'running'){
			return;
		}
	}
	var arr = [];
	for(var i=0;i<lrcs.length;i++){
		if(lrcs[i][1] != ''){
			arr.push(lrcs[i]);
		}
	}
	if(arr.length > 0 && info_time[2] > 0){
		var time = info_time[1]+(new Date().getTime() - info_time[0]);
		var index = -1;
		for(var i=0;i<arr.length;i++){
			if(parseInt(arr[i][0]) > parseInt(time)){
				if(i > 0){
					index = i - 1;
				}else{
					index = i;
				}
				break;
			}else{
				if(i == arr.length-1){
					index = i;
				}
			}
		}
		var index1 = -1;
		for(var i=0;i<lrcs.length;i++){
			if(parseInt(lrcs[i][0]) > parseInt(time)){
				if(i > 0){
					index1 = i - 1;
				}else{
					index1 = i;
				}
				break;
			}else{
				if(i == lrcs.length-1){
					index1 = i;
				}
			}
		}
		if(index1 > -1){
			if(music_lrc.style.display != "block"){
				lrc = lrcs[index1][1];
				document.getElementsByTagName('h3')[0].innerHTML = lrc;
				
			}else{
				index -= 1;
				var lrc_list = [];
				for(var i=0;i<3;i++){
					if(Array.isArray(arr[index+i])){
						var lrc = arr[index+i][1];
					}else{
						var lrc = "";
					}
					
					var html = "";
						if(i == 1){
							if(lrcs[index1][1] == ''){
								html = "<h3 class='lrc' style='font-size: 19px;'>"+lrc+"<br></br></h3>";
							}else{
								html = "<h3 class='lrc' style='font-size: 19px;color:red;'>"+lrc+"<br></br></h3>";
							}
						}else if(i == 2){
							html = "<h3 class='lrc' style=''>"+lrc+"</h3>";
						}else{
							html = "<h3 class='lrc' style='height:13px'></h3><h3 class='lrc' style=''>"+lrc+"<br></br></h3>";
						}
						lrc_list.push(html);
				}
				music_lrc.innerHTML = lrc_list.join("");
			}
		}
		
	}
}

function switch_musicpic(){
	music_lrc.style.display = 'none';
	music_pic.style.display = 'block';
}

function set_h3(text){
	document.getElementsByTagName('h3')[0].innerHTML = text;
}

function is_to_ms(time){
	var arr = time.split(':');
	if(!isNaN(arr[0])){
		var ms = (arr[0]*60)*1000;
		ms += (arr[1]*1000);
		return parseInt(ms);
	}else{
		return time;
	}
}


function start_updateinfo(){
	clearInterval(ping_timer);
	timer = setInterval(function(){ws.send(JSON.stringify({type:'get_info'}));},3000);
}

function ms_to_is(m){
	s = parseInt(m/1000);
	i = ''+parseInt(s/60);
	s = ''+parseInt(s%60);
	if(s.length < 2)s = '0'+s;
	if(i.length < 2)i = '0'+i;
	return i+':'+s;
}

function stop_updateinfo(){
	clearInterval(timer);
	timer = -1;
}

function update_TtsSpeaker(value){
	send('修改发音人成功！','修改发音人','send_message',{what:65536,arg1:0,arg2:2,obj:value});
}


function click(data){
	var param = JSON.parse(data.getAttribute('data'));
	var input = document.getElementById('input');
	if(param.type == 1){
		if(input.value == ''){
			if(param.err != null){
			     var text = document.getElementById('text');
			     text.value = '['+data.value+']:'+param.err;
				 alert('['+data.value+']:'+param.err);
			     return;
			}
		}
        var json = JSON.stringify(param.param).replace('${'+param.input+'}',input.value);
		send(param.succ,data.value,param.ws_type,JSON.parse(json));
	}else if(param.type == 2){
		var index = 0;
		for(var i=0;i<param.title.length;i++){
			if(param.title[i] == data.value){
				index = i;
				break;			
			}
		}
		if(param.state[0] == 0){
			if(data.value == '打开氛围灯' && ver > 1500){
                setTimeout(function(){send(param.succ[index],'打开氛围灯','send_message',{what:4,arg1:67,arg2:0})},500);
			}
			send(param.succ[index],data.value,param.ws_type,param.param[index]);
		}else if(param.state[0] == 1){
			if(input.value == ''){
			    if(param.err != null){
			         var text = document.getElementById('text');
			         text.value = '['+data.value+']:'+param.err[index];
			         return;
			    }
		    }
            var json = JSON.stringify(param.param[index]).replace('${'+param.input[index]+'}',input.value[index]);
		    send(param.succ[index],data.value,param.ws_type,JSON.parse(json));
		}
		ws.send('{"type":"get_info"}');
    }else if(param.type == -1){
        if(param.itemType == 'set_background'){
			iframe.contentWindow.postMessage({type:'set_background',value:input.value},iframe.url);
            var text = document.getElementById('text');
            if(input.value == ''){
                img = background;
                localStorage.removeItem('background');
                text.value = '已恢复默认背景！';
            }else{
                img = 'background: url("'+input.value+'") center top / cover no-repeat fixed;';
                localStorage.setItem('background',img);
                text.value = '设置背景图片成功！';
            }
            document.getElementsByTagName("body")[0].style.cssText = img;
        }else if(param.itemType == 'reboot_unisound'){
			if(!confirm("确定要重启小讯吗？")){
				return;
			}
			document.getElementsByTagName('h3')[0].innerHTML = '重启中。。。';
			ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am force-stop com.phicomm.speaker.device'}));
			setTimeout(function(){
				ws.send(JSON.stringify({type:'shell1',shell:'/system/bin/am start com.phicomm.speaker.device/.ui.MainActivity'}));
				setTimeout(function(){
					document.getElementsByTagName('h3')[0].innerHTML = document.title;
					alert('重启完毕！');
				},10000);
			},3000);
		}
    }else{
        if(data.value == '打开氛围灯' && ver > 1500){
            setTimeout(function(){send(param.succ,'打开氛围灯','send_message',{what:4,arg1:67,arg2:0})},500);
        }
        send(param.succ,data.value,param.ws_type,param.param);
	}
}


function send(tips,type,ws_type,data,call=null){
	if(type != null){
		tips_data[type] = tips;
		var text = document.getElementById('text');
		text.value = '['+type+']:请稍候。。。';
		data.type_id = type;
	}
	data.type = ws_type;
	ws.send(JSON.stringify(data));
}

function load(){
    var head = "<meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1,user-scalable=0,maximum-scale=1,viewport-fit=cover'><meta name='format-detection' content='telephone=no'><meta name='renderer' content='webkit'/><meta name='force-rendering' content='webkit'/><meta http-equiv='X-UA-Compatible' content='IE=Edge,chrome=1'/><meta name='referrer' content='never'><title>R1控制台</title><link rel='stylesheet' href='./new_r1_control.css?t="+new Date().getTime()+"'/><link rel='shortcut icon' href='https://scpic.chinaz.net/files/pic/pic9/202101/apic30031.jpg' sizes='100x100'/></head>";
    document.getElementsByTagName("head")[0].innerHTML = head;
	document.body.appendChild(main_div);
	main_div.style = 'height:100%';
	main_div.appendChild(divs);
    divs.id = 'divs';
    divs.style = 'text-align: center;display:block;margin:0px auto;';
    //document.getElementsByTagName("body")[0].innerHTML = "" + document.getElementsByTagName("body")[0].innerHTML;;
    divs.innerHTML = '<h3></h3>';
	divs.appendChild(login_div);
	
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = './jquery.min.js';
    main_div.appendChild(script);
	if(location.href.indexOf('noimg') == -1){
		var background1 = localStorage.getItem('background');
		if(background1){
			document.getElementsByTagName("body")[0].style.cssText = background1;
		}else{
			document.getElementsByTagName("body")[0].style.cssText = background;
		}
	}else{
		document.getElementsByTagName("body")[0].style.cssText = background;
	}
    var div = document.createElement('div');
    div.id = 'qun_div';
    //div.style = 'position:relative; bottom: 10px;';
    div.style = 'position: absolute;';
    div.innerHTML = "<a id='qun' style='color:red;' href='https://jq.qq.com/?_wv=1027&k=hTbg34eR'>斐讯R1音箱交流群：772694950</a>";
    main_div.appendChild(div);
    var div = document.createElement('div');
    div.id = 'ver_div';
    div.style = 'position: absolute; right:5px;color:red;';
    main_div.appendChild(div);
	var div = document.createElement('div');//占位
	div.style.height = '18px';
	main_div.appendChild(div);
}
