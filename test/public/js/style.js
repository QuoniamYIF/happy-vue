/**
 * Created by VnB_Ray on 2016/10/21.
 */
/*切换到详细菜单版面*/
function wideStyle(obj) {
    var mainH = document.body.clientHeight - 52;
    var mainW = document.body.clientWidth - 234;
    sessionStorage.setItem('style', 'wide');
    $(obj).css({'background':'rgba(0,0,0,0.3)','color':'#666'}).siblings().removeAttr('style');
    $("#logoImg").attr('src','img/logo_b.png');
    $("#aside").removeClass('narrow_W').addClass('wide_W').load('frame/menu/menu_v3.html');
    $("#main").css({'width':mainW,'height':mainH,'left':'234px'});
    $("#mainBox").css({'width':mainW-3,'height':mainH-6});
}

/*切换到简约菜单版面*/
function narrowStyle(obj){
    var mainH = document.body.clientHeight - 52;
    var mainW = document.body.clientWidth - 52;
    $(obj).css({'background':'rgba(0,0,0,0.3)','color':'#666'}).siblings().removeAttr('style');
    sessionStorage.setItem('style','narrow');
    $("#logoImg").attr('src','img/logo_m.png');
    $("#aside").removeClass('wide_W').addClass('narrow_W').load('frame/menu/menu_v4.html');
    $("#main").css({'width':mainW,'height':mainH,'left':'52px'});
    $("#mainBox").css({'width':mainW-3,'height':mainH-6});
}

/*设置页面颜色配置*/
/*配置双色header方法*/
function setLogoBg(obj,color){
    sessionStorage.setItem('header','narrow');
    $(obj).css({'background':'rgba(0,0,0,0.3)','color':'#666'}).siblings().removeAttr('style');
    $("#logoBox").css('background',color);
    $("#header").css({'background':'#fff','color':'#98A6AD','border-bottom':'1px solid #DEE5E7'});
    $("#aside").css({'background':'#1C2B36','border':'none'});
    $("#menuStyle").attr('href','style/menu-v1.css');
}

/*配置单色header方法*/
function setHeaderBg(obj,color){
    sessionStorage.setItem('header','wide');
    $(obj).css({'background':'rgba(0,0,0,0.3)','color':'#666'}).siblings().removeAttr('style');
    $("#logoBox").css('background',color);
    $("#header").css({'background':color,'color':'#fff','border':'none'});
    $("#aside").css({'background':'#DDE6E9','border-right':'1px solid #DEE5E7'});
    $("#menuStyle").attr('href','style/menu-v2.css');
}

/*点击显示/隐藏子菜单功能*/
/*
function toggleMenu(obj){
    var headerW = sessionStorage.getItem('header');
    $(obj).parent("li").siblings().children('p').removeClass('open');
    $(obj).addClass('open');
    $(".childMenuList").slideUp(300);
    $(obj).next('ul').slideDown(300);
}*/
