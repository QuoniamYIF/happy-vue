/**
 * Created by VnB_Ray on 2016/11/4.
 */
var menuStr="";

function createTree(menuJson){
    for(var j=0;j<menuJson.length;j++){
        var ulStr='';
        try{
            if(menuJson[j]["level"]=="root"){
                if(typeof menuJson[j]["url"]=="undefined"){
                    ulStr += '<div class="menuMainBox"><span class="menuMain fa '+menuJson[j]["icon"]+'"></span><div class="childMenu">';
                }else{
                    ulStr += '<div class="menuMainBox" onclick="loadPage('+menuJson[j]["url"]+')"><span class="menuMain fa '+
                        menuJson[j]["icon"]+'"></span>';
                }
            }else{
                if(typeof menuJson[j]["url"]=="undefined"){
                    ulStr += '<div>'+menuJson[j]["name"]+'<span class=""></span><div class="grandsonMenu">';
                }else{
                    ulStr += '<div onclick="loadPage(this,\''+menuJson[j]["url"]+'\')">'+menuJson[j]["name"];
                }
            }

            menuStr += ulStr;
            if(menuJson[j]["list"] != null){
                createTree(menuJson[j]["list"]);
            }
            typeof menuJson[j]["url"]=="undefined"?menuStr += "</div></div>":menuStr += "</div>";
        }catch (e){}
    }
    return menuStr;
}
