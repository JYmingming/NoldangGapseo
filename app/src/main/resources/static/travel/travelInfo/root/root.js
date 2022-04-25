import { getRoutes, getPeriod } from '../../../common/api/apiList.js';
import { urlSearch } from '../../../common/urlSearchParam.js';

const no = urlSearch('travelId');

// ---- map ----
var container = document.getElementById('map');

var options = {
    center: new kakao.maps.LatLng(33.374, 126.557),
    level: 9,
};
var map = new kakao.maps.Map(container, options);

// var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

// var marker = new kakao.maps.Marker({
//     position: markerPosition,
// });
// marker.setMap(map);

// ---- 뒤로가기 ----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = `/travel/travelInfo/travelInfo.html?travelId=${no}`;
});

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
var marker, markerPosition;
async function getSchedule(i) {
    const route = await getRoutes(no, i);

    for (var i = 0; i < route.length; i++) {
        markerPosition = new kakao.maps.LatLng(route[i].latitude, route[i].longitude);
        console.log(markerPosition);

        marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        // var marker = new kakao.maps.Marker({
        //     map: map, // 마커를 표시할 지도
        //     position: positions[i].latlng, // 마커를 표시할 위치
        //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        // });
        marker.setMap(map);
    }
    //console.log(route);

    if (i == 1) {
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
    } else {
        $('#des-container').children().remove();
        route?.map((m) => {
            // markerPosition = new kakao.maps.LatLng(m.latitude, m.longitude);
            // console.log(markerPosition);

            // marker = new kakao.maps.Marker({
            //     position: markerPosition,
            // });

            // // var marker = new kakao.maps.Marker({
            // //     map: map, // 마커를 표시할 지도
            // //     position: positions[i].latlng, // 마커를 표시할 위치
            // //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            // // });
            // marker.setMap(map);
            $('#des-container').append(
                schedule(
                    m.routeIndex,
                    m.destinationId,
                    m.scheduleId,
                    m.typeName,
                    m.destinationName,
                    m.contents
                )
            );
        });
    }
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
//(function () {
$('#des-container').sortable({
    items: '.des-box',
    start: function (event, ui) {
        console.log('sortStart!');
        //ui.item.data('start_pos', ui.item.index());
        console.log(ui.item.attr('data-routeIndex'));
    },
});
//})();

function reportActivity() {
    console.log('The sort order has changed');
}

$(document).on('click', '.swiper-slide', function (e) {
    console.log($(this).children('span').text());
    getSchedule($(this).children('span').text());
});
