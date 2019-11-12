$(function () {
    setContent();
})

function setContent() {
    setImageBannerLeft();
    setDiscount();
    setHotProduct();
    setNewProduct();
}

function setDiscount() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/products/hot-products?page=1&size=8",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            $('.discount .list-product .row').html("");
            result.map((data, index) => {
                if (data.status) {
                    let product = `<div class="col-6 col-sm-3">
                                    <div class="thumbnail idProduct${data.id}">
                                        ${data.originCost == data.saleCost ? '' : `<span class="icon-sale">-${(((data.originCost - data.saleCost) / data.originCost) * 100).toFixed(0)}%</span>`}
                                                        <a href="product?id=${data.id}"><img src="${data.imgUrl}" alt=""></a>
                                        <div class="caption"><span class="discount-price">${formatNumber(data.saleCost,'.','.')} VNĐ</span>
                                            ${data.originCost == data.saleCost ? '' : `<span class="old-price">${formatNumber(data.originCost,'.','.')} VNĐ</span>`} 
                                            <a href="product?id=${data.id}">${data.name}</a>
                                        </div>
                                    </div>
                                </div>` //saleCost==OrginCost not display orginCost
                    $('.discount .list-product .row').append(product);
                    setDetailsProduct(data.id);
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function setHotProduct() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/products/hot-products?page=1&size=8",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            $('.hot-product .list-product .row').html("");
            result.map((data, index) => {
                if (data.status) {
                    let product = `<div class="col-6 col-sm-3">
                                    <div class="thumbnail idProduct${data.id}">
                                        ${data.originCost == data.saleCost ? '' : `<span class="icon-sale">-${(((data.originCost - data.saleCost) / data.originCost) * 100).toFixed(0)}%</span>`}
                                        <a href="product?id=${data.id}"><img src="${data.imgUrl}" alt=""></a>
                                        <div class="caption"><span class="discount-price">${formatNumber(data.saleCost,'.','.')} VNĐ</span>
                                            ${data.originCost == data.saleCost ? '' : `<span class="old-price">${formatNumber(data.originCost,'.','.')} VNĐ</span>`} 
                                            <a href="product?id=${data.id}">${data.name}</a>
                                        </div>
                                    </div>
                                </div>` //saleCost==OrginCost not display orginCost
                    $('.hot-product  .list-product .row').append(product);
                    setDetailsProduct(data.id);
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function setNewProduct() {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/products/new-products?page=1&size=8",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            $('.new-product .list-product .row').html("");
            result.map((data, index) => {
                if (data.status) {
                    let product = `<div class="col-6 col-sm-3">
                                    <div class="thumbnail idProduct${data.id}">
                                        ${data.originCost == data.saleCost ? '' : `<span class="icon-sale">-${(((data.originCost - data.saleCost) / data.originCost) * 100).toFixed(0)}%</span>`}
                                        <a href="product?id=${data.id}"><img src="${data.imgUrl}" alt=""></a>
                                        <div class="caption"><span class="discount-price">${formatNumber(data.saleCost,'.','.')} VNĐ</span>
                                            ${data.originCost == data.saleCost ? '' : `<span class="old-price">${formatNumber(data.originCost,'.','.')} VNĐ</span>`} 
                                            <a href="product?id=${data.id}">${data.name}</a>
                                        </div>
                                    </div>
                                </div>` //saleCost==OrginCost not display orginCost
                    $('.new-product .list-product .row').append(product);
                    setDetailsProduct(data.id);
                    offLoading();
                }
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function setDetailsProduct(idProduct) {
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/products/productDetails?idProduct="+idProduct,
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            if(result != '' && result.status) {
                let present = `<div class="description"><a href="product?id=${result.id}"><strong>Đặc điểm nổi bật</strong>${result.present}</a></div>`;
                // $(".list-product .idProduct"+idProduct+" .description").length == 0 ? $(".list-product .idProduct"+idProduct).prepend(present) : ''; //if descripition found => not prepend again
                $(".list-product .idProduct"+idProduct+" .description").length == 0 ? $(".list-product .idProduct"+idProduct+" > a").after(present) : '';
            }
         },
        // error: function (jqXHR, textStatus, errorThrown) {
        //     console.log(errorThrown+"\n"+jqXHR+"\n"+textStatus);
        // }
    })
}

function setImageBannerLeft(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: URL_API+"/v1/public/image/home-page",
        headers: {
            "adminbksoftwarevn": tokenHeader_value,
        },
        timeout: 30000,
        success: function (result) {
            setImageLeft('discount',result[5].url);
            setImageLeft('hot-product',result[6].url);
            setImageLeft('new-product',result[7].url);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    })
}

function setImageLeft(location,url) {
    $(".content ."+location+" .banner-left img").attr('src',url);
}