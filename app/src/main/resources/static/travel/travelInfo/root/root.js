// ---- 뒤로가기 ----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/travelInfo/travelInfo.html';
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
