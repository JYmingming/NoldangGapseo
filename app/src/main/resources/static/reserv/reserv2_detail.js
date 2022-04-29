    var arr = location.href.split("?");
    if (arr.length == 1) {
    alert("요청 형식이 옳바르지 않습니다.")
    throw "URL 형식 오류!";
    }
    var qs = arr[1];
    console.log(qs);
    var params = new URLSearchParams(qs);
    var link = params.get("link");
    var startDate = params.get("startDate");
    var endDate = params.get("endDate");

    console.log(link + startDate + endDate)

    //
    var xHotelPrice =document.querySelector("#x-hotelPrice")
    var xHotelComment =document.querySelector("#x-hotelComment")
    var xHotelLocation =document.querySelector("#x-hotelLocation")
    var xHotelName =document.querySelector("#x-hotelName")
    var xTestImg1 =document.querySelector("#x-testImg-1")
    var xTestImg2 =document.querySelector("#x-testImg-2")
    var xTestImg3 =document.querySelector("#x-testImg-3")

    LoadingWithMask() // 로딩화면
    fetch("/reserve/get?startDate="+startDate+"&endDate="+endDate+"&link="+link)
    .then(function(response) {
    return response.json();
})
    .then(function(result) {
    if (result.status == "fail") {
    window.alert("서버 요청 오류!");
    console.log(result.data);
    return;
}
    console.log(result);
    console.log(result["hotel"]);
    console.log(result["hotel"].data);
    var hotel = result["hotel"];

    xHotelPrice.innerHTML = hotel.hotelPrice+" 원";
    xHotelComment.innerHTML = hotel.hotelComment;
    xHotelLocation.innerHTML = hotel.hotelLocation;
    xHotelName.innerHTML = hotel.hotelName;
    xTestImg1.setAttribute("src",hotel.imgUrl[0]);
    xTestImg2.setAttribute("src",hotel.imgUrl[1]);
    xTestImg3.setAttribute("src",hotel.imgUrl[2]);
    closeLoadingWithMask()
});


    function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $(document).height();
    var maskWidth  = window.document.body.clientWidth;

    //화면에 출력할 마스크를 설정해줍니다.
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg ='';

    loadingImg +="<div id='loadingImg'>";
    loadingImg +=" <img src='../img/Loading.gif' style='position: relative; top:260px; display: block; margin: 0px auto;'/>";
    loadingImg +="</div>";

    //화면에 레이어 추가
    $('body').append(mask)
    $('#mask').append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    $('#mask').css({
    'width' : maskWidth
    ,'height': maskHeight
    ,'opacity' :'0.95'
});

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').show();
}
    function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();
}


document.querySelector("#air-link-btn").onclick = function (){
        location.href="./reserv.html"
}
