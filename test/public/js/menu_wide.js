/**
 * Created by VnB_Ray on 2016/11/3.
 */
/*递归实现获取无级树数据并生成DOM结构*/
var wideStr = "";
function forTree(o){
    for(var i=0;i < o.length;i++){
        var urlstr = "";
        try{
            if(typeof o[i]["url"] == "undefined"){
                urlstr = '<div class="menuListBox"><span class="mainMenu fa '+o[i]["icon"]+'">&nbsp;&nbsp;'+o[i]["name"] +
                    '</span><ul class="menuList">';
            }else{
                urlstr = '<div class="menuListBox"><span class="mainMenu fa '+o[i]["icon"]+'" onclick="loadPage(this,\''+
                o[i]["url"]+'\')">&nbsp;&nbsp;'+o[i]["name"] +'<b class="fa fa-caret-right rt" ></b></span><ul class="menuList">';
            }
            wideStr += urlstr;
            if(o[i]["list"] != null){
                forTree(o[i]["list"]);
            }
            wideStr += "</ul></div>";
        }catch(e){}
    }
    return wideStr;
}

function menuTree(){
    /*定义子菜单打开和关闭两个状态图标*/
    var openMenu = '<i class="fa fa-plus-square-o rt"></i>';

    //给有子对象的元素加[+-]
    $("#menuTree ul").each(function(index, element) {
        var ulContent = $(element).html();
        var spanContent = $(element).siblings("span").text();
        if(ulContent){
            $(element).siblings("span").html(spanContent + openMenu )
        }
    });

    //改变菜单点击后的状态
    $("#menuTree").find("div span").click(function(){
        var ul = $(this).siblings("ul");
        //var spanStr = $(this).html();
        //var spanContent = spanStr.substr(2,spanStr.length);
        if(ul.find("div").html() != null){
            if(!$(this).parent("div").parent().hasClass('menuList')){
                $(".menuListBox").removeAttr('style');
                $(this).parent('div').css('border-left','4px solid #1199C4');
            }
            $(this).parent("div").siblings("div").children("ul").slideUp(300);
            $(this).parent("div").siblings("div").children("span").children("i").attr("class","fa fa-plus-square-o rt");
            if(ul.css("display") == "none"){
                ul.slideDown(300);
                $(this).addClass("activeMenu").parent("div").siblings("div").children("span").removeClass("activeMenu");
                $(this).children("i").attr("class","fa fa-minus-square-o rt");
            }else{
                ul.slideUp(300);
                $(this).removeClass("activeMenu").children("i").attr("class","fa fa-plus-square-o rt");
            }
        }
    })
}