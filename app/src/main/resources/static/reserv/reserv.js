var arr = location.href.split("?");
if (arr.length == 1) {
    alert("요청 형식이 옳바르지 않습니다.")
    throw "URL 형식 오류!";
}
var qs = arr[1];
console.log(qs);
var params = new URLSearchParams(qs);
var travelNo = params.get("travelNo");
var startDate = params.get("startDate");
var endDate = params.get("endDate");

document.querySelector("#start-date").innerHTML = startDate;
document.querySelector("#end-date").innerHTML = endDate;

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
        if(peopleCnt.innerHTML=="0명"){
            alert("인원을 선택해주세요");
            return;
        }

        LoadingWithMask();
        fetch(`/reserve/getAir?startDate=${searchParam.startDate}&endDate=${searchParam.endDate}&startLocation=${searchParam.startLocation}`)
            .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            for (var air of result){
                if (air.airFlag==1){
                    var tr = document.createElement("tr")
                    tr.classList.add('result-tr');
                    tr.setAttribute("data-type",`${air.airType}`);
                    tr.setAttribute("data-startTime",`${air.airStartTime}`);
                    tr.setAttribute("data-endTime",`${air.airEndTime}`);
                    tr.setAttribute("data-price",`${air.airPrice}`);
                    tr.setAttribute("data-flag",`0`);

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
                    tr.classList.add('result-tr2');
                    tr.setAttribute("data-type",`${air.airType}`);
                    tr.setAttribute("data-startTime",`${air.airStartTime}`);
                    tr.setAttribute("data-endTime",`${air.airEndTime}`);
                    tr.setAttribute("data-Price",`${air.airPrice}`);
                    tr.setAttribute("data-flag",`0`);
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
            closeLoadingWithMask();
        })
};



let clickParam = {
    type:'',
    price: 0,
    startTime: '',
    endTime: '',
    people: 0
};
let clickParam2 = {
    type:'',
    price: 0,
    startTime: '',
    endTime: '',
    people: 0
};

let startFlag =0;
let endFlag =0;



document.querySelector("#people-num").value;

$('body').on('click','[class=result-tr]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (startFlag==0){
        $(this).attr("data-flag","1");
        $(this).css('background-color','#f2f2f2');
        clickParam.type = $(this).attr('data-type');
        clickParam.startTime = $(this).attr('data-startTime');
        clickParam.endTime = $(this).attr('data-endTime');
        clickParam.price = $(this).attr('data-price');
        clickParam.people = (document.querySelector("#people-cnt").innerHTML).replace("명","");
        startFlag=1;
    }else if (startFlag==1 && $(this).attr('data-flag')==1){
        $(this).attr("data-flag","0");
        $(this).css('background-color','');
        clickParam.type = '';
        clickParam.startTime = '';
        clickParam.endTime = '';
        clickParam.price = 0;
        clickParam.people = (document.querySelector("#people-cnt").innerHTML).replace("명","");
        startFlag=0;
    }
    if(startFlag==1&&endFlag==1){
        document.querySelector("#price-sum").innerHTML=((parseInt(clickParam.price)+parseInt(clickParam2.price))*clickParam.people)+"원";
    }else{
        document.querySelector("#price-sum").innerHTML="0원";
    }
    console.log(clickParam);
});

$('body').on('click','[class=result-tr2]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (endFlag==0){
        clickParam2.type = $(this).attr('data-type');
        clickParam2.startTime = $(this).attr('data-startTime');
        clickParam2.endTime = $(this).attr('data-endTime');
        clickParam2.price = $(this).attr('data-price');
        $(this).attr("data-flag","1");
        $(this).css('background-color','#f2f2f2');
        endFlag=1;
    }else if (endFlag==1 && $(this).attr('data-flag')==1){
        clickParam2.type = '';
        clickParam2.startTime = '';
        clickParam2.endTime = '';
        clickParam2.price = 0;
        $(this).attr("data-flag","0");
        $(this).css('background-color','');
        endFlag=0;
    }
    if(startFlag==1&&endFlag==1){
        document.querySelector("#price-sum").innerHTML=((parseInt(clickParam.price)+parseInt(clickParam2.price))*clickParam.people)+"원";
    }else{
        document.querySelector("#price-sum").innerHTML="0원";
    }
    console.log(clickParam2);
});


function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $(document).height();
    var maskWidth  = window.document.body.clientWidth;

    //화면에 출력할 마스크를 설정해줍니다.
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
    var loadingImg ='';

    loadingImg +="<div id='loadingImg'>";
    loadingImg +=" <img src='../img/Loading.gif' style='position: relative; top:300px; display: block; margin: 0px auto;'/>";
    loadingImg +="</div>";

    //화면에 레이어 추가
    $('body').append(mask)
    $('#mask').append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    $('#mask').css({
        'width' : maskWidth
        ,'height': maskHeight
        ,'opacity' :'0.8'
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

document.querySelector("#hotel-link-btn").onclick = function (){
    location.href=`./reserv2.html?startDate=${startDate}&endDate=${endDate}&travelNo=${travelNo}`
}