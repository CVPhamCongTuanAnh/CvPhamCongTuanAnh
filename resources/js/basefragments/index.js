// const URL_API = 'http://localhost:9990/api';
const URL_API = 'https://admin.haphatsmarthome.com/api';
// const URL_API = 'http://123.31.45.240:8686/admin_haphatsmarthome_com/api'
const tokenHeader_value = "1df0e68d684175afa5ae2c3d1543fa0e";
$(function() {

})
$.ajax({
    type: 'GET',
    dataType: "json",
    headers: {
        'Authorization': 'BKSoftwareeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoaWV1dnA5OEBnbWFpbC5jb20iLCJleHAiOjE1NTkxMDMzMzZ9.3n0jtN_2Ppgtj_00JpxaQ7c_eHGzeyQEXlGitQ6wH-KgH-hSM_AwJq5-QPsyQnt2f_S-Ln5c564MoPady4mPxA'
    },
    url: 'http://localhost:8877/api/v1/user/my-profile',
    timeout: 30000,
    success: function (result) {
        console.log(result);
        // window.location = "home";
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    }
})