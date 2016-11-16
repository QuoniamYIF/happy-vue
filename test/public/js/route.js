/**
 * Created by VnB_Ray on 2016/10/26.
 */
/*设置菜单栏页面跳转方法*/
function loadPage(obj,htmlName){
    /*$(".menuListBox span").removeClass('menuActive');
    $(obj).parent('div').siblings('div').children('span').removeClass('activeMenu');*/
    $(".menuActive").removeClass('menuActive');
    $(obj).addClass('menuActive');
    $(obj).parent().addClass('activeMenu');
    $("#mainBox").html("").load('tpl/'+htmlName).css('left','-100%');
    $("#loadLine").animate({'width':'100%'},1000,function(){
        $("#loadLine").css('width',0);
        $("#mainBox").animate({
            left:'3px'
        },800)
    })
}

/*设置顶栏个人中心页面跳转*/
function loadUser(obj,htmlName){
    $(obj).parent('ul').children('li').removeClass('menuActive');
    $(obj).addClass('menuActive');
    $("#mainBox").html("").load('frame/'+htmlName).css('left','-100%');
    $("#loadLine").animate({'width':'100%'},1000,function(){
        $("#loadLine").css('width',0);
        $("#mainBox").animate({
            left:'3px'
        },800)
    })
}
