$(function () {
    runHeader();
    runBanner();
    runMenuPanel();
    runMenuMobile()
    runFooter();
})

function formatNumber(nStr, decSeperate, groupSeperate) {
    nStr += '';
    x = nStr.split(decSeperate);
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + groupSeperate + '$2');
    }
    return x1 + x2;
}

//=============================genarl

//=============================runHeader
function runHeader() {
    responsiveHeader();
}

function responsiveHeader() {
    //menu-service header open -close
    $(".header .service .menu-service").click(function() {
        $(".header .service .list-menu").toggleClass("hidden-md");
    }) //error toggle => click

    //end responsive header
}
//==============================runBanner

function runBanner(){
    responsiveCart();
}

function responsiveCart() {
    let width = $(window).width();
    if (width >= 992) {
        $('.banner .cart img').attr('src','https://img.icons8.com/metro/70/3498DB/shopping-cart.png');
    } else if ( width < 991 && width >= 768) {
        $('.banner .cart img').attr('src','https://img.icons8.com/metro/50/3498DB/shopping-cart.png');
    } else {
        $('.banner .cart img').attr('src','https://img.icons8.com/metro/35/3498DB/shopping-cart.png');
    }
    $(window).resize(function() {
        width = $(window).width();
        if (width >= 992) {
            $('.banner .cart img').attr('src','https://img.icons8.com/metro/70/3498DB/shopping-cart.png');
        } else if ( width < 991 && width >= 768) {
            $('.banner .cart img').attr('src','https://img.icons8.com/metro/50/3498DB/shopping-cart.png');
        } else {
            $('.banner .cart img').attr('src','https://img.icons8.com/metro/35/3498DB/shopping-cart.png');
        }
    })
}

//==============================MenuPanel

function runMenuPanel() {
    responsiveMenuPanel();
}

function responsiveMenuPanel() {
    //responsive menu-panel
    var width = $(window).width();
    if (width < 768) {
        $(".menu-bar .category span").text("Menu");
    } else {
        $(".menu-bar .category span").text("Danh mục sản phẩm");
    }
    $(window).resize(function() {
        width = $(window).width();
        if (width < 768) {
            $(".menu-bar .category span").text("Menu"); //change text
        } else {
            $(".menu-bar .category span").text("Danh mục sản phẩm"); //change text
        }
    })
}

//==============================MenuMobile

function runMenuMobile() {
    responsiveMenuMobile();
}

function responsiveMenuMobile() {

    var height = $(window).height();

    $(window).resize(function() {
        height = $(window).height();
        $(".menu-mobile").css(`height:${height} !important`)
    })

    $("ul.list-menu-mobile > li").click(function(){
        $(this).children(".sub-menu-mobile").toggleClass("view"); //this when click is li .children to select sub-menu-mobile
    })

    $(".menu-bar .category").click(function() {
        $(".menu-mobile").addClass("view-menu");
    })
    $(".menu-mobile .close-menu-mobile").click(function() {
        $(".menu-mobile").removeClass("view-menu");
    })
    //end_responsive_mobile
}

// function viewSubMenuMobile() {
//     $("ul.list-menu-mobile > li").click(function(){
//         $(this).children(".sub-menu-mobile").toggleClass("view"); //this when click is li .children to select sub-menu-mobile
//     })
// }

//==============================Footer

function runFooter() {
    responsiveFooter();
}

function responsiveFooter() {
    $(".footer .list-infor .col-md-3 > div").click(function(event) {
        let id = event.currentTarget.id; //id of div when click
        $("#" + id + "> ul").toggleClass("hidden-md");
        $("#" + id + "> h4").toggleClass("none-border");
    });
}

function offLoading() {
    $('.loading').css("display","none");
}