// ==UserScript==
// @name         Hupu-Image Saving
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://my.hupu.com/*/photo/*.html*
// @match        https://www.tumblr.com/*
// @require      http://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    var res_url = null;
    var res_name = null;
    var img_url = null;
    var big_photo_url = null;
    var reHupu = /hupu/i;
    var reTumb = /tumblr/i;
    var vipBtn = '<a id="goudidiaoVipBtn" class="whx-a"></a>';
    var pageSite = window.location.href;
    $('head').append(`
<style>
a.whx-a{
visibility:hidden;
background-size:20px;
border-radius:20%;
border:0px;
vertical-align:middle;
transition:margin-top 0.25s ease;
outline:none!important;
padding:0px!important;
height:25px!important;
width:25px!important;
left:0px!important;
top:0px!important;
background-position:center!important;
background-repeat:no-repeat!important;
}
a.whx-a:hover{
animation:rotateAni 2s infinite;
animation-direction:alternate;
-webkit-animation:rotateAni 2s infinite;
-webkit-animation-direction:alternate;
}
@keyframes rotateAni{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
@-webkit-keyframes rotateAni{
from {transform: rotate(0deg);}
to {transform: rotate(360deg);}
}
</style>`);
if(reHupu.test(pageSite)) {
    $('#o p.left').append(vipBtn);
    $('#goudidiaoVipBtn').css({"visibility":"hidden",
        "background-color":"rgb(255, 255, 225)",
        "background-image":'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAYM5vMOA/ENGegK2olI6G1b97Z0sXENA+jAAAAKFJREFUKM+FklkSxCAIRHFfss3K/Y86iQSDVqzpH7FfgQpCVfAmGx+gl9JI0qrxrcNLzooEbKUG4EKWdkCiDRV0N0RTrZ5wvdgTTgp4SzCAHxAPZkAM5GOJWuuT7FE5OVPOBFLTYb3Oc2YB5uJ8+G6pgkTGt74ntcCJHiwFLHw10Tdc93jlGXGvSRtsHNpuPs+/o1ODfxAtSL0f7HPC+L/9AF60G3QxO1UaAAAAAElFTkSuQmCC")'
    });

    $('img').bind('mouseover',(function(){
        img_url = $(this).attr("src");
        img_name = $(this).attr("alt");
        var img_left = $(this).position().left;
        var img_top = $(this).position().top;
        var img_height = $(this).css("height");
        var img_width = $(this).css("width");
        var new_width = parseInt(img_width) + parseInt(img_left) + 20;
        var new_height = parseInt(img_height) + parseInt(img_top) - 10;
        //alert(new_width + "px, "+img_top+"px");
        $("#goudidiaoVipBtn").css(
            {
                "position":"absolute",
                "display":"inline-block",
                "margin-left": new_width + "px",
                "margin-top": new_height + "px",
                "visibility":"visible"
            });
    }));
    /*.mouseout(function() {
            $("#goudidiaoVipBtn").css(
                {
                    "visibility":"hidden"
                });
        });*/
    if (navigator.userAgent.toLowerCase().match(/chrome/) !== null) {

        $('#goudidiaoVipBtn').click(function (){ //chrome 下的方法
            var alink = document.createElement("a");
            alink.href = img_url;
            alink.download = img_name;
            alink.click();
        });
    } else {
        $('#goudidiaoVipBtn').click(function (){ // IE的方法
            var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
            for(; oPop.document.readyState != "complete"; )
            { if (oPop.document.readyState == "complete")break; }
            oPop.document.execCommand("SaveAs"); oPop.close();
        });
    }
}

    function reg_ele_mouse_event() {
        $('img').unbind('mouseover').bind('mouseover',(function(){
            big_photo_url = $(this).parent().attr("data-big-photo") ;
            if(big_photo_url == null || big_photo_url == undefined) {
                big_photo_url = $(this).parent().attr("href");
                if(big_photo_url !== null && big_photo_url !== undefined) {
                    img_url = big_photo_url;
                } else {
                    img_url = $(this).attr("src");
                }
            } else {
                img_url = $(this).attr("src");
            }
            alert(img_url);
            if("gif" == img_url.substring(lastIndexOf('.')+1)) {
                alert('gif');
            }
            if("jpg" == img_url.substring(lastIndexOf('.')+1)) {
                alert('jpg');
            }
            $("#goudidiaoVipBtn").css(
                {
                    "cursor":"pointer",
                    "display":"block",
                    "visibility":"visible"
                });
            res_url = img_url;
            img_url = null;
            big_photo_url = null;
        }) );
        $('div.dockable_video_embed').unbind('mouseover').bind('mouseover',(function(){
            video_url = $(this).children("div:eq(0)").children().children().attr("src");
            alert(video_url);
            $("#goudidiaoVipBtn").css(
                {
                    "cursor":"pointer",
                    "display":"block",
                    "visibility":"visible"
                });
            res_url = video_url;
        }) );
    }
    if(reTumb.test(pageSite)) {
        /*
        var img_href = $('.post_media .photoset .photoset_row a').href;
        var gif_link = $('.post_media a img').src;
        var video_src = $('.post_media video source').src;
        //alert(video_src);
        siteSort=GM_getValue("siteSort");
        alert(siteSort);
        */
        var yytTitle = $("#user_tools");
        yytTitle.append(vipBtn);
        $('#goudidiaoVipBtn').css({
            "visibility":"visible",
            "background-color":"rgb(255, 255, 225)",
            "background-image":'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADc6ur3AAAAFnRSTlMAYM5vMOA/ENGegK2olI6G1b97Z0sXENA+jAAAAKFJREFUKM+FklkSxCAIRHFfss3K/Y86iQSDVqzpH7FfgQpCVfAmGx+gl9JI0qrxrcNLzooEbKUG4EKWdkCiDRV0N0RTrZ5wvdgTTgp4SzCAHxAPZkAM5GOJWuuT7FE5OVPOBFLTYb3Oc2YB5uJ8+G6pgkTGt74ntcCJHiwFLHw10Tdc93jlGXGvSRtsHNpuPs+/o1ODfxAtSL0f7HPC+L/9AF60G3QxO1UaAAAAAElFTkSuQmCC")'
        });
        reg_ele_mouse_event();
        $(window).scroll(
            function() {
                var scrollTop = $(this).scrollTop();
                var scrollHeight = $(document).height();
                var windowHeight = $(this).height();
                if (scrollTop + windowHeight == scrollHeight) {
                    // 此处是滚动条到底部时候触发的事件，在这里写要加载的数据，或者是拉动滚动条的操作
                    //alert("弹弹弹");
                    reg_ele_mouse_event();
                }
            });
        if (navigator.userAgent.toLowerCase().match(/chrome/) !== null) {

            $('#goudidiaoVipBtn').click(function (){ //chrome 下的方法
                var alink = document.createElement("a");
                alink.href = res_url;
                alink.download = res_url.substring(res_url.lastIndexOf('/') + 1);
                alink.click();
            });
        } else {
            $('#goudidiaoVipBtn').click(function (){ // IE的方法
                var oPop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
                for(; oPop.document.readyState != "complete"; )
                { if (oPop.document.readyState == "complete")break; }
                oPop.document.execCommand("SaveAs"); oPop.close();
            });
        }
    }
})();