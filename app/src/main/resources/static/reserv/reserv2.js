var listUl = document.querySelector(".result-list");
document.querySelector("#search-btn").onclick =function (){
    fetch("/reserve/get?startDate=2022-04-25&endDate=2022-04-26&link=L")
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
    location.href = `/reserv/reserv2_detail.html?startDate=2022-04-25&endDate=2022-04-26&link=${dataLink}`;
});


document.querySelector("#air-link-btn").onclick = function (){
    location.href="./reserv.html"
}