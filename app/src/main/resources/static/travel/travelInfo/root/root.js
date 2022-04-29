import { getRoutes, getPeriod, updateRoute, invite } from '../../../common/api/apiList.js';
import { urlSearch } from '../../../common/urlSearchParam.js';

const no = urlSearch('travelId');

// ---- map ----
var container = document.getElementById('map');

var options = {
    center: new kakao.maps.LatLng(33.374, 126.557),
    level: 10,
};
var map = new kakao.maps.Map(container, options);

// 마커 이미지
var markerSrc = '../../../asset/img/travel/map_marker_icon.png';
var markerSize = new kakao.maps.Size(64, 69);
var markerOption = { offset: new kakao.maps.Point(27, 69) };

var markerImage = new kakao.maps.MarkerImage(markerSrc, markerSize, markerOption);

// ---- day View -----
const dayView = (day) => {
    const view = `<div class="swiper-slide">Day <span>${day}</span></div>`;
    return view;
};

// ---- schedule View ----
const schedule = (index, desId, si, type, name, content, lat, lon) => {
    const view = `<div class="des-box d-flex w-75" data-routeIndex=${index} data-desId=${desId} data-id=${si}>
                        <div class="d-content-wrap d-flex flex-column w-75 justify-content-around" data-lat=${lat} data-lon=${lon}>
                            <div class="des-header d-flex align-items-center">
                                <div class="d-kinds" data-color="blue" style="margin-left: 5%;margin-right: 5%;">${type}</div>
                                <h4 class="d-name w-75">${name}</h5>
                            </div>
                            <div class="des-body">
                                <h6 class="w-75" style="margin-left: 5%;">${content}</h6>
                            </div>
                        </div>
                        <div class="grap-wrap w-25">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-chevron-bar-expand" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </div>
                    </div>`;

    return view;
};

//maker배열
var markerList = [];
var CustomOverlayList = [];

// 루트 배열
let routeList;
function showMarker(routes) {
    // 마커 배열 map 초기화
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }

    for (let i = 0; i < CustomOverlayList.length; i++) {
        CustomOverlayList[i].setMap(null);
    }
    // 마커 표시
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const latLng = new kakao.maps.LatLng(route.latitude, route.longitude);
        const marker = new kakao.maps.Marker({
            map: map,
            position: latLng,
            image: markerImage,
            content: `<div class="marker">${route.routeIndex}<div>`,
        });
        markerList.push(marker);
        var content = `<div class="marker">${route.routeIndex}<div>`;

        // 커스텀 오버레이가 표시될 위치입니다
        // var position = new kakao.maps.LatLng(33.450701, 126.570667);

        // 커스텀 오버레이를 생성합니다
        const customOverlay = new kakao.maps.CustomOverlay({
            position: latLng,
            content: content,
        });

        // 커스텀 오버레이를 지도에 표시합니다
        customOverlay.setMap(map);
        CustomOverlayList.push(customOverlay);
    }
}

async function getSchedule(i) {
    const route = await getRoutes(no, i);
    routeList = route;
    showMarker(routeList);
    $('#des-container').children().remove();
    route?.map((m) => {
        $('#des-container').append(
            schedule(
                m.routeIndex,
                m.destinationId,
                m.scheduleId,
                m.typeName,
                m.destinationName,
                m.contents,
                m.latitude,
                m.longitude
            )
        );
    });
}

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

// ---- route 가져오기 ----
(async function () {
    const day = await getPeriod(no);

    for (var i = 0; i < day; i++) {
        let view = dayView(i + 1);
        $('.swiper-wrapper').append(view);
    }
    getSchedule(1);
})();

// ---- 여행지 sort ----
let idList;
let ids = [];
$('#des-container').sortable({
    items: '.des-box',
    start: function (event, ui) {
        console.log('start:::', day);
    },
    stop: async function (event, ui) {
        console.log('end point : ', ui.item.attr('data-routeIndex'));
        ids.splice(0);
        $('.des-box').each(function (i, tag) {
            ids.push($(tag).attr('data-id'));
        });
        idList = `${ids[0]},${ids[1]},${ids[2]},${ids[3]}`;
        const update = await updateRoute(idList);
        if (update.resCode == '0000') {
            getSchedule(day);
            showMarker(routeList);
        }
        return;
    },
});

function reportActivity() {
    console.log('The sort order has changed');
}

// ---- day Click Event ----
let day = 1;
$(document).on('click', '.swiper-slide', function (e) {
    //console.log($(this).children('span').text());
    day = $(this).children('span').text();
    $('.swiper-slide').removeClass('dayNum');
    $(this).addClass('dayNum');
    getSchedule($(this).children('span').text());
    showMarker(routeList);
});
