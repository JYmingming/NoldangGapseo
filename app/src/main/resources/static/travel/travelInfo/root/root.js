import { urlSearch } from '../../../common/urlSearchParam.js';

const no = urlSearch('travelId');
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
//(function () {
$('#des-container').sortable({
    //group: 'list',
    //animation: 200,
    //ghostClass: 'ghost',
    //onSort: reportActivity,
    items: '.des-box',
    start: function (event, ui) {
        console.log('sortStart!');
        ui.item.data('start_pos', ui.item.index());
        console.log(ui.item.data('start_pos'));
    },
});
//})();

const response = await getRoute();

response = ['A', 'B', 'C', 'D'];

function reportActivity() {
    console.log('The sort order has changed');
}
