//=================================INDEX

getCompany();
getInforCompany();

//setHotLine, Email, NameCompany, address, map for view
function getCompany() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: URL_API+"/v1/public/companies",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            setHotLine(result[0].hotline);
            setEmail(result[0].email);
            setNameCompany(result[0].name);
            setAddressCompany(result[0].address);
            setAddressTransactionOffice(result[1].address)
            setMapFooter(result[0].coordinates);
            setHotLineKt(result[2].hotline);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//set link Facebook, youtobe for view
function getInforCompany() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: URL_API+"/v1/public/information-company",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            setFacebook(result[0].content);
            setYouTuBe(result[1].content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

//set link Facebook
function setFacebook(url) {
    $('a.facebook').attr('href',url);
}

//set link Youtube
function setYouTuBe(url) {
    $('a.youtube').attr('href',url);
}

//set call hotline
function setHotLine(hotline) {
    $('a.hot-line-r').attr("href","http://zalo.me/0"+hotline);
    hotline = '0'+hotline;
    hotline = hotline.substr(0,4) + ' ' + hotline.substr(4,3) + ' ' + hotline.substr(7,3);// change format phone 09XXXXXXXX to 09XX XXX XXX
    $('a.hot-line').text(hotline);
    $('a.hot-line').attr("href","tel:"+hotline);
}

function setHotLineKt(hotline) {
    hotline = '0'+hotline;
    hotline = hotline.substr(0,4) + ' ' + hotline.substr(4,3) + ' ' + hotline.substr(7,3);
    $('a.hot-line-kt').text(hotline);
    $('a.hot-line-kt').attr("href","tel:"+hotline);
}

//set call email
function setEmail(email) {
    $('a.email').text(email);
    $('a.email').attr("href","mailto:"+email);
    $('a.email-r').attr("href","mailto:"+email);
}

function setNameCompany(name) {
    $('.header .name a').text(name);
}

function setAddressCompany(address) {
    $('.address-transation').text(address);
}

function setAddressTransactionOffice(address) {
    $('.address-company').text(address);
}

//set iframe map footter
function setMapFooter(url) {
    $('.footer .map iframe').attr('src',url);
}


//===========================================HEADER
function ajaxHeader() {

}
//===========================================BANNER

getImageBanner();
setNumberCart();

//set image, slogan for banner
function getImageBanner() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/image/home-page",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            setSourceLogoImage(result[0].url);
            setSourceSologan(result[1].url);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//set src in tag img logo image
function setSourceLogoImage(url) {
    $(".banner .logo img").attr("src",url);
}

//set src in tag img sologan image
function setSourceSologan(url) {
    $(".banner .sologan img").attr("src", url);
}

//set number for cart
function setNumberCart() {
    var listProduct = JSON.parse(localStorage.getItem('listProduct')); //get info  cart in localStorage
    listProduct === null ? $(".banner .cart strong").text(0+" sản phẩm"): $(".banner .cart strong").text(listProduct.length+" sản phẩm"); // test length cart and set number for cart
}

//==============================================MENU_MOBILE

setListCategoryMoblie();
viewSubMenuMobile();

//set list category for mobile
function setListCategoryMoblie() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/category/showBig?size=11",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            $(".menu-mobile ul.list-menu-mobile").html(""); //clear
            result.map((data,index) => {
                if(data.status) {
                    let li = '';
                    li +=`<li id="mmb${data.id}"><a a href="big-category?id=${data.id}">${data.name}</a><i class="fas fa-caret-down"></i></li>`;//mmb -- menu-mobile-bigCategory
                    $(".menu-mobile ul.list-menu-mobile").append(li); //add tag <li>
                    setMediumCategoryMobile(data.id); //set menu level 2
                }
            })

            viewSubMenuMobile();
            //moi lan render ra thi phai goi lai
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//reset onclick for menu moblie
function viewSubMenuMobile() {
    $(".menu-mobile ul.list-menu-mobile > li").unbind('click').click(function () {
        $(this).children(".sub-menu-mobile").toggle();
    });
}

//set menu level for menu-mobile
async function setMediumCategoryMobile(idBig) {
    let mediumCategory = "";
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/category/showMedium?idBigCategory="+idBig,
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            if(!(result == '')) {
                mediumCategory = "<ul class='sub-menu-mobile'style='display:none;'>";
                result.map((data, index) => {
                    if (data.status) {
                        mediumCategory += `<li><a href="medium-category?id=${data.id}">${data.name}</a></li>`
                    }
                })
                mediumCategory += "</ul>"; //set menu follow idBig
            }
            $('#mmb'+idBig).append(mediumCategory);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return mediumCategory;
}

//===============================================MENUPANEL

setListCategory();
searchPanel();

//set list category
function setListCategory() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/category/showBig?size=11",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            $(".menu-panel ul.list-category").html("");
            result.map((data,index) => {
                if(data.status) {
                    let li = '';
                    li +=`<li id="mpb${data.id}"><a href="big-category?id=${data.id}">${data.name}</a></li>`; //mpb -- menu-panel-bigCategory
                    $(".menu-panel ul.list-category").append(li);
                    setMediumCategory(data.id);
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

async function setMediumCategory(idBig) {
    let mediumCategory = "";
    await $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/category/showMedium?idBigCategory="+idBig,
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            if(!(result == '')) {
                mediumCategory = "<div class=\"sub-category\">";
                result.map((data, index) => {
                    if (data.status) {
                        mediumCategory += `<div class=\"box-category\"><a href="medium-category?id=${data.id}">${data.name}</a></div>`
                    }
                })
                mediumCategory += "</div>";
            }
            $('#mpb'+idBig).append(mediumCategory);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
    return mediumCategory;
}

function searchPanel() {
    $('.menu-bar .search .fa-search').click(function () {
        let txt = $('.menu-bar .search input').val();
        window.location.href = `search?id=${txt}`; //forward to /search when click
    })
    $('.menu-bar .search input').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which); //forward to /search when input enter
        if(keycode == '13'){
            let txt = $('.menu-bar .search input').val();
            window.location.href = `search?id=${txt}`;
        }
    })
}

//====================================================SLIDER

setSlider();

//set image for slider
function setSlider() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/image/home-page",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            setSliderImg('#slider1',result[2].url);
            setSliderImg('#slider2',result[3].url);
            setSliderImg('#slider3',result[4].url);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//set attribute src for img in slider
function setSliderImg(idImg, url) {
    $(idImg).attr("src",url);
}

//=====================================================FOOTER

getFooterMenu();

function getFooter() {
}

//set infor FooterMenu
function getFooterMenu() {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: URL_API+"/v1/public/menu/footerBig",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            result.map((data) => {
                if (data.status) {
                    switch (data.id) {
                        //set title infor company
                        case 1:
                            $("#company h4").text(data.name);
                            getFooterMenuDetailsById(1).then((data)=>{
                                $("#company ul").html(data);
                            })
                            break;
                        //set title infor policy
                        case 2:
                            $("#policy h4").text(data.name);
                            getFooterMenuDetailsById(2).then((data)=>{
                                $("#policy ul").html(data);
                            })
                            break;
                        //set title infor support-client
                        case 3:
                            $("#support-client h4").text(data.name);
                            getFooterMenuDetailsById(3).then((data)=>{
                                $("#support-client ul").html(data);
                            })
                            break;
                        //set title contact
                        case 4:
                            $("#contact h4").text(data.name);
                            getFooterMenuDetailsById(4).then((data)=>{
                                $("#contact ul").html(data);
                            })
                            break;
                        default:
                            break;
                    }
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

//set footer menu detail forward id footer title
async function getFooterMenuDetailsById(id) {
    var ul = "";
    await  $.ajax({
        type: "GET",
        dataType: "json",
        url: URL_API+"/v1/public/menu/footerSmall?idFooterBig="+id,
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: async function (result) {
            result.map((data,index) => {
                if(data.status) {
                    ul += `<li><a href='infor-company?id=${data.id}'>${data.name}</a></li>`
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
    return ul;
}


