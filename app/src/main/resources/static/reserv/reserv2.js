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

var listUl = document.querySelector(".result-list");
document.querySelector("#search-btn").onclick =function (){
    fetch(`/reserve/get?startDate=${startDate}&endDate=${endDate}&link=L`)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            if (result.status == "fail") {
                window.alert("서버 요청 오류!");
                console.log(result.data);
                return;
            }
            var hotels = result["hotels"];
            for (var hotel of hotels) {
                var li = document.createElement("li");
                li.classList.add('result-item');
                li.innerHTML=`
                <div class="item-line-1">
                    <img src="${hotel[4]}">
                </div>
                <div class="item-line-2">
                    <h5>${hotel[0]}</h5>
                    <p>
                      <br><br>
                      <span>평점 [ ${hotel[1]} ]</span>
                      <span>주소 : ${hotel[2]}</span>
                    </p>
                </div>
                <div class="item-line-3">
                <h4>${hotel[3]}</h4>
                <button class="reserv-btn" data-no="${hotel[5]}">바로예약</button>
                </div>`
                listUl.appendChild(li)
            }
        });
}



    $('body').on('click','[class=reserv-btn]', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const dataLink = $(this).attr('data-no');
    location.href = `/reserv/reserv2_detail.html?startDate=${startDate}&endDate=${endDate}&link=${dataLink}`;
});


document.querySelector("#air-link-btn").onclick = function (){
    location.href=`./reserv.html?startDate=${startDate}&endDate=${endDate}&travelNo=${travelNo}`
}