
const searchParam = {
    startDate: '',
    endDate: '',
    startLocation: '',
    };

        var tbodyCode1 =document.querySelector("#air-code1")
        var tbodyCode2 =document.querySelector("#air-code2")
        var peopleCnt =document.querySelector("#people-cnt")
        var locationText1 =document.querySelector("#location-s")
        var locationText2 =document.querySelector("#location-d")
    document.querySelector("#search-submit-btn").onclick = function() {
        searchParam.startDate= document.querySelector("#start-date").innerHTML;
        searchParam.endDate= document.querySelector("#end-date").innerHTML;
        searchParam.startLocation= document.querySelector("#start-location").value;

        peopleCnt.innerHTML= document.querySelector("#people-num").value;
        locationText1.innerHTML = document.querySelector("#start-location").value;
        locationText2.innerHTML = document.querySelector("#start-location").value;
        fetch(`/reserve/getAir?startDate=${searchParam.startDate}&endDate=${searchParam.endDate}&startLocation=${searchParam.startLocation}`)
            .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            for (var air of result){
                if (air.airFlag==1){
                    var tr = document.createElement("tr")
                    tr.innerHTML= `
                                   <td><img src="${air.airUrl}"></td>
                                   <td>${air.airType}</td>
                                   <td>${air.airStartTime}</td>
                                   <td>${air.airEndTime}</td>
                                   <td>${air.airPrice}</td>
                                   `
                    tbodyCode1.appendChild(tr);
                }else{
                    var tr = document.createElement("tr")
                    tr.innerHTML= `
                                   <td><img src="${air.airUrl}"></td>
                                   <td>${air.airType}</td>
                                   <td>${air.airStartTime}</td>
                                   <td>${air.airEndTime}</td>
                                   <td>${air.airPrice}</td>
                                   `
                    tbodyCode2.appendChild(tr);
                }
            }//end for

        })
};



function test(imageName) {
    LoadingWithMask('your site\'s image path');
    setTimeout("closeLoadingWithMask()", 3000);
}

function LoadingWithMask(gif) {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $(document).height();
    var maskWidth  = window.document.body.clientWidth;

    //화면에 출력할 마스크를 설정해줍니다.
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg ='';

    loadingImg +=" <img src='"+ gif +"' style='position: absolute; display: block; margin: 0px auto;'/>";
    //화면에 레이어 추가
    $('body')
        .append(mask)
    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    $('#mask').css({
        'width' : maskWidth,
        'height': maskHeight,
        'opacity' :'0.3'
    });

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').append(loadingImg);
    $('#loadingImg').show();
}

function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').empty();
}


출처: https://kkamikoon.tistory.com/entry/Javascript-자바스크립트로-로딩중-화면-만들기로딩-표시 [컴퓨터를 다루다]