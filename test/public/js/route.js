/**
 * Created by VnB_Ray on 2016/10/26.
 */
/*���ò˵���ҳ����ת����*/
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

/*���ö�����������ҳ����ת*/
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
