var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get('travelId');

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}

// ---- 뒤로가기 ----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = `/travel/travelInfo/travelInfo.html?travelId=${no}`;
});

var swiper = new Swiper('.swiper', {
    slidesPerGroup: 3,
    slidesPerView: 3,
    direction: getDirection(),
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        resize: function () {
            swiper.changeDirection(getDirection());
        },
    },
});

function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
}

// ---- map ----
var container = document.getElementById('map');

var options = {
    center: new kakao.maps.LatLng(33.374, 126.557),
    level: 9,
};
var map = new kakao.maps.Map(container, options);

// ---- 여행지 sort ----

(function () {
    $('.des-box').draggable();
})();
