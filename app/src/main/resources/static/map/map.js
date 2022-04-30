import { getAdminList } from '../common/api/apiList.js';

// ---- map ----
var container = document.getElementById('map');

var options = {
    center: new kakao.maps.LatLng(33.374, 126.557),
    level: 9,
};
var map = new kakao.maps.Map(container, options);

// 마커 이미지
var foodSrc = '/asset/img/map/food.png';
var cafeSrc = '/asset/img/map/premium-icon-cafe.png';
var desSrc = '/asset/img/map/premium-des.png';
var markerSize = new kakao.maps.Size(40, 40);
var markerOption = { offset: new kakao.maps.Point(20, 36) };

//maker배열
var markerList = [];
var CustomOverlayList = [];

var foodList = [];
var cafeList = [];

const setMarkerImg = (type) => {
    var img;
    switch (type) {
        case '맛집':
            img = new kakao.maps.MarkerImage(foodSrc, markerSize, markerOption);
            break;
        case '카페':
            img = new kakao.maps.MarkerImage(cafeSrc, markerSize, markerOption);
            break;
        case '명소':
            img = new kakao.maps.MarkerImage(desSrc, markerSize, markerOption);
            break;
    }
    return img;
};

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
            image: setMarkerImg(route.destinationTypeName),
            clickable: true,
        });
        markerList.push(marker);
        var content = `<div class="marker-p">${route.destinationName}<div>`;

        var con =
            '<div class="customoverlay">' +
            ` <a href="/map/mapDetail.html?desId=${route.destinationId}">` +
            `    <span class="title">${route.destinationName}</span>` +
            '  </a>' +
            '</div>';

        // 인포 위도우 표시
        var infowindow = new kakao.maps.InfoWindow({
            content: content,
        });

        var customOverlay = new kakao.maps.CustomOverlay({
            position: latLng,
            content: con,
            yAnchor: 2.3,
        });

        // 마커 이벤트
        // => hover 여행지 이름 표시
        // => out 사라짐
        kakao.maps.event.addListener(
            marker,
            'mouseover',
            makeOverListener(map, marker, customOverlay)
        );
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));

        kakao.maps.event.addListener(marker, 'click', go(route.destinationId));
    }
}

function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.setMap(map);
        //infowindow.open(map, marker);
    };
}

function makeOutListener(infowindow) {
    return function () {
        infowindow.setMap(null);
    };
}

function go(id) {
    return function () {
        location.href = `/map/mapDetail.html?desId=${id}`;
    };
}

(async function () {
    const destination = await getAdminList();
    console.log(destination);
    showMarker(destination);
})();
