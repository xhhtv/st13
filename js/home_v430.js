
String.prototype.replaceAll  = function(s1,s2){ return this.replace(new RegExp(s1,"gm"),s2); }
String.prototype.trim=function(){ return this.replace(/(^\s*)|(\s*$)/g, ""); }
var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var base64DecodeChars=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);function base64encode(str){var out,i,len;var c1,c2,c3;len=str.length;i=0;out="";while(i<len){c1=str.charCodeAt(i++)&0xff;if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt((c1&0x3)<<4);out+="==";break}c2=str.charCodeAt(i++);if(i==len){out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt((c2&0xF)<<2);out+="=";break}c3=str.charCodeAt(i++);out+=base64EncodeChars.charAt(c1>>2);out+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));out+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));out+=base64EncodeChars.charAt(c3&0x3F)}return out}function base64decode(str){var c1,c2,c3,c4;var i,len,out;len=str.length;i=0;out="";while(i<len){do{c1=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c1==-1);if(c1==-1)break;do{c2=base64DecodeChars[str.charCodeAt(i++)&0xff]}while(i<len&&c2==-1);if(c2==-1)break;out+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));do{c3=str.charCodeAt(i++)&0xff;if(c3==61)return out;c3=base64DecodeChars[c3]}while(i<len&&c3==-1);if(c3==-1)break;out+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));do{c4=str.charCodeAt(i++)&0xff;if(c4==61)return out;c4=base64DecodeChars[c4]}while(i<len&&c4==-1);if(c4==-1)break;out+=String.fromCharCode(((c3&0x03)<<6)|c4)}return out}function utf16to8(str){var out,i,len,c;out="";len=str.length;for(i=0;i<len;i++){c=str.charCodeAt(i);if((c>=0x0001)&&(c<=0x007F)){out+=str.charAt(i)}else if(c>0x07FF){out+=String.fromCharCode(0xE0|((c>>12)&0x0F));out+=String.fromCharCode(0x80|((c>>6)&0x3F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}else{out+=String.fromCharCode(0xC0|((c>>6)&0x1F));out+=String.fromCharCode(0x80|((c>>0)&0x3F))}}return out}function utf8to16(str){var out,i,len,c;var char2,char3;out="";len=str.length;i=0;while(i<len){c=str.charCodeAt(i++);switch(c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:out+=str.charAt(i-1);break;case 12:case 13:char2=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x1F)<<6)|(char2&0x3F));break;case 14:char2=str.charCodeAt(i++);char3=str.charCodeAt(i++);out+=String.fromCharCode(((c&0x0F)<<12)|((char2&0x3F)<<6)|((char3&0x3F)<<0));break}}return out}

var MAC={
    'Url': document.URL,
    'Title': document.title,
    'UserAgent' : function(){
        var ua = navigator.userAgent;//navigator.appVersion
        return {
            'mobile': !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            'ios': !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或者uc浏览器
            'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            'iPad': ua.indexOf('iPad') > -1, //是否iPad
            'trident': ua.indexOf('Trident') > -1, //IE内核
            'presto': ua.indexOf('Presto') > -1, //opera内核
            'webKit': ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
            'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",
        };
    }(),
    'Copy': function(s){
        if (window.clipboardData){ window.clipboardData.setData("Text",s); }
        else{
            if( $("#mac_flash_copy").get(0) ==undefined ){ $('<div id="mac_flash_copy"></div>'); } else {$('#mac_flash_copy').html(''); }
            $('#mac_flash_copy').html('<embed src='+SitePath+'"images/_clipboard.swf" FlashVars="clipboard='+escape(s)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
        }
        alert("复制成功")
    },
    'Home': function(o,u){
        try{
            o.style.behavior='url(#default#homepage)'; o.setHomePage(u);
        }
        catch(e){
            if(window.netscape){
                try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
                catch(e){ alert("此操作被浏览器拒绝！请手动设置");}
                var moz = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                moz.setCharPref('browser.startup.homepage',u);
            }
        }
    },
    'Fav': function(u,s){
        try{ window.external.addFavorite(u, s);}
        catch (e){
            try{window.sidebar.addPanel(s, u, "");}catch (e){ alert("加入收藏出错，请使用键盘Ctrl+D进行添加"); }
        }
    },
    'Open': function(u,w,h){
        window.open(u,'macopen1','toolbars=0, scrollbars=0, location=0, statusbars=0,menubars=0,resizable=yes,width='+w+',height='+h+'');
    },
    'Cookie': {
        'Set': function(name,value,days){
            var exp = new Date();
            exp.setTime(exp.getTime() + days*24*60*60*1000);
            var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            document.cookie=name+"="+encodeURIComponent(value)+";path=/;expires="+exp.toUTCString();
        },
        'Get': function(name){
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null){ return decodeURIComponent(arr[2]); return null; }
        },
        'Del': function(name){
            var exp = new Date();
            exp.setTime(exp.getTime()-1);
            var cval = this.Get(name);
            if(cval != null){ document.cookie = name+"="+encodeURIComponent(cval)+";path=/;expires="+exp.toUTCString(); }
        }
    },
    'GoBack':function(){
        var ldghost=document.domain;
        if(document.referrer.indexOf(ldghost)>0) {
            history.back();
        }
        else{
            window.location ="http://"+ldghost;
        }
    },
    'Adaptive':function(){
        if(maccms.mob_status=='1'&& maccms.url != maccms.wapurl){
            if(document.domain ==maccms.url && MAC.UserAgent.mobile){
                    location.href = location.href.replace(maccms.url,maccms.wapurl);
            }
            else if(document.domain ==maccms.wapurl && !MAC.UserAgent.mobile){
                location.href = location.href.replace(maccms.wapurl,maccms.url);
            }
        }
    },
    'CheckBox':{
        'All':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = true;
            });
        },
        'Other':function(n){
            $("input[name='"+n+"']").each(function() {
                this.checked = !this.checked;
            });
        },
        'Count':function(n){
            var res=0;
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res++; }
            });
            return res;
        },
        'Ids':function(n){
            var res=[];
            $("input[name='"+n+"']").each(function() {
                if(this.checked){ res.push(this.value); }
            });
            return res.join(",");
        }
    },
    'Qrcode':function(){
        $('.mac_qrcode').attr('src','//api.maccms.com/qrcode/?w=150&h=150&url=' + MAC.Url);
    },
    'Image':{
        'Lazyload':{
            'Show': function(){
                try { $("img.lazy").lazyload(); }catch(e){};
            },
            'Box': function($id){
                $("img.lazy").lazyload({
                    container: $("#"+$id)
                });
            }
        }
    },
    'Verify': {
        'Init': function(){
            MAC.Verify.Focus();
            MAC.Verify.Click();
        },
        'Focus': function(){//验证码框焦点
            $('body').on("focus", ".mac_verify", function(){
                $(this).removeClass('mac_verify').after(MAC.Verify.Show());
                $(this).unbind();
            });
        },
        'Click': function(){//点击刷新
            $('body').on('click', 'img.mac_verify_img', function(){
                $(this).attr('src', maccms.path +'/index.php/verify/index.html?');
            });
        },
        'Refresh':function(){
            $('.mac_verify_img').attr('src', maccms.path +'/index.php/verify/index.html?');
        },
        'Show':function(){
            return '<img class="mac_verify_img" src="'+ maccms.path +'/index.php/verify/index.html?"  title="看不清楚? 换一张！">';
        }
    },
    'PageGo':{
        'Init':function() {
            $('.mac_page_go').click(function () {
                var that =$(this);
                var url = that.attr('data-url');
                var total = that.attr('data-total');
                var sp = that.attr('data-sp');
                var page= $('#page').val();

                if(page>0&&(page<=total)){
                    url=url.replace(sp + 'PAGELINK',page).replace('PAGELINK',page);
                    location.href=url;
                }
                return false;
            });
        }
    },
    'Hits': {
        'Init':function() {
            if($('.mac_hits').length==0){
                return;
            }
            var $that = $(".mac_hits");
            $.ajax({
                type: 'get',
                url: maccms.path + '/index.php/ajax/hits?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type=update',
                timeout: 5000,
                dataType: 'json',
                error: function () {

                },
                success: function (json) {
                    if (json.code == 1) {
                        $(".mac_hits").each(function(i){
                            $type = $(".mac_hits").eq(i).attr('data-type');
                            if($type != 'insert'){
                                $('.'+$type).html(eval('(json.data.' + $type + ')'));
                            }
                        });
                    }
                }
            });

        }
    },
    'Score': {
        'Init':function(){
            if($('.mac_score').length==0){
                return;
            }
            $('body').on('click', '.score_btn', function(e){
                MAC.Score.Submit();
            });

            $.ajax({
                type: 'post',
                url: maccms.path+'/index.php/ajax/score?mid='+ $('.mac_score').attr('data-mid') +'&id=' +$('.mac_score').attr('data-id'),
                timeout: 5000,
                error: function(){
                    $(".mac_score").html('评分加载失败');
                },
                success: function($r){
                    MAC.Score.View($r);
                }
            });
        },
        'Submit':function(){
            var $s = $('.mac_score').find("input[name='score']").val();
            $.ajax({
                type: 'post',
                url: maccms.path+'/index.php/ajax/score?mid='+$('.mac_score').attr('data-mid')+'&id='+$('.mac_score').attr('data-id') + '&score='+ $s,
                timeout: 5000,
                error: function(){

                },
                success: function($r){
                	alert($r.msg)
                    if($r.code==1){
                        MAC.Score.View($r);
                    }
                }
            });
        },
        'View':function($r){
            $(".rating"+Math.floor($r.data.score)).attr('checked',true);
            $(".score_num").text( $r.data.score_num );
            $(".score_all").text( $r.data.score_all );
            $(".score_pjf").text( $r.data.score );
        }
    },
    'Star': {
        'Init':function(){
            if($('.mac_star').length==0){
                return;
            }

            $('.mac_star').raty({
                starType: 'i',
                number: 5,
                numberMax : 5,
                half: true,
                score : function(){
                    return $(this).attr('data-score');
                },
                click: function(score, evt) {
                    $.ajax({
                        type: 'get',
                        url: maccms.path+'/index.php/ajax/score?mid='+$('.mac_star').attr('data-mid')+'&id='+$('.mac_star').attr('data-id')+'&score='+(score*2),
                        timeout: 5000,
                        dataType:'json',
                        error: function(){
                            $('.star_box').attr('title', '网络异常！');
                        },
                        success: function(json){
                            if(json.status == 1){
                                $('.star_tips').html(json.data.score);
                            }else{
                                $('.star_box').attr('title', json.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    'Digg': {
        'Init':function(){
            $('body').on('click', '.digg_link', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    $.ajax({
                        url: maccms.path + '/index.php/ajax/digg.html?mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function($r){
                            $that.addClass('disabled');
                            if($r.code == 1){
                                if($that.attr("data-type")=='up'){
                                    $that.find('.digg_num').html($r.data.up);
                                }
                                else{
                                    $that.find('.digg_num').html($r.data.down);
                                }
                            }
                            else{
                                $that.attr('title', $r.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    'Gbook':{
        'Login':0,
        'Verify':0,
        'Init':function(){
            $('body').on('keyup', '.gbook_content', function(e){
                MAC.Remaining($(this),200,'.gbook_remaining')
            });
            $('body').on('focus', '.gbook_content', function(e){
                if(MAC.Gbook.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });
            $('body').on('click', '.gbook_submit', function(e){
                MAC.Gbook.Submit();
            });
        },
        'Show':function($page){
            $.ajax({
                type: 'post',
                url: maccms.path+'/index.php/gbook/index?page='+$page,
                timeout: 3000,
                error: function(){
                    $(".mac_gbook_box").html('留言加载失败，请刷新...');
                },
                success:function($html){
                    $(".mac_gbook_box").html($html);
                }
            });
        },
        'Submit':function(){
            if($(".gbook_content").val() == ''){
                alert("请输入留言内容");
                return false;
            }
            $.ajax({
                type: 'post',
                url: maccms.path + '/index.php/gbook/saveData',
                data: $('.gbook_form').serialize(),
                success:function($r){
                	alert($r.msg);
                    if($r.code == 1){
                        location.reload();
                    }
                    else{
                        if(MAC.Gbook.Verify==1){
                            MAC.Verify.Refresh();
                        }
                    }
                }
            });
        },
        'Report':function(name){
            MAC.Pop.Show('#modal-seport',maccms.path+'/index.php/gbook/report?name=' + encodeURIComponent(name),function($r){
                $('body').on('click', '#gbook_submit', function(e){
	            	MAC.Gbook.Submit();
		        });
            });
        }
    },
    'Search':{
        'Init':function(){
            $('.mac_search').click(function(){
                var that=$(this);
                var url = that.attr('data-href') ? that.attr('data-href') : maccms.path + '/index.php/vod/search.html';
                location.href = url + '?wd='+ encodeURIComponent($("#wd").val());
            });
        },
        'Submit':function(){

            return false;
        }
    },
    'Suggest':{
        'Init':function($obj,$mid,$jumpurl){
            try {
                $($obj).autocomplete(maccms.path + '/index.php/ajax/suggest?mid=' + $mid, {
                    inputClass: "mac_input",
                    resultsClass: "mac_results",
                    loadingClass: "mac_loading",
                    width: 175, scrollHeight: 300, minChars: 1, matchSubset: 1,
                    cacheLength: 10, multiple: false, matchContains: true, autoFill: false,
                    dataType: "json",
                    parse: function ($r) {
                        if ($r.code == 1) {
                            var parsed = [];
                            $.each($r['list'], function (index, row) {
                                row.url = $r.url;
                                parsed[index] = {
                                    data: row
                                };
                            });
                            return parsed;
                        } else {
                            return {data: ''};
                        }
                    },
                    formatItem: function (row, i, max) {
                        return row.name;
                    },
                    formatResult: function (row, i, max) {
                        return row.text;
                    }
                }).result(function (event, data, formatted) {
                    $($obj).val(data.name);
                    location.href = data.url.replace('mac_wd', encodeURIComponent(data.name));
                });
            }
            catch(e){}
        }
    },
    'Ulog':{
        'Init':function(){
            MAC.Ulog.Set();
            MAC.Ulog.Click();

        },
        'Get':function(){
            $.ajax({
                url: maccms.path+'/index.php/user/ajax_ulog/?ac=list',
                type:'GET',
                cache: false,
                dataType: 'json',
                success: function($r){
                    if($r.code == 1){
                        $.each($r['list'],function(index,row){
                            alert(row.ulog_id);
                        });
                    }else{

                    }
                }
            });
        },
        'Set':function(){
            if($(".mac_ulog_set").attr('data-mid')){
                var $that = $(".mac_ulog_set");
                $.get(maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&sid='+$that.attr("data-sid")+'&nid='+$that.attr("data-nid")+'&type='+$that.attr("data-type"));
            }
        },
        'Click':function(){
            $('body').on('click', 'a.mac_ulog', function(e){
                //是否需要验证登录
                if(MAC.User.IsLogin == 0){
                    MAC.User.Login();
                    return;
                }

                var $that = $(this);
                if($that.attr("data-id")){
                    $.ajax({
                        url: maccms.path+'/index.php/user/ajax_ulog/?ac=set&mid='+$that.attr("data-mid")+'&id='+$that.attr("data-id")+'&type='+$that.attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function($r){
                            alert($r.msg);
                            if($r.code == 1){
                                $that.addClass('disabled');
                            }else{
                                $that.attr('title', $r.msg);
                            }
                        }
                    });
                }
            });
        }
    },
    'User':{
        'BoxShow':0,
        'IsLogin':0,
        'UserId':'',
        'UserName':'',
        'GroupId':'',
        'GroupName':'',
        'Portrait':'',
        'Init':function(){
            if($('.mac_user').length >0){
                $('body').on('click', '.mac_user', function(e){              	
                    MAC.User.Login();
                });              
            } 

            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                var url = maccms.path + '/index.php/user';
                MAC.User.UserId = MAC.Cookie.Get('user_id');
                MAC.User.UserName = MAC.Cookie.Get('user_name');
                MAC.User.GroupId = MAC.Cookie.Get('group_id');
                MAC.User.GroupName = MAC.Cookie.Get('group_name');
                MAC.User.Portrait = MAC.Cookie.Get('user_portrait');
                MAC.User.IsLogin = 1;
                
                $('.mac_user').removeClass('mac_user').attr('href',url);
                
                $('.user_name').show().find('.name').text(MAC.User.UserName);
                
                $('.user_url').show().attr('href',url);
                
                $('.user_img').show().attr('src',MAC.User.Portrait);
            }
            else{

            }

        },
        'CheckLogin':function(){
            if(MAC.User.IsLogin == 0){
                MAC.User.Login();
            }
        },
        'Login':function(){
            var ac='ajax_login';
            if(MAC.Cookie.Get('user_id') !=undefined && MAC.Cookie.Get('user_id')!=''){
                ac= 'ajax_info';
            }
            MAC.Pop.Show('#modal-login',maccms.path+'/index.php/user/'+ac,function($r){
                $('body').on('click', '#login_form_submit', function(e){
                    $.ajax({
                        type: 'POST',
                        url: maccms.path + '/index.php/user/login',
                        data: $('.mac_login_form').serialize(),
                        success:function($r){
                            if($r.code == 1){
                                location.reload();
                            }
                        }
                    });
                });
            });
        },
        'Logout':function(){
            $.ajax({
                type: 'post',
                url: maccms.path + '/index.php/user/logout',
                success:function($r){
                	alert($r.msg)
                    if($r.code == 1){
                        location.reload();
                    }
                }
            });
        },
        'PopedomCallBack':function(trysee,h) {
            window.setTimeout(function(){
                $(window.frames["player_if"].document).find(".MacPlayer").html(h);
            },1000*60*trysee);
        },
        'BuyPopedom':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                if (confirm('您确认购买此条数据播放权限吗？')) {
                    $.ajax({
                        url: maccms.path + '/index.php/user/ajax_buy_popedom.html?id=' + $that.attr("data-id") + '&sid=' + $that.attr("data-sid") + '&nid=' + $that.attr("data-nid") + '&type=' + $that.attr("data-type"),
                        cache: false,
                        dataType: 'json',
                        success: function ($r) {
                            $that.addClass('disabled');
                            alert($r.msg)
                            if ($r.code == 1) {
                                top.location.reload();
                            }
                        },
                        complete: function () {
                            $that.removeClass('disabled');
                        }
                    });
                }
            }
        }
    },
    'Pop':{
        'Show':function($modalid,$url,$callback) {          
            $.ajax({
                type: 'post',
                url: $url,
                timeout: 3000,
                error: function(){
                   $('body').append(alert("加载失败，请刷新"));
                },
                success:function($r){
                    $('body').append($r);
                    $($modalid).modal('show');
                    $('.MacPlayer').hide();
                    $($modalid).on('hide.bs.modal', function () {
                    	$('.MacPlayer').show();
					})
                    $callback($r);
                }
            });
        }
    },
    'AdsWrap':function(w,h,n){
        document.writeln('<img width="'+w+'" height="'+h+'" alt="'+n+'" style="background-color: #CCCCCC" />');
    },
    'Css':function($url){
        $("<link>").attr({ rel: "stylesheet",type: "text/css",href: $url}).appendTo("head");
    },
    'Js':function($url){
        $.getScript($url, function(response, status) {

        });
    },
    'Desktop':function(s){
        location.href= maccms.path + '/index.php/ajax/desktop?name='+encodeURI(s)+'&url=' + encodeURI(location.href);
    },
    'Timming':function(){

    },
    'Error':function(tab,id,name){

    },
    'AddEm':function(obj,i){
        var oldtext = $(obj).val();
        $(obj).val( oldtext + '[em:' + i +']' );
    },
    'Remaining':function(obj,len,show){
        var count = len - $(obj).val().length;
        if(count < 0){
            count = 0;
            $(obj).val($(obj).val().substr(0,200));
        }
        $(show).text(count);
    },
    'Comment':{
        'Login':0,
        'Verify':0,
        'Init':function(){

            $('body').on('click', '.comment_face_box img', function(e){
                var obj = $(this).parent().parent().parent().find('.comment_content');
                MAC.AddEm(obj,$(this).attr('data-id'));
            });
            $('body').on('click', '.comment_face_panel', function(e){
                // $('.comment_face_box').toggle();
                $(this).parent().find('.comment_face_box').toggle();
            });
            $('body').on('keyup', '.comment_content', function(e){
                var obj = $(this).parent().parent().parent().parent().find('.comment_remaining');
                MAC.Remaining($(this),200,obj)
            });
            $('body').on('focus', '.comment_content', function(e){
                if(MAC.Comment.Login==1 && MAC.User.IsLogin!=1){
                    MAC.User.Login();
                }
            });

            $('body').on('click', '.comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    $.ajax({
                        url: maccms.path + '/index.php/comment/report.html?id='+$that.attr("data-id"),
                        cache: false,
                        dataType: 'json',
                        success: function($r){
                            $that.addClass('disabled');
                            alert($r.msg)
                            if($r.code == 1){
                            }
                        }
                    });
                }
            });

            $('body').on('click', '.comment_reply', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    var str = $that.html();
                    $('.comment_reply_form').remove();
                    if (str == '取消回复') {
                        $that.html('回复');
                        return false;
                    }
                    if (str == '回复') {
                        $('.comment_reply').html('回复');
                    }
                    var html = $('.comment_form').prop("outerHTML");

                    var oo = $(html);
                    oo.addClass('comment_reply_form');
                    oo.find('input[name="comment_pid"]').val( $that.attr("data-id") );

                    $that.parent().after(oo);
                    $that.html('取消回复');
                }
            });

            $('body').on('click', '.comment_submit', function(e){
                var $that = $(this);
                MAC.Comment.Submit($that);
            });

        },
        'Show':function($page){
            if($(".mac_comment").length>0){
                $.ajax({
                    type: 'get',
                    url: maccms.path + '/index.php/comment/ajax.html?rid='+$('.mac_comment').attr('data-id')+'&mid='+ $('.mac_comment').attr('data-mid') +'&page='+$page,
                    timeout: 5000,
                    error: function(){
                        $(".mac_comment").html('评论加载失败，请刷新...');
                    },
                    success:function($r){
                        $(".mac_comment").html($r);
                    }
                });
            }
        },
        'Reply':function($o){

        },
        'Submit':function($o){
            var form = $o.parents('form');
            if($(form).find(".comment_content").val() == ''){
            	alert("请输入您的评论！")
                return false;
            }
            if($('.mac_comment').attr('data-mid') == ''){
            	alert("模块mid错误！")
                return false;
            }
            if($('.mac_comment').attr('data-id') == ''){
            	alert("关联id错误！")
                return false;
            }

            $.ajax({
                type: 'post',
                url: maccms.path + '/index.php/comment/saveData',
                data: $(form).serialize() + '&comment_mid='+ $('.mac_comment').attr('data-mid') + '&comment_rid=' + $('.mac_comment').attr('data-id'),
                success:function($r){
                	alert($r.msg)
                    if($r.code == 1){
                        MAC.Comment.Show(1);
                    }
                    else{
                        if(MAC.Comment.Verify==1){
                            MAC.Verify.Refresh();
                        }
                    }
                }
            });
        }
    }
}

$(function(){
    //自动跳转手机和pc网页地址
    MAC.Adaptive();
    //验证码初始化
    MAC.Verify.Init();
    //分页跳转初始化
    MAC.PageGo.Init();
    //用户部分初始化
    MAC.User.Init();
    //顶和踩初始化
    MAC.Digg.Init();
    //评分初始化
    MAC.Score.Init();
    //星星评分初始化
    MAC.Star.Init();
    //点击数量
    MAC.Hits.Init();
    //历史记录初始化
    MAC.Ulog.Init();
    //联想搜索初始化
    MAC.Suggest.Init('.mac_wd',1,'');
    //定时任务初始化
    MAC.Timming();
});

//wap-foot-menu^/block/menu/^
!function(a){"use strict";a.fn.SuiNav=function(b){var c=this,d=!1,e={toggleName:".MenuToggle",direction:"left",trigger:"click",openingSpeed:400,closingSpeed:400,closingCascade:!0,destroy:!0};if(!a(c).hasClass("sui-nav")){if(a(this).find(".sui-nav").length<1)return;c=a(this).find(".sui-nav")[0]}e=a.extend({},e,b);var f=function(){a(c).hasClass("horizontal")?a(c).find("li").hover(function(){a(this).children("ul").stop().show(e.openingSpeed)},function(){a(this).children("ul").stop().hide(e.closingSpeed)}):"click"==e.trigger?a(c).find("li").click(function(){return"none"==a(this).children("ul").css("display")?a(this).children("ul").slideDown(e.openingSpeed):e.closingCascade?a(this).find("ul").slideUp(e.closingSpeed):a(this).children("ul").slideUp(e.closingSpeed),!1}):"hover"==e.trigger&&a(c).find("li").hover(function(){a(this).children("ul").slideDown(e.openingSpeed)},function(){e.closingCascade?a(this).find("ul").slideUp(e.closingSpeed):a(this).children("ul").slideUp(e.closingSpeed)}),a(window).resize(i)},g=function(){d||(a(document.body).append('<div class="sui-nav slide-nav"></div>'),a(document.body).append('<div class="sui-nav nav-mask"></div>'),a(".slide-nav").html(a(c).html()),a(".slide-nav").find("li").click(function(){return"none"==a(this).children("ul").css("display")?a(this).children("ul").slideDown(e.openingSpeed):e.closingCascade?a(this).find("ul").slideUp(e.closingSpeed):a(this).children("ul").slideUp(e.closingSpeed),!1}),a(".nav-mask").click(function(){h()}),setTimeout(function(){a(".slide-nav").toggleClass("active"),a(".nav-mask").toggleClass("active")},20))},h=function(){d||(d=!0,a(".slide-nav").find("li").unbind(),a(".slide-nav").removeClass("active"),a(".nav-mask").removeClass("active"),setTimeout(function(){a(".slide-nav").remove(),a(".nav-mask").remove(),d=!1},600))},i=function(){},j=function(){a("."+e.toggleName).unbind()};return i(),f(),{show:g,hide:h,toggle:function(){a(".slide-nav").length>0?h():g()},destroy:j}}}($);

//index_type_banner-slider.js^block/banner^index/top^
var STK=(function(){var a={};var b=[];a.inc=function(d,c){return true};a.register=function(e,c){var g=e.split(".");var f=a;var d=null;while(d=g.shift()){if(g.length){if(f[d]===undefined){f[d]={}}f=f[d]}else{if(f[d]===undefined){try{f[d]=c(a)}catch(h){}}}}};a.regShort=function(c,d){if(a[c]!==undefined){throw"["+c+"] : short : has been register"}a[c]=d};a.IE=/msie/i.test(navigator.userAgent);a.E=function(c){if(typeof c==="string"){return document.getElementById(c)}else{return c}};a.C=function(c){var d;c=c.toUpperCase();if(c=="TEXT"){d=document.createTextNode("")}else{if(c=="BUFFER"){d=document.createDocumentFragment()}else{d=document.createElement(c)}}return d};a.log=function(c){b.push("["+(new Date()).toString()+"]: "+c)};a.getErrorLogInformationList=function(c){return b.splice(0,c||b.length)};return a})();$Import=STK.inc;STK.register("core.ani.algorithm",function(b){var a={linear:function(f,e,j,h,g){return j*f/h+e},easeincubic:function(f,e,j,h,g){return j*(f/=h)*f*f+e},easeoutcubic:function(f,e,j,h,g){if((f/=h/2)<1){return j/2*f*f*f+e}return j/2*((f-=2)*f*f+2)+e},easeinoutcubic:function(f,e,j,h,g){if(g==undefined){g=1.70158}return j*(f/=h)*f*((g+1)*f-g)+e},easeinback:function(f,e,j,h,g){if(g==undefined){g=1.70158}return j*((f=f/h-1)*f*((g+1)*f+g)+1)+e},easeoutback:function(f,e,j,h,g){if(g==undefined){g=1.70158}return j*((f=f/h-1)*f*((g+1)*f+g)+1)+e},easeinoutback:function(f,e,j,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return j/2*(f*f*(((g*=(1.525))+1)*f-g))+e}return j/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+e}};return{addAlgorithm:function(c,d){if(a[c]){throw"[core.ani.tweenValue] this algorithm :"+c+"already exist"}a[c]=d},compute:function(h,e,d,f,g,c,j){if(typeof a[h]!=="function"){throw"[core.ani.tweenValue] this algorithm :"+h+"do not exist"}return a[h](f,e,d,g,c,j)}}});STK.register("core.obj.parseParam",function(a){return function(d,c,b){var e,f={};c=c||{};for(e in d){f[e]=d[e];if(c[e]!=null){if(b){if(d.hasOwnProperty[e]){f[e]=c[e]}}else{f[e]=c[e]}}}return f}});STK.register("core.arr.isArray",function(a){return function(b){return Object.prototype.toString.call(b)==="[object Array]"}});STK.register("core.func.timedChunk",function(b){var a={process:function(c){if(typeof c==="function"){c()}},context:{},callback:null,delay:25,execTime:50};return function(e,g){if(!b.core.arr.isArray(e)){throw"core.func.timedChunk need an array as first parameter"}var c=e.concat();var f=b.core.obj.parseParam(a,g);var h=null;var d=function(){var j=+new Date();do{f.process.call(f.context,c.shift())}while(c.length>0&&(+new Date()-j<f.execTime));if(c.length<=0){if(f.callback){f.callback(e)}}else{setTimeout(arguments.callee,f.delay)}};h=setTimeout(d,f.delay)}});STK.register("core.func.empty",function(){return function(){}});STK.register("core.ani.tweenArche",function(a){return function(n,o){var h,g,f,c,d,b,j,e;g={};h=a.core.obj.parseParam({animationType:"linear",distance:1,duration:500,callback:a.core.func.empty,algorithmParams:{},extra:5,delay:25},o);var m=function(){f=(+new Date()-c);if(f<h.duration){d=a.core.ani.algorithm.compute(h.animationType,0,h.distance,f,h.duration,h.extra,h.algorithmParams);n(d);b=setTimeout(m,h.delay)}else{e="stop";h.callback()}};e="stop";g.getStatus=function(){return e};g.play=function(){c=+new Date();d=null;m();e="play";return g};g.stop=function(){clearTimeout(b);e="stop";return g};g.resume=function(){if(j){c+=(+new Date()-j);m()}return g};g.pause=function(){clearTimeout(b);j=+new Date();e="pause";return g};g.destroy=function(){clearTimeout(b);j=0;e="stop"};return g}});STK.register("core.dom.getStyle",function(a){return function(c,f){if(a.IE){switch(f){case"opacity":var h=100;try{h=c.filters["DXImageTransform.Microsoft.Alpha"].opacity}catch(g){try{h=c.filters("alpha").opacity}catch(g){}}return h/100;case"float":f="styleFloat";default:var d=c.currentStyle?c.currentStyle[f]:null;return(c.style[f]||d)}}else{if(f=="float"){f="cssFloat"}try{var b=document.defaultView.getComputedStyle(c,"")}catch(g){}return c.style[f]||b?b[f]:null}}});STK.register("core.dom.cssText",function(a){return function(e){e=(e||"").replace(/(^[^\:]*?;)|(;[^\:]*?$)/g,"").split(";");var g={},c;for(var b=0;b<e.length;b++){c=e[b].split(":");g[c[0].toLowerCase()]=c[1]}var f=[],d={push:function(j,h){g[j.toLowerCase()]=h;return d},remove:function(h){h=h.toLowerCase();g[h]&&delete g[h];return d},getCss:function(){var j=[];for(var h in g){j.push(h+":"+g[h])}return j.join(";")}};return d}});STK.register("core.func.getType",function(a){return function(b){var c;return((c=typeof(b))=="object"?b==null&&"null"||Object.prototype.toString.call(b).slice(8,-1):c).toLowerCase()}});STK.register("core.arr.foreach",function(c){var a=function(j,f){var h=[];for(var g=0,e=j.length;g<e;g+=1){var d=f(j[g],g);if(d===false){break}else{if(d!==null){h[g]=d}}}return h};var b=function(h,e){var g={};for(var f in h){var d=e(h[f],f);if(d===false){break}else{if(d!==null){g[f]=d}}}return g};return function(e,d){if(c.core.arr.isArray(e)||(e.length&&e[0]!==undefined)){return a(e,d)}else{if(typeof e==="object"){return b(e,d)}}return null}});STK.register("core.json.merge",function(b){var a=function(d){if(d===undefined){return true}if(d===null){return true}if(b.core.arr.inArray(["number","string","function"],(typeof d))){return true}if(b.core.arr.isArray(d)){return true}if(b.core.dom.isNode(d)){return true}return false};var c=function(g,j,f){var h={};for(var e in g){if(j[e]===undefined){h[e]=g[e]}else{if(!a(g[e])&&!a(j[e])&&f){h[e]=arguments.callee(g[e],j[e])}else{h[e]=j[e]}}}for(var d in j){if(h[d]===undefined){h[d]=j[d]}}return h};return function(d,g,f){var e=b.core.obj.parseParam({isDeep:false},f);return c(d,g,e.isDeep)}});STK.register("core.util.color",function(f){var c=/^#([a-fA-F0-9]{3,8})$/;var e=/^rgb[a]?\s*\((\s*([0-9]{1,3})\s*,){2,3}(\s*([0-9]{1,3})\s*)\)$/;var d=/([0-9]{1,3})/ig;var a=/([a-fA-F0-9]{2})/ig;var b=f.core.arr.foreach;var g=function(m){var h=[];var j=[];if(c.test(m)){j=m.match(c);if(j[1].length<=4){h=b(j[1].split(""),function(o,n){return parseInt(o+o,16)})}else{if(j[1].length<=8){h=b(j[1].match(a),function(o,n){return parseInt(o,16)})}}return h}if(e.test(m)){j=m.match(d);h=b(j,function(o,n){return parseInt(o,10)});return h}return false};return function(m,h){var j=g(m);if(!j){return false}var n={};n.getR=function(){return j[0]};n.getG=function(){return j[1]};n.getB=function(){return j[2]};n.getA=function(){return j[3]};return n}});STK.register("core.ani.tween",function(d){var a=d.core.ani.tweenArche;var b=d.core.arr.foreach;var g=d.core.dom.getStyle;var h=d.core.func.getType;var n=d.core.obj.parseParam;var m=d.core.json.merge;var c=d.core.util.color;var f=function(r){var q=/(-?\d\.?\d*)([a-z%]*)/i.exec(r);var p=[0,"px"];if(q){if(q[1]){p[0]=q[1]-0}if(q[2]){p[1]=q[2]}}return p};var o=function(t){for(var r=0,p=t.length;r<p;r+=1){var q=t.charCodeAt(r);if(q>64&&q<90){var u=t.substr(0,r);var w=t.substr(r,1);var v=t.slice(r+1);return u+"-"+w.toLowerCase()+v}}return t};var j=function(u,w,r){var v=g(u,r);if(h(v)==="undefined"||v==="auto"){if(r==="height"){v=u.offsetHeight}if(r==="width"){v=u.offsetWidth}}var q={start:v,end:w,unit:"",key:r,defaultColor:false};if(h(w)==="number"){var s=[0,"px"];if(h(v)==="number"){s[0]=v}else{s=f(v)}q.start=s[0];q.unit=s[1]}if(h(w)==="string"){var p,t;p=c(w);if(p){t=c(v);if(!t){t=c("#fff")}q.start=t;q.end=p;q.defaultColor=true}}u=null;return q};var e={opacity:function(q,t,p,r){var s=(q*(p-t)+t);return{filter:"alpha(opacity="+s*100+")",opacity:Math.max(Math.min(1,s),0)}},defaultColor:function(t,x,q,w){var v=Math.max(0,Math.min(255,Math.ceil((t*(q.getR()-x.getR())+x.getR()))));var u=Math.max(0,Math.min(255,Math.ceil((t*(q.getG()-x.getG())+x.getG()))));var p=Math.max(0,Math.min(255,Math.ceil((t*(q.getB()-x.getB())+x.getB()))));var s={};s[o(key)]="#"+(v<16?"0":"")+v.toString(16)+(u<16?"0":"")+u.toString(16)+(p<16?"0":"")+p.toString(16);return s},"default":function(s,v,p,t,r){var u=(s*(p-v)+v);var q={};q[o(r)]=u+t;return q}};return function(r,A){var u,v,p,B,C,z,D,s,t,x;A=A||{};v=n({animationType:"linear",duration:500,algorithmParams:{},extra:5,delay:25},A);v.distance=1;v.callback=(function(){var E=A.end||d.core.func.empty;return function(){B(1);D();E(r)}})();p=m(e,A.propertys||{});z=null;C={};t=[];B=function(E){var G=[];var F=b(C,function(L,J){var K;if(p[J]){K=p[J]}else{if(L.defaultColor){K=p.defaultColor}else{K=p["default"]}}var I=K(E,L.start,L.end,L.unit,L.key);for(var H in I){z.push(H,I[H])}});r.style.cssText=z.getCss()};D=function(){var E;while(E=t.shift()){try{E.fn();if(E.type==="play"){break}if(E.type==="destroy"){break}}catch(F){}}};x=a(B,v);var w=function(){if(x.getStatus()!=="play"){r=el}else{t.push({fn:w,type:"setNode"})}};var q=function(E){if(x.getStatus()!=="play"){C=b(E,function(G,F){return j(r,G,F)});z=d.core.dom.cssText(r.style.cssText+(A.staticStyle||""));x.play()}else{t.push({fn:function(){q(E)},type:"play"})}};var y=function(){if(x.getStatus()!=="play"){x.destroy();r=null;u=null;v=null;p=null;B=null;C=null;z=null;D=null;s=null;t=null}else{t.push({fn:y,type:"destroy"})}};u={};u.play=function(E){q(E);return u};u.stop=function(){x.stop();return u};u.pause=function(){x.pause();return u};u.resume=function(){x.resume();return u};u.finish=function(E){q(E);y();return u};u.setNode=function(E){w();return u};u.destroy=function(){y();return u};return u}});STK.register("core.arr.findout",function(a){return function(f,e){if(!a.core.arr.isArray(f)){throw"the findout function needs an array as first parameter"}var c=[];for(var d=0,b=f.length;d<b;d+=1){if(f[d]===e){c.push(d)}}return c}});STK.register("core.arr.clear",function(a){return function(e){if(!a.core.arr.isArray(e)){throw"the clear function needs an array as first parameter"}var c=[];for(var d=0,b=e.length;d<b;d+=1){if(!(a.core.arr.findout([undefined,null,""],e[d]).length)){c.push(e[d])}}return c}});STK.register("core.arr.copy",function(a){return function(b){if(!a.core.arr.isArray(b)){throw"the copy function needs an array as first parameter"}return b.slice(0)}});STK.register("core.arr.hasby",function(a){return function(f,c){if(!a.core.arr.isArray(f)){throw"the hasBy function needs an array as first parameter"}var d=[];for(var e=0,b=f.length;e<b;e+=1){if(c(f[e],e)){d.push(e)}}return d}});STK.register("core.arr.indexOf",function(a){return function(d,e){if(e.indexOf){return e.indexOf(d)}for(var c=0,b=e.length;c<b;c++){if(e[c]===d){return c}}return -1}});STK.register("core.arr.inArray",function(a){return function(b,c){return a.core.arr.indexOf(b,c)>-1}});STK.register("core.arr.unique",function(a){return function(e){if(!a.core.arr.isArray(e)){throw"the unique function needs an array as first parameter"}var c=[];for(var d=0,b=e.length;d<b;d+=1){if(a.core.arr.indexOf(e[d],c)===-1){c.push(e[d])}}return c}});STK.register("core.dom.hasClassName",function(a){return function(c,b){return(new RegExp("\\b"+b+"\\b").test(c.className))}});STK.register("core.dom.addClassName",function(a){return function(c,b){if(c.nodeType===1){if(!a.core.dom.hasClassName(c,b)){c.className+=(" "+b)}}}});STK.register("core.dom.addHTML",function(a){return function(d,c){if(a.IE){d.insertAdjacentHTML("BeforeEnd",c)}else{var e=d.ownerDocument.createRange();e.setStartBefore(d);var b=e.createContextualFragment(c);d.appendChild(b)}}});STK.register("core.dom.sizzle",function(n){var t=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,m=0,d=Object.prototype.toString,s=false,j=true;[0,0].sort(function(){j=false;return 0});var b=function(z,e,C,D){C=C||[];e=e||document;var F=e;if(e.nodeType!==1&&e.nodeType!==9){return[]}if(!z||typeof z!=="string"){return C}var A=[],w,H,K,v,y=true,x=b.isXML(e),E=z,G,J,I,B;do{t.exec("");w=t.exec(E);if(w){E=w[3];A.push(w[1]);if(w[2]){v=w[3];break}}}while(w);if(A.length>1&&o.exec(z)){if(A.length===2&&f.relative[A[0]]){H=h(A[0]+A[1],e)}else{H=f.relative[A[0]]?[e]:b(A.shift(),e);while(A.length){z=A.shift();if(f.relative[z]){z+=A.shift()}H=h(z,H)}}}else{if(!D&&A.length>1&&e.nodeType===9&&!x&&f.match.ID.test(A[0])&&!f.match.ID.test(A[A.length-1])){G=b.find(A.shift(),e,x);e=G.expr?b.filter(G.expr,G.set)[0]:G.set[0]}if(e){G=D?{expr:A.pop(),set:a(D)}:b.find(A.pop(),A.length===1&&(A[0]==="~"||A[0]==="+")&&e.parentNode?e.parentNode:e,x);H=G.expr?b.filter(G.expr,G.set):G.set;if(A.length>0){K=a(H)}else{y=false}while(A.length){J=A.pop();I=J;if(!f.relative[J]){J=""}else{I=A.pop()}if(I==null){I=e}f.relative[J](K,I,x)}}else{K=A=[]}}if(!K){K=H}if(!K){b.error(J||z)}if(d.call(K)==="[object Array]"){if(!y){C.push.apply(C,K)}else{if(e&&e.nodeType===1){for(B=0;K[B]!=null;B++){if(K[B]&&(K[B]===true||K[B].nodeType===1&&b.contains(e,K[B]))){C.push(H[B])}}}else{for(B=0;K[B]!=null;B++){if(K[B]&&K[B].nodeType===1){C.push(H[B])}}}}}else{a(K,C)}if(v){b(v,F,C,D);b.uniqueSort(C)}return C};b.uniqueSort=function(v){if(c){s=j;v.sort(c);if(s){for(var e=1;e<v.length;e++){if(v[e]===v[e-1]){v.splice(e--,1)}}}}return v};b.matches=function(e,v){return b(e,null,null,v)};b.find=function(B,e,C){var A;if(!B){return[]}for(var x=0,w=f.order.length;x<w;x++){var z=f.order[x],y;if((y=f.leftMatch[z].exec(B))){var v=y[1];y.splice(1,1);if(v.substr(v.length-1)!=="\\"){y[1]=(y[1]||"").replace(/\\/g,"");A=f.find[z](y,e,C);if(A!=null){B=B.replace(f.match[z],"");break}}}}if(!A){A=e.getElementsByTagName("*")}return{set:A,expr:B}};b.filter=function(F,E,I,y){var w=F,K=[],C=E,A,e,B=E&&E[0]&&b.isXML(E[0]);while(F&&E.length){for(var D in f.filter){if((A=f.leftMatch[D].exec(F))!=null&&A[2]){var v=f.filter[D],J,H,x=A[1];e=false;A.splice(1,1);if(x.substr(x.length-1)==="\\"){continue}if(C===K){K=[]}if(f.preFilter[D]){A=f.preFilter[D](A,C,I,K,y,B);if(!A){e=J=true}else{if(A===true){continue}}}if(A){for(var z=0;(H=C[z])!=null;z++){if(H){J=v(H,A,z,C);var G=y^!!J;if(I&&J!=null){if(G){e=true}else{C[z]=false}}else{if(G){K.push(H);e=true}}}}}if(J!==undefined){if(!I){C=K}F=F.replace(f.match[D],"");if(!e){return[]}break}}}if(F===w){if(e==null){b.error(F)}else{break}}w=F}return C};b.error=function(e){throw"Syntax error, unrecognized expression: "+e};var f={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href")}},relative:{"+":function(A,v){var x=typeof v==="string",z=x&&!/\W/.test(v),B=x&&!z;if(z){v=v.toLowerCase()}for(var w=0,e=A.length,y;w<e;w++){if((y=A[w])){while((y=y.previousSibling)&&y.nodeType!==1){}A[w]=B||y&&y.nodeName.toLowerCase()===v?y||false:y===v}}if(B){b.filter(v,A,true)}},">":function(A,v){var y=typeof v==="string",z,w=0,e=A.length;if(y&&!/\W/.test(v)){v=v.toLowerCase();for(;w<e;w++){z=A[w];if(z){var x=z.parentNode;A[w]=x.nodeName.toLowerCase()===v?x:false}}}else{for(;w<e;w++){z=A[w];if(z){A[w]=y?z.parentNode:z.parentNode===v}}if(y){b.filter(v,A,true)}}},"":function(x,v,z){var w=m++,e=u,y;if(typeof v==="string"&&!/\W/.test(v)){v=v.toLowerCase();y=v;e=r}e("parentNode",v,w,x,y,z)},"~":function(x,v,z){var w=m++,e=u,y;if(typeof v==="string"&&!/\W/.test(v)){v=v.toLowerCase();y=v;e=r}e("previousSibling",v,w,x,y,z)}},find:{ID:function(v,w,x){if(typeof w.getElementById!=="undefined"&&!x){var e=w.getElementById(v[1]);return e?[e]:[]}},NAME:function(w,z){if(typeof z.getElementsByName!=="undefined"){var v=[],y=z.getElementsByName(w[1]);for(var x=0,e=y.length;x<e;x++){if(y[x].getAttribute("name")===w[1]){v.push(y[x])}}return v.length===0?null:v}},TAG:function(e,v){return v.getElementsByTagName(e[1])}},preFilter:{CLASS:function(x,v,w,e,A,B){x=" "+x[1].replace(/\\/g,"")+" ";if(B){return x}for(var y=0,z;(z=v[y])!=null;y++){if(z){if(A^(z.className&&(" "+z.className+" ").replace(/[\t\n]/g," ").indexOf(x)>=0)){if(!w){e.push(z)}}else{if(w){v[y]=false}}}}return false},ID:function(e){return e[1].replace(/\\/g,"")},TAG:function(v,e){return v[1].toLowerCase()},CHILD:function(e){if(e[1]==="nth"){var v=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(e[2]==="even"&&"2n"||e[2]==="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(v[1]+(v[2]||1))-0;e[3]=v[3]-0}e[0]=m++;return e},ATTR:function(y,v,w,e,z,A){var x=y[1].replace(/\\/g,"");if(!A&&f.attrMap[x]){y[1]=f.attrMap[x]}if(y[2]==="~="){y[4]=" "+y[4]+" "}return y},PSEUDO:function(y,v,w,e,z){if(y[1]==="not"){if((t.exec(y[3])||"").length>1||/^\w/.test(y[3])){y[3]=b(y[3],null,null,v)}else{var x=b.filter(y[3],v,w,true^z);if(!w){e.push.apply(e,x)}return false}}else{if(f.match.POS.test(y[0])||f.match.CHILD.test(y[0])){return true}}return y},POS:function(e){e.unshift(true);return e}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden"},disabled:function(e){return e.disabled===true},checked:function(e){return e.checked===true},selected:function(e){e.parentNode.selectedIndex;return e.selected===true},parent:function(e){return !!e.firstChild},empty:function(e){return !e.firstChild},has:function(w,v,e){return !!b(e[3],w).length},header:function(e){return(/h\d/i).test(e.nodeName)},text:function(e){return"text"===e.type},radio:function(e){return"radio"===e.type},checkbox:function(e){return"checkbox"===e.type},file:function(e){return"file"===e.type},password:function(e){return"password"===e.type},submit:function(e){return"submit"===e.type},image:function(e){return"image"===e.type},reset:function(e){return"reset"===e.type},button:function(e){return"button"===e.type||e.nodeName.toLowerCase()==="button"},input:function(e){return(/input|select|textarea|button/i).test(e.nodeName)}},setFilters:{first:function(v,e){return e===0},last:function(w,v,e,x){return v===x.length-1},even:function(v,e){return e%2===0},odd:function(v,e){return e%2===1},lt:function(w,v,e){return v<e[3]-0},gt:function(w,v,e){return v>e[3]-0},nth:function(w,v,e){return e[3]-0===v},eq:function(w,v,e){return e[3]-0===v}},filter:{PSEUDO:function(w,B,A,C){var e=B[1],v=f.filters[e];if(v){return v(w,A,B,C)}else{if(e==="contains"){return(w.textContent||w.innerText||b.getText([w])||"").indexOf(B[3])>=0}else{if(e==="not"){var x=B[3];for(var z=0,y=x.length;z<y;z++){if(x[z]===w){return false}}return true}else{b.error("Syntax error, unrecognized expression: "+e)}}}},CHILD:function(e,x){var A=x[1],v=e;switch(A){case"only":case"first":while((v=v.previousSibling)){if(v.nodeType===1){return false}}if(A==="first"){return true}v=e;case"last":while((v=v.nextSibling)){if(v.nodeType===1){return false}}return true;case"nth":var w=x[2],D=x[3];if(w===1&&D===0){return true}var z=x[0],C=e.parentNode;if(C&&(C.sizcache!==z||!e.nodeIndex)){var y=0;for(v=C.firstChild;v;v=v.nextSibling){if(v.nodeType===1){v.nodeIndex=++y}}C.sizcache=z}var B=e.nodeIndex-D;if(w===0){return B===0}else{return(B%w===0&&B/w>=0)}}},ID:function(v,e){return v.nodeType===1&&v.getAttribute("id")===e},TAG:function(v,e){return(e==="*"&&v.nodeType===1)||v.nodeName.toLowerCase()===e},CLASS:function(v,e){return(" "+(v.className||v.getAttribute("class"))+" ").indexOf(e)>-1},ATTR:function(z,x){var w=x[1],e=f.attrHandle[w]?f.attrHandle[w](z):z[w]!=null?z[w]:z.getAttribute(w),A=e+"",y=x[2],v=x[4];return e==null?y==="!=":y==="="?A===v:y==="*="?A.indexOf(v)>=0:y==="~="?(" "+A+" ").indexOf(v)>=0:!v?A&&e!==false:y==="!="?A!==v:y==="^="?A.indexOf(v)===0:y==="$="?A.substr(A.length-v.length)===v:y==="|="?A===v||A.substr(0,v.length+1)===v+"-":false},POS:function(y,v,w,z){var e=v[2],x=f.setFilters[e];if(x){return x(y,w,v,z)}}}};b.selectors=f;var o=f.match.POS,g=function(v,e){return"\\"+(e-0+1)};for(var q in f.match){f.match[q]=new RegExp(f.match[q].source+(/(?![^\[]*\])(?![^\(]*\))/.source));f.leftMatch[q]=new RegExp(/(^(?:.|\r|\n)*?)/.source+f.match[q].source.replace(/\\(\d+)/g,g))}var a=function(v,e){v=Array.prototype.slice.call(v,0);if(e){e.push.apply(e,v);return e}return v};try{Array.prototype.slice.call(document.documentElement.childNodes,0)[0].nodeType}catch(p){a=function(y,x){var v=x||[],w=0;if(d.call(y)==="[object Array]"){Array.prototype.push.apply(v,y)}else{if(typeof y.length==="number"){for(var e=y.length;w<e;w++){v.push(y[w])}}else{for(;y[w];w++){v.push(y[w])}}}return v}}var c;if(document.documentElement.compareDocumentPosition){c=function(v,e){if(!v.compareDocumentPosition||!e.compareDocumentPosition){if(v==e){s=true}return v.compareDocumentPosition?-1:1}var w=v.compareDocumentPosition(e)&4?-1:v===e?0:1;if(w===0){s=true}return w}}else{if("sourceIndex" in document.documentElement){c=function(v,e){if(!v.sourceIndex||!e.sourceIndex){if(v==e){s=true}return v.sourceIndex?-1:1}var w=v.sourceIndex-e.sourceIndex;if(w===0){s=true}return w}}else{if(document.createRange){c=function(x,v){if(!x.ownerDocument||!v.ownerDocument){if(x==v){s=true}return x.ownerDocument?-1:1}var w=x.ownerDocument.createRange(),e=v.ownerDocument.createRange();w.setStart(x,0);w.setEnd(x,0);e.setStart(v,0);e.setEnd(v,0);var y=w.compareBoundaryPoints(Range.START_TO_END,e);if(y===0){s=true}return y}}}}b.getText=function(e){var v="",x;for(var w=0;e[w];w++){x=e[w];if(x.nodeType===3||x.nodeType===4){v+=x.nodeValue}else{if(x.nodeType!==8){v+=b.getText(x.childNodes)}}}return v};(function(){var v=document.createElement("div"),w="script"+(new Date()).getTime();v.innerHTML="<a name='"+w+"'/>";var e=document.documentElement;e.insertBefore(v,e.firstChild);if(document.getElementById(w)){f.find.ID=function(y,z,A){if(typeof z.getElementById!=="undefined"&&!A){var x=z.getElementById(y[1]);return x?x.id===y[1]||typeof x.getAttributeNode!=="undefined"&&x.getAttributeNode("id").nodeValue===y[1]?[x]:undefined:[]}};f.filter.ID=function(z,x){var y=typeof z.getAttributeNode!=="undefined"&&z.getAttributeNode("id");return z.nodeType===1&&y&&y.nodeValue===x}}e.removeChild(v);e=v=null})();(function(){var e=document.createElement("div");e.appendChild(document.createComment(""));if(e.getElementsByTagName("*").length>0){f.find.TAG=function(v,z){var y=z.getElementsByTagName(v[1]);if(v[1]==="*"){var x=[];for(var w=0;y[w];w++){if(y[w].nodeType===1){x.push(y[w])}}y=x}return y}}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){f.attrHandle.href=function(v){return v.getAttribute("href",2)}}e=null})();if(document.querySelectorAll){(function(){var e=b,w=document.createElement("div");w.innerHTML="<p class='TEST'></p>";if(w.querySelectorAll&&w.querySelectorAll(".TEST").length===0){return}b=function(A,z,x,y){z=z||document;if(!y&&z.nodeType===9&&!b.isXML(z)){try{return a(z.querySelectorAll(A),x)}catch(B){}}return e(A,z,x,y)};for(var v in e){b[v]=e[v]}w=null})()}(function(){var e=document.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return}f.order.splice(1,0,"CLASS");f.find.CLASS=function(v,w,x){if(typeof w.getElementsByClassName!=="undefined"&&!x){return w.getElementsByClassName(v[1])}};e=null})();function r(v,A,z,D,B,C){for(var x=0,w=D.length;x<w;x++){var e=D[x];if(e){e=e[v];var y=false;while(e){if(e.sizcache===z){y=D[e.sizset];break}if(e.nodeType===1&&!C){e.sizcache=z;e.sizset=x}if(e.nodeName.toLowerCase()===A){y=e;break}e=e[v]}D[x]=y}}}function u(v,A,z,D,B,C){for(var x=0,w=D.length;x<w;x++){var e=D[x];if(e){e=e[v];var y=false;while(e){if(e.sizcache===z){y=D[e.sizset];break}if(e.nodeType===1){if(!C){e.sizcache=z;e.sizset=x}if(typeof A!=="string"){if(e===A){y=true;break}}else{if(b.filter(A,[e]).length>0){y=e;break}}}e=e[v]}D[x]=y}}}b.contains=document.compareDocumentPosition?function(v,e){return !!(v.compareDocumentPosition(e)&16)}:function(v,e){return v!==e&&(v.contains?v.contains(e):true)};b.isXML=function(e){var v=(e?e.ownerDocument||e:0).documentElement;return v?v.nodeName!=="HTML":false};var h=function(e,B){var x=[],y="",z,w=B.nodeType?[B]:B;while((z=f.match.PSEUDO.exec(e))){y+=z[0];e=e.replace(f.match.PSEUDO,"")}e=f.relative[e]?e+"*":e;for(var A=0,v=w.length;A<v;A++){b(e,w[A],x)}return b.filter(y,x)};return b});STK.register("core.dom.builder",function(a){function b(m,f){if(f){return f}var e,h=/\<(\w+)[^>]*\s+node-type\s*=\s*([\'\"])?(\w+)\2.*?>/g;var g={};var j,d,c;while((e=h.exec(m))){d=e[1];j=e[3];c=d+"[node-type="+j+"]";g[j]=g[j]==null?[]:g[j];if(!a.core.arr.inArray(c,g[j])){g[j].push(d+"[node-type="+j+"]")}}return g}return function(m,e){var j=a.core.func.getType(m)=="string";var g=b(j?m:m.innerHTML,e);var d=m;if(j){d=a.C("div");d.innerHTML=m}var f,h={};for(f in g){h[f]=a.core.dom.sizzle(g[f].toString(),d)}var c=m;if(j){c=a.C("buffer");while(d.children[0]){c.appendChild(d.children[0])}}return{box:c,list:h}}});STK.register("core.obj.beget",function(b){var a=function(){};return function(c){a.prototype=c;return new a()}});STK.register("core.dom.setStyle",function(a){return function(b,c,d){if(a.IE){switch(c){case"opacity":b.style.filter="alpha(opacity="+(d*100)+")";if(!b.currentStyle||!b.currentStyle.hasLayout){b.style.zoom=1}break;case"float":c="styleFloat";default:b.style[c]=d}}else{if(c=="float"){c="cssFloat"}b.style[c]=d}}});STK.register("core.dom.insertAfter",function(a){return function(c,d){var b=d.parentNode;if(b.lastChild==d){b.appendChild(c)}else{b.insertBefore(c,d.nextSibling)}}});STK.register("core.dom.insertBefore",function(a){return function(c,d){var b=d.parentNode;b.insertBefore(c,d)}});STK.register("core.dom.removeClassName",function(a){return function(c,b){if(c.nodeType===1){if(a.core.dom.hasClassName(c,b)){c.className=c.className.replace(new RegExp("\\b"+b+"\\b")," ")}}}});STK.register("core.dom.trimNode",function(a){return function(c){var d=c.childNodes;for(var b=0;b<d.length;b++){if(d[b].nodeType==3||d[b].nodeType==8){c.removeChild(d[b])}}}});STK.register("core.dom.removeNode",function(a){return function(b){b=a.E(b)||b;try{b.parentNode.removeChild(b)}catch(c){}}});STK.register("core.evt.addEvent",function(a){return function(b,e,d){var c=a.E(b);if(c==null){return false}e=e||"click";if((typeof d).toLowerCase()!="function"){return}if(c.attachEvent){c.attachEvent("on"+e,d)}else{if(c.addEventListener){c.addEventListener(e,d,false)}else{c["on"+e]=d}}return true}});STK.register("core.evt.removeEvent",function(a){return function(c,e,d,b){var f=a.E(c);if(f==null){return false}if(typeof d!="function"){return false}if(f.removeEventListener){f.removeEventListener(e,d,b)}else{if(f.detachEvent){f.detachEvent("on"+e,d)}else{f["on"+e]=null}}return true}});STK.register("core.dom.contains",function(a){return function(b,c){if(b===c){return false}else{if(b.compareDocumentPosition){return((b.compareDocumentPosition(c)&16)===16)}else{if(b.contains&&c.nodeType===1){return b.contains(c)}else{while(c=c.parentNode){if(b===c){return true}}}}}return false}});STK.register("core.util.hideContainer",function(c){var d;var a=function(){if(d){return}d=c.C("div");d.style.cssText="position:absolute;top:-9999px;left:-9999px;";document.getElementsByTagName("head")[0].appendChild(d)};var b={appendChild:function(e){if(c.isNode(e)){a();d.appendChild(e)}},removeChild:function(e){if(c.isNode(e)){d&&d.removeChild(e)}}};return b});STK.register("core.dom.isNode",function(a){return function(b){return(b!=undefined)&&Boolean(b.nodeName)&&Boolean(b.nodeType)}});STK.register("core.dom.ready",function(g){var c=[];var o=false;var n=g.core.func.getType;var h=g.core.util.browser;var f=g.core.evt.addEvent;var j=function(){if(!o){if(document.readyState==="complete"){return true}}return o};var d=function(){if(o==true){return}o=true;for(var q=0,p=c.length;q<p;q++){if(n(c[q])==="function"){try{c[q].call()}catch(r){}}}c=[]};var a=function(){if(j()){d();return}try{document.documentElement.doScroll("left")}catch(p){setTimeout(arguments.callee,25);return}d()};var b=function(){if(j()){d();return}setTimeout(arguments.callee,25)};var e=function(){f(document,"DOMContentLoaded",d)};var m=function(){f(window,"load",d)};if(!j()){if(g.IE&&window===window.top){a()}e();b();m()}return function(p){if(j()){if(n(p)==="function"){p.call()}}else{c.push(p)}}});STK.register("core.evt.custEvent",function(c){var a="__custEventKey__",d=1,e={},b=function(h,g){var f=(typeof h=="number")?h:h[a];return(f&&e[f])&&{obj:(typeof g=="string"?e[f][g]:e[f]),key:f}};return{define:function(m,h){if(m&&h){var g=(typeof m=="number")?m:m[a]||(m[a]=d++),j=e[g]||(e[g]={});h=[].concat(h);for(var f=0;f<h.length;f++){j[h[f]]||(j[h[f]]=[])}return g}},undefine:function(j,h){if(j){var g=(typeof j=="number")?j:j[a];if(g&&e[g]){if(h){h=[].concat(h);for(var f=0;f<h.length;f++){if(h[f] in e[g]){delete e[g][h[f]]}}}else{delete e[g]}}}},add:function(m,g,f,h){if(m&&typeof g=="string"&&f){var j=b(m,g);if(!j||!j.obj){throw"custEvent ("+g+") is undefined !"}j.obj.push({fn:f,data:h});return j.key}},once:function(m,g,f,h){if(m&&typeof g=="string"&&f){var j=b(m,g);if(!j||!j.obj){throw"custEvent ("+g+") is undefined !"}j.obj.push({fn:f,data:h,once:true});return j.key}},remove:function(n,j,h){if(n){var m=b(n,j),o,f;if(m&&(o=m.obj)){if(c.isArray(o)){if(h){var g=0;while(o[g]){if(o[g].fn===h){break}g++}o.splice(g,1)}else{o.splice(0,o.length)}}else{for(var g in o){o[g]=[]}}return m.key}}},fire:function(g,p,n){if(g&&typeof p=="string"){var f=b(g,p),m;if(f&&(m=f.obj)){if(!c.isArray(n)){n=n!=undefined?[n]:[]}for(var h=m.length-1;h>-1&&m[h];h--){var q=m[h].fn;var o=m[h].once;if(q&&q.apply){try{q.apply(g,[{type:p,data:m[h].data}].concat(n));if(o){m.splice(h,1)}}catch(j){c.log("custEvent fire",j)}}}return f.key}}},destroy:function(){e={};d=1}}});STK.register("core.evt.fixEvent",function(a){return function(b){b=b||a.core.evt.getEvent();if(!b.target){b.target=b.srcElement;b.pageX=b.x;b.pageY=b.y}if(typeof b.layerX=="undefined"){b.layerX=b.offsetX}if(typeof b.layerY=="undefined"){b.layerY=b.offsetY}return b}});STK.register("core.evt.delegatedEvent",function(b){var a=function(f,e){for(var d=0,c=f.length;d<c;d+=1){if(b.core.dom.contains(f[d],e)){return true}}return false};return function(d,g){if(!b.core.dom.isNode(d)){throw"core.evt.delegatedEvent need an Element as first Parameter"}if(!g){g=[]}if(b.core.arr.isArray(g)){g=[g]}var c={};var f=function(p){var j=b.core.evt.fixEvent(p);var o=j.target;var n=p.type;var q=function(){var t,r,s;t=o.getAttribute("action-target");if(t){r=b.core.dom.sizzle(t,d);if(r.length){s=j.target=r[0]}}q=b.core.func.empty;return s};var h=function(){var r=q()||o;if(c[n]&&c[n][m]){return c[n][m]({evt:j,el:r,box:d,data:b.core.json.queryToJson(r.getAttribute("action-data")||"")})}else{return true}};if(a(g,o)){return false}else{if(!b.core.dom.contains(d,o)){return false}else{var m=null;while(o&&o!==d){m=o.getAttribute("action-type");if(m&&h()===false){break}o=o.parentNode}}}};var e={};e.add=function(m,n,j){if(!c[n]){c[n]={};b.core.evt.addEvent(d,n,f)}var h=c[n];h[m]=j};e.remove=function(h,j){if(c[j]){delete c[j][h];if(b.core.obj.isEmpty(c[j])){delete c[j];b.core.evt.removeEvent(d,j,f)}}};e.pushExcept=function(h){g.push(h)};e.removeExcept=function(m){if(!m){g=[]}else{for(var j=0,h=g.length;j<h;j+=1){if(g[j]===m){g.splice(j,1)}}}};e.clearExcept=function(h){g=[]};e.destroy=function(){for(k in c){for(l in c[k]){delete c[k][l]}delete c[k];b.core.evt.removeEvent(d,k,f)}};return e}});STK.register("core.str.trim",function(a){return function(e){if(typeof e!=="string"){throw"trim need a string as parameter"}var b=e.length;var d=0;var c=/(\u3000|\s|\t|\u00A0)/;while(d<b){if(!c.test(e.charAt(d))){break}d+=1}while(b>d){if(!c.test(e.charAt(b-1))){break}b-=1}return e.slice(d,b)}});STK.register("core.io.getXHR",function(a){return function(){var e=false;try{e=new XMLHttpRequest()}catch(d){try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){e=false}}}return e}});STK.register("core.json.queryToJson",function(a){return function(d,h){var m=a.core.str.trim(d).split("&");var j={};var c=function(o){if(h){return decodeURIComponent(o)}else{return o}};for(var f=0,g=m.length;f<g;f++){if(m[f]){var e=m[f].split("=");var b=e[0];var n=e[1];if(e.length<2){n=b;b="$nullName"}if(!j[b]){j[b]=c(n)}else{if(a.core.arr.isArray(j[b])!=true){j[b]=[j[b]]}j[b].push(c(n))}}}return j}});STK.register("core.util.pageletM",function(f){var e="http://html6game.com/";var d="http://html6game.com/";if(typeof $CONFIG!="undefined"){e=$CONFIG.jsPath||e;d=$CONFIG.cssPath||d}var o={},g,s={},a={};var q=function(v,t){var u=o[v]||(o[v]={loaded:false,list:[]});if(u.loaded){t(v);return false}u.list.push(t);if(u.list.length>1){return false}return true};var j=function(u){var t=o[u].list;for(var v=0;v<t.length;v++){t[v](u)}o[u].loaded=true;delete o[u].list};var m=function(x,t,v){if(!q(x,v)){return}var u=d+x;var y=f.C("link");y.setAttribute("rel","Stylesheet");y.setAttribute("type","text/css");y.setAttribute("charset","utf-8");y.setAttribute("href",u);document.getElementsByTagName("head")[0].appendChild(y);var z=f.C("div");z.id=t;f.core.util.hideContainer.appendChild(z);var w=3000;var A=function(){if(parseInt(f.core.dom.getStyle(z,"height"))==42){f.core.util.hideContainer.removeChild(z);j(x);return}if(--w>0){setTimeout(A,10)}else{f.log(x+"timeout!");f.core.util.hideContainer.removeChild(z);delete o[x]}};setTimeout(A,50)};var c=function(v,u){if(!q(v,u)){return}var t=e+v;f.core.io.scriptLoader({url:t,onComplete:function(){j(v)},onTimeout:function(){f.log(v+"timeout!");delete o[v]}})};var r=function(u,t){if(!s[u]){s[u]=t}};var b=function(t){if(t){if(s[t]){try{a[t]=s[t](f)}catch(v){f.log(t,v)}}else{f.log("start:ns="+t+" ,have not been registed")}return}var u=[];for(t in s){u.push(t)}f.timedChunk(u,{process:function(w){try{a[w]=s[w](f)}catch(x){f.log(w,x)}}})};var p=function(t){var u=1,y,A,w,B,D,v,x;t=t||{};w=t.html;B=t.css;D=t.js;if(!t.pid||(!(A=f.E(t.pid))&&w!=null)){f.log("node pid["+t.pid+"] is not on the body");return}if(D&&!f.isArray(D)){D=[D]}v=function(){if(--u>0){return}(typeof w!="undefined")&&(A.innerHTML=w);if(D){x()}};x=function(E){if(D.length>0){c(D.splice(0,1)[0],x)}if(E&&E.indexOf("/pl/")!=-1){var F=E.replace(/^.*?\/(pl\/.*)\.js\??.*$/,"$1").replace(/\//g,".");b(F)}};if(B){u+=B.length;for(var z=0,C;(C=B[z]);z++){m(C,"js_"+C.replace(/^\/?(.*)\.css\??.*$/i,"$1").replace(/\//g,"_"),v)}}v()};var h=function(t){if(t){if(a[t]){f.log("destroy:"+t);try{a[t].destroy()}catch(u){f.log(u)}delete a[t]}return}for(t in a){f.log("destroy:"+t);try{a[t]&&a[t].destroy&&a[t].destroy()}catch(u){f.log(t,u)}}a={}};var n={register:r,start:b,view:p,clear:h,destroy:function(){n.clear();o={};a={};s={};g=undefined}};f.core.dom.ready(function(){f.addEvent(window,"unload",function(){f.removeEvent(window,"unload",arguments.callee);n.destroy()})});return n});(function(){var b=STK.core;var c={tween:b.ani.tween,tweenArche:b.ani.tweenArche,arrCopy:b.arr.copy,arrClear:b.arr.clear,hasby:b.arr.hasby,unique:b.arr.unique,foreach:b.arr.foreach,isArray:b.arr.isArray,inArray:b.arr.inArray,arrIndexOf:b.arr.indexOf,findout:b.arr.findout,domNext:b.dom.next,domPrev:b.dom.prev,isNode:b.dom.isNode,addHTML:b.dom.addHTML,insertHTML:b.dom.insertHTML,setXY:b.dom.setXY,contains:b.dom.contains,position:b.dom.position,trimNode:b.dom.trimNode,insertAfter:b.dom.insertAfter,insertBefore:b.dom.insertBefore,removeNode:b.dom.removeNode,replaceNode:b.dom.replaceNode,Ready:b.dom.ready,setStyle:b.dom.setStyle,setStyles:b.dom.setStyles,getStyle:b.dom.getStyle,addClassName:b.dom.addClassName,hasClassName:b.dom.hasClassName,removeClassName:b.dom.removeClassName,builder:b.dom.builder,cascadeNode:b.dom.cascadeNode,selector:b.dom.selector,sizzle:b.dom.sizzle,addEvent:b.evt.addEvent,custEvent:b.evt.custEvent,removeEvent:b.evt.removeEvent,fireEvent:b.evt.fireEvent,fixEvent:b.evt.fixEvent,getEvent:b.evt.getEvent,stopEvent:b.evt.stopEvent,delegatedEvent:b.evt.delegatedEvent,preventDefault:b.evt.preventDefault,hotKey:b.evt.hotKey,memorize:b.func.memorize,bind:b.func.bind,getType:b.func.getType,methodBefore:b.func.methodBefore,timedChunk:b.func.timedChunk,funcEmpty:b.func.empty,ajax:b.io.ajax,jsonp:b.io.jsonp,ijax:b.io.ijax,scriptLoader:b.io.scriptLoader,require:b.io.require,jsonInclude:b.json.include,jsonCompare:b.json.compare,jsonClone:b.json.clone,jsonToQuery:b.json.jsonToQuery,queryToJson:b.json.queryToJson,jsonToStr:b.json.jsonToStr,strToJson:b.json.strToJson,objIsEmpty:b.obj.isEmpty,beget:b.obj.beget,cascade:b.obj.cascade,objSup:b.obj.sup,parseParam:b.obj.parseParam,bLength:b.str.bLength,dbcToSbc:b.str.dbcToSbc,leftB:b.str.leftB,trim:b.str.trim,encodeHTML:b.str.encodeHTML,decodeHTML:b.str.decodeHTML,parseURL:b.str.parseURL,parseHTML:b.str.parseHTML,queryString:b.str.queryString,htmlToJson:b.util.htmlToJson,cookie:b.util.cookie,drag:b.util.drag,timer:b.util.timer,jobsM:b.util.jobsM,listener:b.util.listener,winSize:b.util.winSize,pageSize:b.util.pageSize,templet:b.util.templet,queue:b.util.queue,stack:b.util.stack,swf:b.util.swf,URL:b.util.URL,scrollPos:b.util.scrollPos,scrollTo:b.util.scrollTo,getUniqueKey:b.util.getUniqueKey,storage:b.util.storage,pageletM:b.util.pageletM};for(var a in c){STK.regShort(a,c[a])}})();

//index_type_banner-base.js^block/banner^index/top^
STK.register("kit.dom.parseDOM",function(a){return function(c){for(var b in c){if(c[b]&&(c[b].length==1)){c[b]=c[b][0]}}return c}});STK.register("common.app.slider",function(f){var b=f.core.evt.addEvent,a=f.core.dom.getStyle,e=f.core.dom.setStyle,d=f.core.dom.setStyles,c=f.core.dom.insertBefore,h=f.core.dom.insertAfter;return function(E,y){if(!E){throw"it need node for slider"}var s={};var u={step:1,speed:1000,show:3,auto:true,pause:2000,extraBtn:false,extraBtnEvt:true,vertical:false,continuous:true,controlsFade:true,screennum:2,carousel:false,beforeSlide:null,slideCbk:null,duration:500,hoverEvt:false,animationType:"linear"};var l=f.parseParam(u,y);var G={};G.prevBtn=E.prev;G.nextBtn=E.next;G.extraBtn=E.extrabtn;G.slider=E.slider;G.btnlist=[];G.dir="next";G.speed=l.speed;if(!G.slider){throw"no slider box found"}var A=G.slider.parentNode,p=false;if(A.style.display=="none"){p=true;A.style.visibility="hidden";A.style.display=""}var x=G.slider.getElementsByTagName("ul")[0],w=x.getElementsByTagName("li"),J=w.length;if(!J){return}var D=w[0].offsetWidth+parseInt(a(w[0],"marginLeft"))+parseInt(a(w[0],"marginRight")),B=w[0].offsetHeight+parseInt(a(w[0],"marginTop"))+parseInt(a(w[0],"marginBottom")),L=Math.floor((J-l.show)/l.step),q=0,m=true,o=false,r=J;if(p){A.style.visibility="visible";A.style.display="none"}e(G.slider,"overflow","hidden");e(x,"width",r*D+"px");if(!l.vertical){for(var I=0;I<J;I++){e(w[I],"float","left")}}var C=function(i,N,M){if(f.core.arr.isArray(i)){f.core.arr.foreach(i,function(O,P){b(O,N,M)})}else{b(i,N,M)}};if(G.prevBtn&&G.nextBtn){C(G.prevBtn,"click",function(){z("prev",true)});C(G.nextBtn,"click",function(){z("next",true)})}if(l.hoverEvt){b(G.slider,"mouseover",function(){F()});b(G.slider,"mouseout",function(){n()})}var t={set:function(N){if(G.btnlist.length===0){return}for(var M=0;M<G.btnlist.length;M++){f.removeClassName(G.btnlist[M],"current")}f.addClassName(G.btnlist[N],"current")},add:function(){var P=Math.floor(J/l.show);for(var O=0;O<P;O++){var M=f.C("a");M.href="javascript:;";M.innerHTML=parseInt(O+1);if(l.extraBtnEvt){M.onclick=(function(i){return function(){t.scroll(i)}})(O)}G.extraBtn.appendChild(M)}var N=f.sizzle("a",G.extraBtn);G.btnlist=N;t.set(q);return N},scroll:function(M){var i="next";if(M===q){return}else{if(M<q){q=M+1;q=l.carousel?1:q;i="prev"}else{q=M-1;q=l.carousel?0:q}}j(i,false)}};if(l.extraBtn&&(J/l.show>=l.screennum)){t.add()}if(l.controlsFade){if(J/l.show>=l.screennum){d(G.prevBtn,"display","");d(G.nextBtn,"display","")}else{d(G.prevBtn,"display","none");d(G.nextBtn,"display","none")}G.prevBtn.className="W_btn_c_disable btn_page_prev";G.nextBtn.className="W_btn_c btn_page_next"}var k=function(){};var K=f.core.ani.tween(x,{duration:l.duration,animationType:l.animationType,end:function(){o=false;if(l.auto){H()}l.slideCbk&&l.slideCbk({slider:x,dir:G.dir,itemWidth:D,index:q,items:w,item:w[q]})}});var v;var n=function(){if(l.auto){H()}};var F=function(){clearTimeout(v)};var H=function(i){i=i||"next";clearTimeout(v);v=setTimeout(function(){j(i,false)},G.speed)};var z=function(i,M){if(o){return}o=true;j(i);F()};n();function j(M){var N=q;switch(M){case"next":q=(q>=L)?(l.continuous?0:L):q+1;N=l.carousel?1:q;break;case"prev":q=(q<=0)?(l.continuous?L:0):q-1;N=l.carousel?0:q;break;case"first":N=q=0;break;case"last":N=q=L;break;default:break}G.dir=M;l.beforeSlide&&l.beforeSlide({slider:x,index:q,dir:G.dir,itemWidth:D,items:w,item:w[q]});var i;if(!l.vertical){i=(N*D*l.step*-1);K.play({marginLeft:i})}else{i=(N*B*l.step*-1);K.play({marginTop:i})}if(l.controlsFade){if(q==0){m=false;G.prevBtn.className="W_btn_c_disable btn_page_prev";G.nextBtn.className="W_btn_c btn_page_next"}else{if(q==L){m=false;G.prevBtn.className="W_btn_c btn_page_prev";G.nextBtn.className="W_btn_c_disable btn_page_next"}else{m=true;G.prevBtn.className="W_btn_c btn_page_prev";G.nextBtn.className="W_btn_c btn_page_next"}}}t.set(q)}};var g=function(){slider()};g();that.slider=slider;return that});STK.register("comp.app.focus",function(f){var b=f.core.dom.builder,a=f.core.dom.getStyle,e=f.core.dom.setStyle,d=f.core.dom.addClassName,g=f.core.dom.removeClassName,c=f.kit.dom.parseDOM;return function(k){var i,o;var n=function(){if(!k){throw"node is not defined"}};var h=function(){i=f.kit.dom.parseDOM(f.core.dom.builder(k).list)};var m=function(){o=f.core.evt.delegatedEvent(k);o.add("showdesc","mouseover",q);o.add("showdesc","mouseout",q)};var q=function(r){if(r.evt.type=="mouseover"){d(r.el,"column_selected")}else{g(r.el,"column_selected")}};var j=function(){var r=function(t,s){var u=t[0];var v=t[t.length-1];if(s=="next"){f.core.dom.insertAfter(u,v)}else{f.core.dom.insertBefore(v,u)}};f.common.app.slider(i,{auto:true,extraBtn:false,carousel:true,continuous:true,controlsFade:false,hoverEvt:true,show:1,step:1,speed:5000,beforeSlide:function(x){var w=x.slider,v=x.items,s=x.item,u=x.index,t=x.dir;if(t=="prev"){r(v,t);e(w,"marginLeft",-x.itemWidth+"px")}},slideCbk:function(x){var w=x.slider,v=x.items,s=x.item,u=x.index,t=x.dir;if(t=="next"){r(v,t);e(w,"marginLeft","0")}}})};var l=function(){j()};var p=function(){n();h();m();l()};p()}});STK.pageletM.register("pl.app.focus",function(b){var a=b.E("pl_app_focus");b.comp.app.focus(a)});STK.pageletM.start();

//actor-banner-Swiper 2.7.6^actor/index^
var Swiper=function(a,b){"use strict";function c(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function d(a){return"[object Array]"===Object.prototype.toString.apply(a)?!0:!1}function e(){var a=G-J;return b.freeMode&&(a=G-J),b.slidesPerView>D.slides.length&&!b.centeredSlides&&(a=0),0>a&&(a=0),a}function f(){function a(a){var c,d,e=function(){"undefined"!=typeof D&&null!==D&&(void 0!==D.imagesLoaded&&D.imagesLoaded++,D.imagesLoaded===D.imagesToLoad.length&&(D.reInit(),b.onImagesReady&&D.fireCallback(b.onImagesReady,D)))};a.complete?e():(d=a.currentSrc||a.getAttribute("src"),d?(c=new Image,c.onload=e,c.onerror=e,c.src=d):e())}var d=D.h.addEventListener,e="wrapper"===b.eventTarget?D.wrapper:D.container;if(D.browser.ie10||D.browser.ie11?(d(e,D.touchEvents.touchStart,p),d(document,D.touchEvents.touchMove,q),d(document,D.touchEvents.touchEnd,r)):(D.support.touch&&(d(e,"touchstart",p),d(e,"touchmove",q),d(e,"touchend",r)),b.simulateTouch&&(d(e,"mousedown",p),d(document,"mousemove",q),d(document,"mouseup",r))),b.autoResize&&d(window,"resize",D.resizeFix),g(),D._wheelEvent=!1,b.mousewheelControl){if(void 0!==document.onmousewheel&&(D._wheelEvent="mousewheel"),!D._wheelEvent)try{new WheelEvent("wheel"),D._wheelEvent="wheel"}catch(f){}D._wheelEvent||(D._wheelEvent="DOMMouseScroll"),D._wheelEvent&&d(D.container,D._wheelEvent,j)}if(b.keyboardControl&&d(document,"keydown",i),b.updateOnImagesReady){D.imagesToLoad=c("img",D.container);for(var h=0;h<D.imagesToLoad.length;h++)a(D.imagesToLoad[h])}}function g(){var a,d=D.h.addEventListener;if(b.preventLinks){var e=c("a",D.container);for(a=0;a<e.length;a++)d(e[a],"click",n)}if(b.releaseFormElements){var f=c("input, textarea, select",D.container);for(a=0;a<f.length;a++)d(f[a],D.touchEvents.touchStart,o,!0),D.support.touch&&b.simulateTouch&&d(f[a],"mousedown",o,!0)}if(b.onSlideClick)for(a=0;a<D.slides.length;a++)d(D.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<D.slides.length;a++)d(D.slides[a],D.touchEvents.touchStart,l)}function h(){var a,d=D.h.removeEventListener;if(b.onSlideClick)for(a=0;a<D.slides.length;a++)d(D.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<D.slides.length;a++)d(D.slides[a],D.touchEvents.touchStart,l);if(b.releaseFormElements){var e=c("input, textarea, select",D.container);for(a=0;a<e.length;a++)d(e[a],D.touchEvents.touchStart,o,!0),D.support.touch&&b.simulateTouch&&d(e[a],"mousedown",o,!0)}if(b.preventLinks){var f=c("a",D.container);for(a=0;a<f.length;a++)d(f[a],"click",n)}}function i(a){var b=a.keyCode||a.charCode;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey)){if(37===b||39===b||38===b||40===b){for(var c=!1,d=D.h.getOffset(D.container),e=D.h.windowScroll().left,f=D.h.windowScroll().top,g=D.h.windowWidth(),h=D.h.windowHeight(),i=[[d.left,d.top],[d.left+D.width,d.top],[d.left,d.top+D.height],[d.left+D.width,d.top+D.height]],j=0;j<i.length;j++){var k=i[j];k[0]>=e&&k[0]<=e+g&&k[1]>=f&&k[1]<=f+h&&(c=!0)}if(!c)return}N?((37===b||39===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),39===b&&D.swipeNext(),37===b&&D.swipePrev()):((38===b||40===b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),40===b&&D.swipeNext(),38===b&&D.swipePrev())}}function j(a){var c=D._wheelEvent,d=0;if(a.detail)d=-a.detail;else if("mousewheel"===c)if(b.mousewheelControlForceToAxis)if(N){if(!(Math.abs(a.wheelDeltaX)>Math.abs(a.wheelDeltaY)))return;d=a.wheelDeltaX}else{if(!(Math.abs(a.wheelDeltaY)>Math.abs(a.wheelDeltaX)))return;d=a.wheelDeltaY}else d=a.wheelDelta;else if("DOMMouseScroll"===c)d=-a.detail;else if("wheel"===c)if(b.mousewheelControlForceToAxis)if(N){if(!(Math.abs(a.deltaX)>Math.abs(a.deltaY)))return;d=-a.deltaX}else{if(!(Math.abs(a.deltaY)>Math.abs(a.deltaX)))return;d=-a.deltaY}else d=Math.abs(a.deltaX)>Math.abs(a.deltaY)?-a.deltaX:-a.deltaY;if(b.freeMode){var f=D.getWrapperTranslate()+d;if(f>0&&(f=0),f<-e()&&(f=-e()),D.setWrapperTransition(0),D.setWrapperTranslate(f),D.updateActiveSlide(f),0===f||f===-e())return}else(new Date).getTime()-V>60&&(0>d?D.swipeNext():D.swipePrev()),V=(new Date).getTime();return b.autoplay&&D.stopAutoplay(!0),a.preventDefault?a.preventDefault():a.returnValue=!1,!1}function k(a){D.allowSlideClick&&(m(a),D.fireCallback(b.onSlideClick,D,a))}function l(a){m(a),D.fireCallback(b.onSlideTouch,D,a)}function m(a){if(a.currentTarget)D.clickedSlide=a.currentTarget;else{var c=a.srcElement;do{if(c.className.indexOf(b.slideClass)>-1)break;c=c.parentNode}while(c);D.clickedSlide=c}D.clickedSlideIndex=D.slides.indexOf(D.clickedSlide),D.clickedSlideLoopIndex=D.clickedSlideIndex-(D.loopedSlides||0)}function n(a){return D.allowLinks?void 0:(a.preventDefault?a.preventDefault():a.returnValue=!1,b.preventLinksPropagation&&"stopPropagation"in a&&a.stopPropagation(),!1)}function o(a){return a.stopPropagation?a.stopPropagation():a.returnValue=!1,!1}function p(a){if(b.preventLinks&&(D.allowLinks=!0),D.isTouched||b.onlyExternal)return!1;var c=a.target||a.srcElement;document.activeElement&&document.activeElement!==document.body&&document.activeElement!==c&&document.activeElement.blur();var d="input select textarea".split(" ");if(b.noSwiping&&c&&t(c))return!1;if(_=!1,D.isTouched=!0,$="touchstart"===a.type,!$&&"which"in a&&3===a.which)return D.isTouched=!1,!1;if(!$||1===a.targetTouches.length){D.callPlugins("onTouchStartBegin"),!$&&!D.isAndroid&&d.indexOf(c.tagName.toLowerCase())<0&&(a.preventDefault?a.preventDefault():a.returnValue=!1);var e=$?a.targetTouches[0].pageX:a.pageX||a.clientX,f=$?a.targetTouches[0].pageY:a.pageY||a.clientY;D.touches.startX=D.touches.currentX=e,D.touches.startY=D.touches.currentY=f,D.touches.start=D.touches.current=N?e:f,D.setWrapperTransition(0),D.positions.start=D.positions.current=D.getWrapperTranslate(),D.setWrapperTranslate(D.positions.start),D.times.start=(new Date).getTime(),I=void 0,b.moveStartThreshold>0&&(X=!1),b.onTouchStart&&D.fireCallback(b.onTouchStart,D,a),D.callPlugins("onTouchStartEnd")}}function q(a){if(D.isTouched&&!b.onlyExternal&&(!$||"mousemove"!==a.type)){var c=$?a.targetTouches[0].pageX:a.pageX||a.clientX,d=$?a.targetTouches[0].pageY:a.pageY||a.clientY;if("undefined"==typeof I&&N&&(I=!!(I||Math.abs(d-D.touches.startY)>Math.abs(c-D.touches.startX))),"undefined"!=typeof I||N||(I=!!(I||Math.abs(d-D.touches.startY)<Math.abs(c-D.touches.startX))),I)return void(D.isTouched=!1);if(N){if(!b.swipeToNext&&c<D.touches.startX||!b.swipeToPrev&&c>D.touches.startX)return}else if(!b.swipeToNext&&d<D.touches.startY||!b.swipeToPrev&&d>D.touches.startY)return;if(a.assignedToSwiper)return void(D.isTouched=!1);if(a.assignedToSwiper=!0,b.preventLinks&&(D.allowLinks=!1),b.onSlideClick&&(D.allowSlideClick=!1),b.autoplay&&D.stopAutoplay(!0),!$||1===a.touches.length){if(D.isMoved||(D.callPlugins("onTouchMoveStart"),b.loop&&(D.fixLoop(),D.positions.start=D.getWrapperTranslate()),b.onTouchMoveStart&&D.fireCallback(b.onTouchMoveStart,D)),D.isMoved=!0,a.preventDefault?a.preventDefault():a.returnValue=!1,D.touches.current=N?c:d,D.positions.current=(D.touches.current-D.touches.start)*b.touchRatio+D.positions.start,D.positions.current>0&&b.onResistanceBefore&&D.fireCallback(b.onResistanceBefore,D,D.positions.current),D.positions.current<-e()&&b.onResistanceAfter&&D.fireCallback(b.onResistanceAfter,D,Math.abs(D.positions.current+e())),b.resistance&&"100%"!==b.resistance){var f;if(D.positions.current>0&&(f=1-D.positions.current/J/2,D.positions.current=.5>f?J/2:D.positions.current*f),D.positions.current<-e()){var g=(D.touches.current-D.touches.start)*b.touchRatio+(e()+D.positions.start);f=(J+g)/J;var h=D.positions.current-g*(1-f)/2,i=-e()-J/2;D.positions.current=i>h||0>=f?i:h}}if(b.resistance&&"100%"===b.resistance&&(D.positions.current>0&&(!b.freeMode||b.freeModeFluid)&&(D.positions.current=0),D.positions.current<-e()&&(!b.freeMode||b.freeModeFluid)&&(D.positions.current=-e())),!b.followFinger)return;if(b.moveStartThreshold)if(Math.abs(D.touches.current-D.touches.start)>b.moveStartThreshold||X){if(!X)return X=!0,void(D.touches.start=D.touches.current);D.setWrapperTranslate(D.positions.current)}else D.positions.current=D.positions.start;else D.setWrapperTranslate(D.positions.current);return(b.freeMode||b.watchActiveIndex)&&D.updateActiveSlide(D.positions.current),b.grabCursor&&(D.container.style.cursor="move",D.container.style.cursor="grabbing",D.container.style.cursor="-moz-grabbin",D.container.style.cursor="-webkit-grabbing"),Y||(Y=D.touches.current),Z||(Z=(new Date).getTime()),D.velocity=(D.touches.current-Y)/((new Date).getTime()-Z)/2,Math.abs(D.touches.current-Y)<2&&(D.velocity=0),Y=D.touches.current,Z=(new Date).getTime(),D.callPlugins("onTouchMoveEnd"),b.onTouchMove&&D.fireCallback(b.onTouchMove,D,a),!1}}}function r(a){if(I&&D.swipeReset(),!b.onlyExternal&&D.isTouched){D.isTouched=!1,b.grabCursor&&(D.container.style.cursor="move",D.container.style.cursor="grab",D.container.style.cursor="-moz-grab",D.container.style.cursor="-webkit-grab"),D.positions.current||0===D.positions.current||(D.positions.current=D.positions.start),b.followFinger&&D.setWrapperTranslate(D.positions.current),D.times.end=(new Date).getTime(),D.touches.diff=D.touches.current-D.touches.start,D.touches.abs=Math.abs(D.touches.diff),D.positions.diff=D.positions.current-D.positions.start,D.positions.abs=Math.abs(D.positions.diff);var c=D.positions.diff,d=D.positions.abs,f=D.times.end-D.times.start;5>d&&300>f&&D.allowLinks===!1&&(b.freeMode||0===d||D.swipeReset(),b.preventLinks&&(D.allowLinks=!0),b.onSlideClick&&(D.allowSlideClick=!0)),setTimeout(function(){"undefined"!=typeof D&&null!==D&&(b.preventLinks&&(D.allowLinks=!0),b.onSlideClick&&(D.allowSlideClick=!0))},100);var g=e();if(!D.isMoved&&b.freeMode)return D.isMoved=!1,b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd");if(!D.isMoved||D.positions.current>0||D.positions.current<-g)return D.swipeReset(),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd");if(D.isMoved=!1,b.freeMode){if(b.freeModeFluid){var h,i=1e3*b.momentumRatio,j=D.velocity*i,k=D.positions.current+j,l=!1,m=20*Math.abs(D.velocity)*b.momentumBounceRatio;-g>k&&(b.momentumBounce&&D.support.transitions?(-m>k+g&&(k=-g-m),h=-g,l=!0,_=!0):k=-g),k>0&&(b.momentumBounce&&D.support.transitions?(k>m&&(k=m),h=0,l=!0,_=!0):k=0),0!==D.velocity&&(i=Math.abs((k-D.positions.current)/D.velocity)),D.setWrapperTranslate(k),D.setWrapperTransition(i),b.momentumBounce&&l&&D.wrapperTransitionEnd(function(){_&&(b.onMomentumBounce&&D.fireCallback(b.onMomentumBounce,D),D.callPlugins("onMomentumBounce"),D.setWrapperTranslate(h),D.setWrapperTransition(300))}),D.updateActiveSlide(k)}return(!b.freeModeFluid||f>=300)&&D.updateActiveSlide(D.positions.current),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),void D.callPlugins("onTouchEnd")}H=0>c?"toNext":"toPrev","toNext"===H&&300>=f&&(30>d||!b.shortSwipes?D.swipeReset():D.swipeNext(!0,!0)),"toPrev"===H&&300>=f&&(30>d||!b.shortSwipes?D.swipeReset():D.swipePrev(!0,!0));var n=0;if("auto"===b.slidesPerView){for(var o,p=Math.abs(D.getWrapperTranslate()),q=0,r=0;r<D.slides.length;r++)if(o=N?D.slides[r].getWidth(!0,b.roundLengths):D.slides[r].getHeight(!0,b.roundLengths),q+=o,q>p){n=o;break}n>J&&(n=J)}else n=F*b.slidesPerView;"toNext"===H&&f>300&&(d>=n*b.longSwipesRatio?D.swipeNext(!0,!0):D.swipeReset()),"toPrev"===H&&f>300&&(d>=n*b.longSwipesRatio?D.swipePrev(!0,!0):D.swipeReset()),b.onTouchEnd&&D.fireCallback(b.onTouchEnd,D,a),D.callPlugins("onTouchEnd")}}function s(a,b){return a&&a.getAttribute("class")&&a.getAttribute("class").indexOf(b)>-1}function t(a){var c=!1;do s(a,b.noSwipingClass)&&(c=!0),a=a.parentElement;while(!c&&a.parentElement&&!s(a,b.wrapperClass));return!c&&s(a,b.wrapperClass)&&s(a,b.noSwipingClass)&&(c=!0),c}function u(a,b){var c,d=document.createElement("div");return d.innerHTML=b,c=d.firstChild,c.className+=" "+a,c.outerHTML}function v(a,c,d){function e(){var f=+new Date,l=f-g;h+=i*l/(1e3/60),k="toNext"===j?h>a:a>h,k?(D.setWrapperTranslate(Math.ceil(h)),D._DOMAnimating=!0,window.setTimeout(function(){e()},1e3/60)):(b.onSlideChangeEnd&&("to"===c?d.runCallbacks===!0&&D.fireCallback(b.onSlideChangeEnd,D,j):D.fireCallback(b.onSlideChangeEnd,D,j)),D.setWrapperTranslate(a),D._DOMAnimating=!1)}var f="to"===c&&d.speed>=0?d.speed:b.speed,g=+new Date;if(D.support.transitions||!b.DOMAnimation)D.setWrapperTranslate(a),D.setWrapperTransition(f);else{var h=D.getWrapperTranslate(),i=Math.ceil((a-h)/f*(1e3/60)),j=h>a?"toNext":"toPrev",k="toNext"===j?h>a:a>h;if(D._DOMAnimating)return;e()}D.updateActiveSlide(a),b.onSlideNext&&"next"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlideNext,D,a),b.onSlidePrev&&"prev"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlidePrev,D,a),b.onSlideReset&&"reset"===c&&d.runCallbacks===!0&&D.fireCallback(b.onSlideReset,D,a),"next"!==c&&"prev"!==c&&"to"!==c||d.runCallbacks!==!0||w(c)}function w(a){if(D.callPlugins("onSlideChangeStart"),b.onSlideChangeStart)if(b.queueStartCallbacks&&D.support.transitions){if(D._queueStartCallbacks)return;D._queueStartCallbacks=!0,D.fireCallback(b.onSlideChangeStart,D,a),D.wrapperTransitionEnd(function(){D._queueStartCallbacks=!1})}else D.fireCallback(b.onSlideChangeStart,D,a);if(b.onSlideChangeEnd)if(D.support.transitions)if(b.queueEndCallbacks){if(D._queueEndCallbacks)return;D._queueEndCallbacks=!0,D.wrapperTransitionEnd(function(c){D.fireCallback(b.onSlideChangeEnd,c,a)})}else D.wrapperTransitionEnd(function(c){D.fireCallback(b.onSlideChangeEnd,c,a)});else b.DOMAnimation||setTimeout(function(){D.fireCallback(b.onSlideChangeEnd,D,a)},10)}function x(){var a=D.paginationButtons;if(a)for(var b=0;b<a.length;b++)D.h.removeEventListener(a[b],"click",z)}function y(){var a=D.paginationButtons;if(a)for(var b=0;b<a.length;b++)D.h.addEventListener(a[b],"click",z)}function z(a){for(var c,d=a.target||a.srcElement,e=D.paginationButtons,f=0;f<e.length;f++)d===e[f]&&(c=f);b.autoplay&&D.stopAutoplay(!0),D.swipeTo(c)}function A(){ab=setTimeout(function(){b.loop?(D.fixLoop(),D.swipeNext(!0,!0)):D.swipeNext(!0,!0)||(b.autoplayStopOnLast?(clearTimeout(ab),ab=void 0):D.swipeTo(0)),D.wrapperTransitionEnd(function(){"undefined"!=typeof ab&&A()})},b.autoplay)}function B(){D.calcSlides(),b.loader.slides.length>0&&0===D.slides.length&&D.loadSlides(),b.loop&&D.createLoop(),D.init(),f(),b.pagination&&D.createPagination(!0),b.loop||b.initialSlide>0?D.swipeTo(b.initialSlide,0,!1):D.updateActiveSlide(0),b.autoplay&&D.startAutoplay(),D.centerIndex=D.activeIndex,b.onSwiperCreated&&D.fireCallback(b.onSwiperCreated,D),D.callPlugins("onSwiperCreated")}if(!document.body.outerHTML&&document.body.__defineGetter__&&HTMLElement){var C=HTMLElement.prototype;C.__defineGetter__&&C.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}if(window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"===b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),(document.querySelectorAll||window.jQuery)&&"undefined"!=typeof a&&(a.nodeType||0!==c(a).length)){var D=this;D.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0},D.positions={start:0,abs:0,diff:0,current:0},D.times={start:0,end:0},D.id=(new Date).getTime(),D.container=a.nodeType?a:c(a)[0],D.isTouched=!1,D.isMoved=!1,D.activeIndex=0,D.centerIndex=0,D.activeLoaderIndex=0,D.activeLoopIndex=0,D.previousIndex=null,D.velocity=0,D.snapGrid=[],D.slidesGrid=[],D.imagesToLoad=[],D.imagesLoaded=0,D.wrapperLeft=0,D.wrapperRight=0,D.wrapperTop=0,D.wrapperBottom=0,D.isAndroid=navigator.userAgent.toLowerCase().indexOf("android")>=0;var E,F,G,H,I,J,K={eventTarget:"wrapper",mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,slidesPerViewFit:!0,simulateTouch:!0,followFinger:!0,shortSwipes:!0,longSwipesRatio:.5,moveStartThreshold:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,preventLinksPropagation:!1,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelControlForceToAxis:!1,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,loop:!1,loopAdditionalSlides:0,roundLengths:!1,calculateHeight:!1,cssWidthAndHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},swipeToPrev:!0,swipeToNext:!0,slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var L in K)if(L in b&&"object"==typeof b[L])for(var M in K[L])M in b[L]||(b[L][M]=K[L][M]);else L in b||(b[L]=K[L]);D.params=b,b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0),b.loop&&(b.resistance="100%");var N="horizontal"===b.mode,O=["mousedown","mousemove","mouseup"];D.browser.ie10&&(O=["MSPointerDown","MSPointerMove","MSPointerUp"]),D.browser.ie11&&(O=["pointerdown","pointermove","pointerup"]),D.touchEvents={touchStart:D.support.touch||!b.simulateTouch?"touchstart":O[0],touchMove:D.support.touch||!b.simulateTouch?"touchmove":O[1],touchEnd:D.support.touch||!b.simulateTouch?"touchend":O[2]};for(var P=D.container.childNodes.length-1;P>=0;P--)if(D.container.childNodes[P].className)for(var Q=D.container.childNodes[P].className.split(/\s+/),R=0;R<Q.length;R++)Q[R]===b.wrapperClass&&(E=D.container.childNodes[P]);D.wrapper=E,D._extendSwiperSlide=function(a){return a.append=function(){return b.loop?a.insertAfter(D.slides.length-D.loopedSlides):(D.wrapper.appendChild(a),D.reInit()),a},a.prepend=function(){return b.loop?(D.wrapper.insertBefore(a,D.slides[D.loopedSlides]),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):D.wrapper.insertBefore(a,D.wrapper.firstChild),D.reInit(),a},a.insertAfter=function(c){if("undefined"==typeof c)return!1;var d;return b.loop?(d=D.slides[c+1+D.loopedSlides],d?D.wrapper.insertBefore(a,d):D.wrapper.appendChild(a),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):(d=D.slides[c+1],D.wrapper.insertBefore(a,d)),D.reInit(),a},a.clone=function(){return D._extendSwiperSlide(a.cloneNode(!0))},a.remove=function(){D.wrapper.removeChild(a),D.reInit()},a.html=function(b){return"undefined"==typeof b?a.innerHTML:(a.innerHTML=b,a)},a.index=function(){for(var b,c=D.slides.length-1;c>=0;c--)a===D.slides[c]&&(b=c);return b},a.isActive=function(){return a.index()===D.activeIndex?!0:!1},a.swiperSlideDataStorage||(a.swiperSlideDataStorage={}),a.getData=function(b){return a.swiperSlideDataStorage[b]},a.setData=function(b,c){return a.swiperSlideDataStorage[b]=c,a},a.data=function(b,c){return"undefined"==typeof c?a.getAttribute("data-"+b):(a.setAttribute("data-"+b,c),a)},a.getWidth=function(b,c){return D.h.getWidth(a,b,c)},a.getHeight=function(b,c){return D.h.getHeight(a,b,c)},a.getOffset=function(){return D.h.getOffset(a)},a},D.calcSlides=function(a){var c=D.slides?D.slides.length:!1;D.slides=[],D.displaySlides=[];for(var d=0;d<D.wrapper.childNodes.length;d++)if(D.wrapper.childNodes[d].className)for(var e=D.wrapper.childNodes[d].className,f=e.split(/\s+/),i=0;i<f.length;i++)f[i]===b.slideClass&&D.slides.push(D.wrapper.childNodes[d]);for(d=D.slides.length-1;d>=0;d--)D._extendSwiperSlide(D.slides[d]);c!==!1&&(c!==D.slides.length||a)&&(h(),g(),D.updateActiveSlide(),D.params.pagination&&D.createPagination(),D.callPlugins("numberOfSlidesChanged"))},D.createSlide=function(a,c,d){c=c||D.params.slideClass,d=d||b.slideElement;var e=document.createElement(d);return e.innerHTML=a||"",e.className=c,D._extendSwiperSlide(e)},D.appendSlide=function(a,b,c){return a?a.nodeType?D._extendSwiperSlide(a).append():D.createSlide(a,b,c).append():void 0},D.prependSlide=function(a,b,c){return a?a.nodeType?D._extendSwiperSlide(a).prepend():D.createSlide(a,b,c).prepend():void 0},D.insertSlideAfter=function(a,b,c,d){return"undefined"==typeof a?!1:b.nodeType?D._extendSwiperSlide(b).insertAfter(a):D.createSlide(b,c,d).insertAfter(a)},D.removeSlide=function(a){if(D.slides[a]){if(b.loop){if(!D.slides[a+D.loopedSlides])return!1;D.slides[a+D.loopedSlides].remove(),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()}else D.slides[a].remove();return!0}return!1},D.removeLastSlide=function(){return D.slides.length>0?(b.loop?(D.slides[D.slides.length-1-D.loopedSlides].remove(),D.removeLoopedSlides(),D.calcSlides(),D.createLoop()):D.slides[D.slides.length-1].remove(),!0):!1},D.removeAllSlides=function(){for(var a=D.slides.length,b=D.slides.length-1;b>=0;b--)D.slides[b].remove(),b===a-1&&D.setWrapperTranslate(0)},D.getSlide=function(a){return D.slides[a]},D.getLastSlide=function(){return D.slides[D.slides.length-1]},D.getFirstSlide=function(){return D.slides[0]},D.activeSlide=function(){return D.slides[D.activeIndex]},D.fireCallback=function(){var a=arguments[0];if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)"function"==typeof a[c]&&a[c](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);else"[object String]"===Object.prototype.toString.call(a)?b["on"+a]&&D.fireCallback(b["on"+a],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]):a(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},D.addCallback=function(a,b){var c,e=this;return e.params["on"+a]?d(this.params["on"+a])?this.params["on"+a].push(b):"function"==typeof this.params["on"+a]?(c=this.params["on"+a],this.params["on"+a]=[],this.params["on"+a].push(c),this.params["on"+a].push(b)):void 0:(this.params["on"+a]=[],this.params["on"+a].push(b))},D.removeCallbacks=function(a){D.params["on"+a]&&(D.params["on"+a]=null)};var S=[];for(var T in D.plugins)if(b[T]){var U=D.plugins[T](D,b[T]);U&&S.push(U)}D.callPlugins=function(a,b){b||(b={});for(var c=0;c<S.length;c++)a in S[c]&&S[c][a](b)},!D.browser.ie10&&!D.browser.ie11||b.onlyExternal||D.wrapper.classList.add("swiper-wp8-"+(N?"horizontal":"vertical")),b.freeMode&&(D.container.className+=" swiper-free-mode"),D.initialized=!1,D.init=function(a,c){var d=D.h.getWidth(D.container,!1,b.roundLengths),e=D.h.getHeight(D.container,!1,b.roundLengths);if(d!==D.width||e!==D.height||a){D.width=d,D.height=e;var f,g,h,i,j,k,l;J=N?d:e;var m=D.wrapper;if(a&&D.calcSlides(c),"auto"===b.slidesPerView){var n=0,o=0;b.slidesOffset>0&&(m.style.paddingLeft="",m.style.paddingRight="",m.style.paddingTop="",m.style.paddingBottom=""),m.style.width="",m.style.height="",b.offsetPxBefore>0&&(N?D.wrapperLeft=b.offsetPxBefore:D.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(N?D.wrapperRight=b.offsetPxAfter:D.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(N?(D.wrapperLeft=(J-this.slides[0].getWidth(!0,b.roundLengths))/2,D.wrapperRight=(J-D.slides[D.slides.length-1].getWidth(!0,b.roundLengths))/2):(D.wrapperTop=(J-D.slides[0].getHeight(!0,b.roundLengths))/2,D.wrapperBottom=(J-D.slides[D.slides.length-1].getHeight(!0,b.roundLengths))/2)),N?(D.wrapperLeft>=0&&(m.style.paddingLeft=D.wrapperLeft+"px"),D.wrapperRight>=0&&(m.style.paddingRight=D.wrapperRight+"px")):(D.wrapperTop>=0&&(m.style.paddingTop=D.wrapperTop+"px"),D.wrapperBottom>=0&&(m.style.paddingBottom=D.wrapperBottom+"px")),k=0;var p=0;for(D.snapGrid=[],D.slidesGrid=[],h=0,l=0;l<D.slides.length;l++){f=D.slides[l].getWidth(!0,b.roundLengths),g=D.slides[l].getHeight(!0,b.roundLengths),b.calculateHeight&&(h=Math.max(h,g));var q=N?f:g;if(b.centeredSlides){var r=l===D.slides.length-1?0:D.slides[l+1].getWidth(!0,b.roundLengths),s=l===D.slides.length-1?0:D.slides[l+1].getHeight(!0,b.roundLengths),t=N?r:s;if(q>J){if(b.slidesPerViewFit)D.snapGrid.push(k+D.wrapperLeft),D.snapGrid.push(k+q-J+D.wrapperLeft);else for(var u=0;u<=Math.floor(q/(J+D.wrapperLeft));u++)D.snapGrid.push(0===u?k+D.wrapperLeft:k+D.wrapperLeft+J*u);D.slidesGrid.push(k+D.wrapperLeft)}else D.snapGrid.push(p),D.slidesGrid.push(p);p+=q/2+t/2}else{if(q>J)if(b.slidesPerViewFit)D.snapGrid.push(k),D.snapGrid.push(k+q-J);else if(0!==J)for(var v=0;v<=Math.floor(q/J);v++)D.snapGrid.push(k+J*v);else D.snapGrid.push(k);else D.snapGrid.push(k);D.slidesGrid.push(k)}k+=q,n+=f,o+=g}b.calculateHeight&&(D.height=h),N?(G=n+D.wrapperRight+D.wrapperLeft,b.cssWidthAndHeight&&"height"!==b.cssWidthAndHeight||(m.style.width=n+"px"),b.cssWidthAndHeight&&"width"!==b.cssWidthAndHeight||(m.style.height=D.height+"px")):(b.cssWidthAndHeight&&"height"!==b.cssWidthAndHeight||(m.style.width=D.width+"px"),b.cssWidthAndHeight&&"width"!==b.cssWidthAndHeight||(m.style.height=o+"px"),G=o+D.wrapperTop+D.wrapperBottom)}else if(b.scrollContainer)m.style.width="",m.style.height="",i=D.slides[0].getWidth(!0,b.roundLengths),j=D.slides[0].getHeight(!0,b.roundLengths),G=N?i:j,m.style.width=i+"px",m.style.height=j+"px",F=N?i:j;else{if(b.calculateHeight){for(h=0,j=0,N||(D.container.style.height=""),m.style.height="",l=0;l<D.slides.length;l++)D.slides[l].style.height="",h=Math.max(D.slides[l].getHeight(!0),h),N||(j+=D.slides[l].getHeight(!0));g=h,D.height=g,N?j=g:(J=g,D.container.style.height=J+"px")}else g=N?D.height:D.height/b.slidesPerView,b.roundLengths&&(g=Math.ceil(g)),j=N?D.height:D.slides.length*g;for(f=N?D.width/b.slidesPerView:D.width,b.roundLengths&&(f=Math.ceil(f)),i=N?D.slides.length*f:D.width,F=N?f:g,b.offsetSlidesBefore>0&&(N?D.wrapperLeft=F*b.offsetSlidesBefore:D.wrapperTop=F*b.offsetSlidesBefore),b.offsetSlidesAfter>0&&(N?D.wrapperRight=F*b.offsetSlidesAfter:D.wrapperBottom=F*b.offsetSlidesAfter),b.offsetPxBefore>0&&(N?D.wrapperLeft=b.offsetPxBefore:D.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(N?D.wrapperRight=b.offsetPxAfter:D.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(N?(D.wrapperLeft=(J-F)/2,D.wrapperRight=(J-F)/2):(D.wrapperTop=(J-F)/2,D.wrapperBottom=(J-F)/2)),N?(D.wrapperLeft>0&&(m.style.paddingLeft=D.wrapperLeft+"px"),D.wrapperRight>0&&(m.style.paddingRight=D.wrapperRight+"px")):(D.wrapperTop>0&&(m.style.paddingTop=D.wrapperTop+"px"),D.wrapperBottom>0&&(m.style.paddingBottom=D.wrapperBottom+"px")),G=N?i+D.wrapperRight+D.wrapperLeft:j+D.wrapperTop+D.wrapperBottom,parseFloat(i)>0&&(!b.cssWidthAndHeight||"height"===b.cssWidthAndHeight)&&(m.style.width=i+"px"),parseFloat(j)>0&&(!b.cssWidthAndHeight||"width"===b.cssWidthAndHeight)&&(m.style.height=j+"px"),k=0,D.snapGrid=[],D.slidesGrid=[],l=0;l<D.slides.length;l++)D.snapGrid.push(k),D.slidesGrid.push(k),k+=F,parseFloat(f)>0&&(!b.cssWidthAndHeight||"height"===b.cssWidthAndHeight)&&(D.slides[l].style.width=f+"px"),parseFloat(g)>0&&(!b.cssWidthAndHeight||"width"===b.cssWidthAndHeight)&&(D.slides[l].style.height=g+"px")}D.initialized?(D.callPlugins("onInit"),b.onInit&&D.fireCallback(b.onInit,D)):(D.callPlugins("onFirstInit"),b.onFirstInit&&D.fireCallback(b.onFirstInit,D)),D.initialized=!0}},D.reInit=function(a){D.init(!0,a)},D.resizeFix=function(a){D.callPlugins("beforeResizeFix"),D.init(b.resizeReInit||a),b.freeMode?D.getWrapperTranslate()<-e()&&(D.setWrapperTransition(0),D.setWrapperTranslate(-e())):(D.swipeTo(b.loop?D.activeLoopIndex:D.activeIndex,0,!1),b.autoplay&&(D.support.transitions&&"undefined"!=typeof ab?"undefined"!=typeof ab&&(clearTimeout(ab),ab=void 0,D.startAutoplay()):"undefined"!=typeof bb&&(clearInterval(bb),bb=void 0,D.startAutoplay()))),D.callPlugins("afterResizeFix")},D.destroy=function(a){var c=D.h.removeEventListener,d="wrapper"===b.eventTarget?D.wrapper:D.container;if(D.browser.ie10||D.browser.ie11?(c(d,D.touchEvents.touchStart,p),c(document,D.touchEvents.touchMove,q),c(document,D.touchEvents.touchEnd,r)):(D.support.touch&&(c(d,"touchstart",p),c(d,"touchmove",q),c(d,"touchend",r)),b.simulateTouch&&(c(d,"mousedown",p),c(document,"mousemove",q),c(document,"mouseup",r))),b.autoResize&&c(window,"resize",D.resizeFix),h(),b.paginationClickable&&x(),b.mousewheelControl&&D._wheelEvent&&c(D.container,D._wheelEvent,j),b.keyboardControl&&c(document,"keydown",i),b.autoplay&&D.stopAutoplay(),a){D.wrapper.removeAttribute("style");for(var e=0;e<D.slides.length;e++)D.slides[e].removeAttribute("style")}D.callPlugins("onDestroy"),window.jQuery&&window.jQuery(D.container).data("swiper")&&window.jQuery(D.container).removeData("swiper"),window.Zepto&&window.Zepto(D.container).data("swiper")&&window.Zepto(D.container).removeData("swiper"),D=null},D.disableKeyboardControl=function(){b.keyboardControl=!1,D.h.removeEventListener(document,"keydown",i)},D.enableKeyboardControl=function(){b.keyboardControl=!0,D.h.addEventListener(document,"keydown",i)};var V=(new Date).getTime();if(D.disableMousewheelControl=function(){return D._wheelEvent?(b.mousewheelControl=!1,D.h.removeEventListener(D.container,D._wheelEvent,j),!0):!1},D.enableMousewheelControl=function(){return D._wheelEvent?(b.mousewheelControl=!0,D.h.addEventListener(D.container,D._wheelEvent,j),!0):!1},b.grabCursor){var W=D.container.style;W.cursor="move",W.cursor="grab",W.cursor="-moz-grab",W.cursor="-webkit-grab"}D.allowSlideClick=!0,D.allowLinks=!0;var X,Y,Z,$=!1,_=!0;D.swipeNext=function(a,c){"undefined"==typeof a&&(a=!0),!c&&b.loop&&D.fixLoop(),!c&&b.autoplay&&D.stopAutoplay(!0),D.callPlugins("onSwipeNext");var d=D.getWrapperTranslate().toFixed(2),f=d;if("auto"===b.slidesPerView){for(var g=0;g<D.snapGrid.length;g++)if(-d>=D.snapGrid[g].toFixed(2)&&-d<D.snapGrid[g+1].toFixed(2)){f=-D.snapGrid[g+1];break}}else{var h=F*b.slidesPerGroup;f=-(Math.floor(Math.abs(d)/Math.floor(h))*h+h)}return f<-e()&&(f=-e()),f===d?!1:(v(f,"next",{runCallbacks:a}),!0)},D.swipePrev=function(a,c){"undefined"==typeof a&&(a=!0),!c&&b.loop&&D.fixLoop(),!c&&b.autoplay&&D.stopAutoplay(!0),D.callPlugins("onSwipePrev");var d,e=Math.ceil(D.getWrapperTranslate());if("auto"===b.slidesPerView){d=0;for(var f=1;f<D.snapGrid.length;f++){if(-e===D.snapGrid[f]){d=-D.snapGrid[f-1];break}if(-e>D.snapGrid[f]&&-e<D.snapGrid[f+1]){d=-D.snapGrid[f];break}}}else{var g=F*b.slidesPerGroup;d=-(Math.ceil(-e/g)-1)*g}return d>0&&(d=0),d===e?!1:(v(d,"prev",{runCallbacks:a}),!0)},D.swipeReset=function(a){"undefined"==typeof a&&(a=!0),D.callPlugins("onSwipeReset");{var c,d=D.getWrapperTranslate(),f=F*b.slidesPerGroup;-e()}if("auto"===b.slidesPerView){c=0;for(var g=0;g<D.snapGrid.length;g++){if(-d===D.snapGrid[g])return;if(-d>=D.snapGrid[g]&&-d<D.snapGrid[g+1]){c=D.positions.diff>0?-D.snapGrid[g+1]:-D.snapGrid[g];break}}-d>=D.snapGrid[D.snapGrid.length-1]&&(c=-D.snapGrid[D.snapGrid.length-1]),d<=-e()&&(c=-e())}else c=0>d?Math.round(d/f)*f:0,d<=-e()&&(c=-e());return b.scrollContainer&&(c=0>d?d:0),c<-e()&&(c=-e()),b.scrollContainer&&J>F&&(c=0),c===d?!1:(v(c,"reset",{runCallbacks:a}),!0)},D.swipeTo=function(a,c,d){a=parseInt(a,10),D.callPlugins("onSwipeTo",{index:a,speed:c}),b.loop&&(a+=D.loopedSlides);var f=D.getWrapperTranslate();if(!(!isFinite(a)||a>D.slides.length-1||0>a)){var g;return g="auto"===b.slidesPerView?-D.slidesGrid[a]:-a*F,g<-e()&&(g=-e()),g===f?!1:("undefined"==typeof d&&(d=!0),v(g,"to",{index:a,speed:c,runCallbacks:d}),!0)}},D._queueStartCallbacks=!1,D._queueEndCallbacks=!1,D.updateActiveSlide=function(a){if(D.initialized&&0!==D.slides.length){D.previousIndex=D.activeIndex,"undefined"==typeof a&&(a=D.getWrapperTranslate()),a>0&&(a=0);var c;if("auto"===b.slidesPerView){if(D.activeIndex=D.slidesGrid.indexOf(-a),D.activeIndex<0){for(c=0;c<D.slidesGrid.length-1&&!(-a>D.slidesGrid[c]&&-a<D.slidesGrid[c+1]);c++);var d=Math.abs(D.slidesGrid[c]+a),e=Math.abs(D.slidesGrid[c+1]+a);
D.activeIndex=e>=d?c:c+1}}else D.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-a/F);if(D.activeIndex===D.slides.length&&(D.activeIndex=D.slides.length-1),D.activeIndex<0&&(D.activeIndex=0),D.slides[D.activeIndex]){if(D.calcVisibleSlides(a),D.support.classList){var f;for(c=0;c<D.slides.length;c++)f=D.slides[c],f.classList.remove(b.slideActiveClass),D.visibleSlides.indexOf(f)>=0?f.classList.add(b.slideVisibleClass):f.classList.remove(b.slideVisibleClass);D.slides[D.activeIndex].classList.add(b.slideActiveClass)}else{var g=new RegExp("\\s*"+b.slideActiveClass),h=new RegExp("\\s*"+b.slideVisibleClass);for(c=0;c<D.slides.length;c++)D.slides[c].className=D.slides[c].className.replace(g,"").replace(h,""),D.visibleSlides.indexOf(D.slides[c])>=0&&(D.slides[c].className+=" "+b.slideVisibleClass);D.slides[D.activeIndex].className+=" "+b.slideActiveClass}if(b.loop){var i=D.loopedSlides;D.activeLoopIndex=D.activeIndex-i,D.activeLoopIndex>=D.slides.length-2*i&&(D.activeLoopIndex=D.slides.length-2*i-D.activeLoopIndex),D.activeLoopIndex<0&&(D.activeLoopIndex=D.slides.length-2*i+D.activeLoopIndex),D.activeLoopIndex<0&&(D.activeLoopIndex=0)}else D.activeLoopIndex=D.activeIndex;b.pagination&&D.updatePagination(a)}}},D.createPagination=function(a){if(b.paginationClickable&&D.paginationButtons&&x(),D.paginationContainer=b.pagination.nodeType?b.pagination:c(b.pagination)[0],b.createPagination){var d="",e=D.slides.length,f=e;b.loop&&(f-=2*D.loopedSlides);for(var g=0;f>g;g++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";D.paginationContainer.innerHTML=d}D.paginationButtons=c("."+b.paginationElementClass,D.paginationContainer),a||D.updatePagination(),D.callPlugins("onCreatePagination"),b.paginationClickable&&y()},D.updatePagination=function(a){if(b.pagination&&!(D.slides.length<1)){var d=c("."+b.paginationActiveClass,D.paginationContainer);if(d){var e=D.paginationButtons;if(0!==e.length){for(var f=0;f<e.length;f++)e[f].className=b.paginationElementClass;var g=b.loop?D.loopedSlides:0;if(b.paginationAsRange){D.visibleSlides||D.calcVisibleSlides(a);var h,i=[];for(h=0;h<D.visibleSlides.length;h++){var j=D.slides.indexOf(D.visibleSlides[h])-g;b.loop&&0>j&&(j=D.slides.length-2*D.loopedSlides+j),b.loop&&j>=D.slides.length-2*D.loopedSlides&&(j=D.slides.length-2*D.loopedSlides-j,j=Math.abs(j)),i.push(j)}for(h=0;h<i.length;h++)e[i[h]]&&(e[i[h]].className+=" "+b.paginationVisibleClass);b.loop?void 0!==e[D.activeLoopIndex]&&(e[D.activeLoopIndex].className+=" "+b.paginationActiveClass):e[D.activeIndex]&&(e[D.activeIndex].className+=" "+b.paginationActiveClass)}else b.loop?e[D.activeLoopIndex]&&(e[D.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass):e[D.activeIndex]&&(e[D.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass)}}}},D.calcVisibleSlides=function(a){var c=[],d=0,e=0,f=0;N&&D.wrapperLeft>0&&(a+=D.wrapperLeft),!N&&D.wrapperTop>0&&(a+=D.wrapperTop);for(var g=0;g<D.slides.length;g++){d+=e,e="auto"===b.slidesPerView?N?D.h.getWidth(D.slides[g],!0,b.roundLengths):D.h.getHeight(D.slides[g],!0,b.roundLengths):F,f=d+e;var h=!1;b.visibilityFullFit?(d>=-a&&-a+J>=f&&(h=!0),-a>=d&&f>=-a+J&&(h=!0)):(f>-a&&-a+J>=f&&(h=!0),d>=-a&&-a+J>d&&(h=!0),-a>d&&f>-a+J&&(h=!0)),h&&c.push(D.slides[g])}0===c.length&&(c=[D.slides[D.activeIndex]]),D.visibleSlides=c};var ab,bb;D.startAutoplay=function(){if(D.support.transitions){if("undefined"!=typeof ab)return!1;if(!b.autoplay)return;D.callPlugins("onAutoplayStart"),b.onAutoplayStart&&D.fireCallback(b.onAutoplayStart,D),A()}else{if("undefined"!=typeof bb)return!1;if(!b.autoplay)return;D.callPlugins("onAutoplayStart"),b.onAutoplayStart&&D.fireCallback(b.onAutoplayStart,D),bb=setInterval(function(){b.loop?(D.fixLoop(),D.swipeNext(!0,!0)):D.swipeNext(!0,!0)||(b.autoplayStopOnLast?(clearInterval(bb),bb=void 0):D.swipeTo(0))},b.autoplay)}},D.stopAutoplay=function(a){if(D.support.transitions){if(!ab)return;ab&&clearTimeout(ab),ab=void 0,a&&!b.autoplayDisableOnInteraction&&D.wrapperTransitionEnd(function(){A()}),D.callPlugins("onAutoplayStop"),b.onAutoplayStop&&D.fireCallback(b.onAutoplayStop,D)}else bb&&clearInterval(bb),bb=void 0,D.callPlugins("onAutoplayStop"),b.onAutoplayStop&&D.fireCallback(b.onAutoplayStop,D)},D.loopCreated=!1,D.removeLoopedSlides=function(){if(D.loopCreated)for(var a=0;a<D.slides.length;a++)D.slides[a].getData("looped")===!0&&D.wrapper.removeChild(D.slides[a])},D.createLoop=function(){if(0!==D.slides.length){D.loopedSlides="auto"===b.slidesPerView?b.loopedSlides||1:Math.floor(b.slidesPerView)+b.loopAdditionalSlides,D.loopedSlides>D.slides.length&&(D.loopedSlides=D.slides.length);var a,c="",d="",e="",f=D.slides.length,g=Math.floor(D.loopedSlides/f),h=D.loopedSlides%f;for(a=0;g*f>a;a++){var i=a;if(a>=f){var j=Math.floor(a/f);i=a-f*j}e+=D.slides[i].outerHTML}for(a=0;h>a;a++)d+=u(b.slideDuplicateClass,D.slides[a].outerHTML);for(a=f-h;f>a;a++)c+=u(b.slideDuplicateClass,D.slides[a].outerHTML);var k=c+e+E.innerHTML+e+d;for(E.innerHTML=k,D.loopCreated=!0,D.calcSlides(),a=0;a<D.slides.length;a++)(a<D.loopedSlides||a>=D.slides.length-D.loopedSlides)&&D.slides[a].setData("looped",!0);D.callPlugins("onCreateLoop")}},D.fixLoop=function(){var a;D.activeIndex<D.loopedSlides?(a=D.slides.length-3*D.loopedSlides+D.activeIndex,D.swipeTo(a,0,!1)):("auto"===b.slidesPerView&&D.activeIndex>=2*D.loopedSlides||D.activeIndex>D.slides.length-2*b.slidesPerView)&&(a=-D.slides.length+D.activeIndex+D.loopedSlides,D.swipeTo(a,0,!1))},D.loadSlides=function(){var a="";D.activeLoaderIndex=0;for(var c=b.loader.slides,d=b.loader.loadAllSlides?c.length:b.slidesPerView*(1+b.loader.surroundGroups),e=0;d>e;e++)a+="outer"===b.loader.slidesHTMLType?c[e]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+e+'">'+c[e]+"</"+b.slideElement+">";D.wrapper.innerHTML=a,D.calcSlides(!0),b.loader.loadAllSlides||D.wrapperTransitionEnd(D.reloadSlides,!0)},D.reloadSlides=function(){var a=b.loader.slides,c=parseInt(D.activeSlide().data("swiperindex"),10);if(!(0>c||c>a.length-1)){D.activeLoaderIndex=c;var d=Math.max(0,c-b.slidesPerView*b.loader.surroundGroups),e=Math.min(c+b.slidesPerView*(1+b.loader.surroundGroups)-1,a.length-1);if(c>0){var f=-F*(c-d);D.setWrapperTranslate(f),D.setWrapperTransition(0)}var g;if("reload"===b.loader.logic){D.wrapper.innerHTML="";var h="";for(g=d;e>=g;g++)h+="outer"===b.loader.slidesHTMLType?a[g]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+g+'">'+a[g]+"</"+b.slideElement+">";D.wrapper.innerHTML=h}else{var i=1e3,j=0;for(g=0;g<D.slides.length;g++){var k=D.slides[g].data("swiperindex");d>k||k>e?D.wrapper.removeChild(D.slides[g]):(i=Math.min(k,i),j=Math.max(k,j))}for(g=d;e>=g;g++){var l;i>g&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],D.wrapper.insertBefore(l,D.wrapper.firstChild)),g>j&&(l=document.createElement(b.slideElement),l.className=b.slideClass,l.setAttribute("data-swiperindex",g),l.innerHTML=a[g],D.wrapper.appendChild(l))}}D.reInit(!0)}},B()}};Swiper.prototype={plugins:{},wrapperTransitionEnd:function(a,b){"use strict";function c(h){if(h.target===f&&(a(e),e.params.queueEndCallbacks&&(e._queueEndCallbacks=!1),!b))for(d=0;d<g.length;d++)e.h.removeEventListener(f,g[d],c)}var d,e=this,f=e.wrapper,g=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(a)for(d=0;d<g.length;d++)e.h.addEventListener(f,g[d],c)},getWrapperTranslate:function(a){"use strict";var b,c,d,e,f=this.wrapper;return"undefined"==typeof a&&(a="horizontal"===this.params.mode?"x":"y"),this.support.transforms&&this.params.useCSS3Transforms?(d=window.getComputedStyle(f,null),window.WebKitCSSMatrix?e=new WebKitCSSMatrix("none"===d.webkitTransform?"":d.webkitTransform):(e=d.MozTransform||d.OTransform||d.MsTransform||d.msTransform||d.transform||d.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),b=e.toString().split(",")),"x"===a&&(c=window.WebKitCSSMatrix?e.m41:parseFloat(16===b.length?b[12]:b[4])),"y"===a&&(c=window.WebKitCSSMatrix?e.m42:parseFloat(16===b.length?b[13]:b[5]))):("x"===a&&(c=parseFloat(f.style.left,10)||0),"y"===a&&(c=parseFloat(f.style.top,10)||0)),c||0},setWrapperTranslate:function(a,b,c){"use strict";var d,e=this.wrapper.style,f={x:0,y:0,z:0};3===arguments.length?(f.x=a,f.y=b,f.z=c):("undefined"==typeof b&&(b="horizontal"===this.params.mode?"x":"y"),f[b]=a),this.support.transforms&&this.params.useCSS3Transforms?(d=this.support.transforms3d?"translate3d("+f.x+"px, "+f.y+"px, "+f.z+"px)":"translate("+f.x+"px, "+f.y+"px)",e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=d):(e.left=f.x+"px",e.top=f.y+"px"),this.callPlugins("onSetWrapperTransform",f),this.params.onSetWrapperTransform&&this.fireCallback(this.params.onSetWrapperTransform,this,f)},setWrapperTransition:function(a){"use strict";var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=a/1e3+"s",this.callPlugins("onSetWrapperTransition",{duration:a}),this.params.onSetWrapperTransition&&this.fireCallback(this.params.onSetWrapperTransition,this,a)},h:{getWidth:function(a,b,c){"use strict";var d=window.getComputedStyle(a,null).getPropertyValue("width"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0||0>e)&&(e=a.offsetWidth-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),c?Math.ceil(e):e},getHeight:function(a,b,c){"use strict";if(b)return a.offsetHeight;var d=window.getComputedStyle(a,null).getPropertyValue("height"),e=parseFloat(d);return(isNaN(e)||d.indexOf("%")>0||0>e)&&(e=a.offsetHeight-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),b&&(e+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),c?Math.ceil(e):e},getOffset:function(a){"use strict";var b=a.getBoundingClientRect(),c=document.body,d=a.clientTop||c.clientTop||0,e=a.clientLeft||c.clientLeft||0,f=window.pageYOffset||a.scrollTop,g=window.pageXOffset||a.scrollLeft;return document.documentElement&&!window.pageYOffset&&(f=document.documentElement.scrollTop,g=document.documentElement.scrollLeft),{top:b.top+f-d,left:b.left+g-e}},windowWidth:function(){"use strict";return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:void 0},windowHeight:function(){"use strict";return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:void 0},windowScroll:function(){"use strict";return"undefined"!=typeof pageYOffset?{left:window.pageXOffset,top:window.pageYOffset}:document.documentElement?{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}:void 0},addEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},removeEventListener:function(a,b,c,d){"use strict";"undefined"==typeof d&&(d=!1),a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)}},setTransform:function(a,b){"use strict";var c=a.style;c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=b},setTranslate:function(a,b){"use strict";var c=a.style,d={x:b.x||0,y:b.y||0,z:b.z||0},e=this.support.transforms3d?"translate3d("+d.x+"px,"+d.y+"px,"+d.z+"px)":"translate("+d.x+"px,"+d.y+"px)";c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=e,this.support.transforms||(c.left=d.x+"px",c.top=d.y+"px")},setTransition:function(a,b){"use strict";var c=a.style;c.webkitTransitionDuration=c.MsTransitionDuration=c.msTransitionDuration=c.MozTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){"use strict";return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){"use strict";var a=document.createElement("div").style;return"webkitPerspective"in a||"MozPerspective"in a||"OPerspective"in a||"MsPerspective"in a||"perspective"in a}(),transforms:window.Modernizr&&Modernizr.csstransforms===!0||function(){"use strict";var a=document.createElement("div").style;return"transform"in a||"WebkitTransform"in a||"MozTransform"in a||"msTransform"in a||"MsTransform"in a||"OTransform"in a}(),transitions:window.Modernizr&&Modernizr.csstransitions===!0||function(){"use strict";var a=document.createElement("div").style;return"transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"MsTransition"in a||"OTransition"in a}(),classList:function(){"use strict";var a=document.createElement("div");return"classList"in a}()},browser:{ie8:function(){"use strict";var a=-1;if("Microsoft Internet Explorer"===navigator.appName){var b=navigator.userAgent,c=new RegExp(/MSIE ([0-9]{1,}[\.0-9]{0,})/);null!==c.exec(b)&&(a=parseFloat(RegExp.$1))}return-1!==a&&9>a}(),ie10:window.navigator.msPointerEnabled,ie11:window.navigator.pointerEnabled}},(window.jQuery||window.Zepto)&&!function(a){"use strict";a.fn.swiper=function(b){var c;return this.each(function(d){var e=a(this),f=new Swiper(e[0],b);d||(c=f),e.data("swiper",f)}),c}}(window.jQuery||window.Zepto),"undefined"!=typeof module?module.exports=Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return Swiper});

//loading^block/footnav^
const loading = {
    _loadItem:null,
    _anItem:null,
    _tipItem:null,
    _tipLabel:null,
    _showTip:true,
    _type:1,
    showLoading(config){
        if(this._loadItem){
            this._loadItem.remove();
            this._loadItem = null;
            this._anItem = null;
            this._tipItem = null;
            this._showTip = true;
            this._type = 1;
        }
        if(typeof config == "string"){
            this._tipLabel = config;
            this._type = 1;
        }else if(typeof config == "object"){
            this._tipLabel = typeof config.tip == "string" ? config.tip : "loading...";
            this._type = typeof config.type == "number" ? config.type : 1;
            this._showTip = typeof config.showTip == "boolean" ? config.showTip : true;
        }else{
            this._tipLabel = "loading...";
            this._type = 1;
        }
        this.createEle();
    },
    createEle(){
        this._loadItem = $(`<div class="load-view"></div>`);
        this._anItem = $(`<div class="load-an-view"></div>`);
        this._tipItem =  $(` <div class="load-tip">${this._tipLabel}</div>`);
        switch(this._type) {
            case 1:
               let load1 = $(`<div class="load-circle">
                    <div class="load-container load-container1">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                    <div class="load-container load-container2">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                    <div class="load-container load-container3">
                        <div class="circle1"></div>
                        <div class="circle2"></div>
                        <div class="circle3"></div>
                        <div class="circle4"></div>
                    </div>
                </div>`)
                load1.appendTo(this._anItem);
                break;
            case 2:
               let load2 = $(`<div class="fading-circle">
                    <div class="sk-circle1 sk-circle"></div>
                    <div class="sk-circle2 sk-circle"></div>
                    <div class="sk-circle3 sk-circle"></div>
                    <div class="sk-circle4 sk-circle"></div>
                    <div class="sk-circle5 sk-circle"></div>
                    <div class="sk-circle6 sk-circle"></div>
                    <div class="sk-circle7 sk-circle"></div> 
                    <div class="sk-circle8 sk-circle"></div>
                    <div class="sk-circle9 sk-circle"></div>
                    <div class="sk-circle10 sk-circle"></div>
                    <div class="sk-circle11 sk-circle"></div>
                    <div class="sk-circle12 sk-circle"></div>
                </div>`)
                load2.appendTo(this._anItem);
                break;
            case 3:
                let load3 = $(`<div class="three-bounce">
                    <div class="bounce1"></div>
                    <div class="bounce2"></div>
                    <div class="bounce3"></div>
                </div>`)
                load3.appendTo(this._anItem);
                break;
            case 4:
                let load4 = $(`<div class="chasing-dots">
                        <div class="dot1"></div>
                        <div class="dot2"></div>
                    </div>`)
                load4.appendTo(this._anItem);
                break;
            case 5:
            let load5 = $(`<div class="wave">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>`)
                load5.appendTo(this._anItem);
                break;
       } 
       this.addEle();
    },
    addEle(){
        this._anItem.appendTo(this._loadItem);
        if(this._showTip){
            this._tipItem.appendTo(this._loadItem);
        }
        this._loadItem.appendTo($('body'));
    },
    hideLoading(){
        this._loadItem.remove();
        this.resetData();
    },
    resetData(){
        this._loadItem = null;
        this._anItem = null;
        this._tipItem = null;
        this._showTip = true;
        this._type = 1;
    }
}