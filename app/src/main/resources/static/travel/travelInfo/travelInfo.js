import { getTravel } from '../../common/api/apiList.js';

// ---- URLSearchParams ----
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

// ---- 여행정보 불러오기 ----
// ---- 화면 렌더링 ----
(async function () {
    const response = await getTravel(no);
    console.log('reponse:::', response);
    //console.log('rep:::', response.travel.travelName);
    $('.travel-name').html(response.travel.travelName);
    $('.cost').html(response.travel?.totalCost);
    $('.leader').html(response.travel.nickName);
    $('.travel-period').html(response.travel.period);
    response.todoList?.map((m) => {
        const todo = `<div class="todo">🍊 ${m.name}</div>`;
        $('.todo-list').append(todo);
    });
    response.companionList?.map((m) => {
        const companion = `<div class="comp-list col-sm-12 d-flex align-items-center">
                            <div class="pro-img"></div>
                            <div class="user-nic">${m.nickName}</div>
                        </div>`;
        if (m.state == 'Y') {
            $('.travel-companion-box').append(companion);
        }
    });
})();

// --------모달----------

// 모달 닫기
$('.btn-close').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
});

// 여행이름 모달
$('.travel-name').click(function (e) {
    e.preventDefault();
    $('#nameModal').modal('show');
});

// 동행자 모달
$('.invite-box').click(function (e) {
    e.preventDefault();
    $('#compModal').modal('show');
});

// 날씨 모달
$('.travel-weather').click(async function (e) {
    e.preventDefault();
    // $('#weatherModal').modal('show');
    //const ddd = await travelList('정창성장판이안닫혀서성장통이심해');
    // const ddd = await userList();
    // console.log(ddd);
    //const DATE = '2022-04-08 04:20:43.000';

    //'const realdate = await dateFormat('-', DATE);
    //console.log('formatDate:::::', realdate);
});

// ---------------------------

// ------새창-------

// 여행 비용
$('.travel-cost').click(function (e) {
    e.preventDefault();
    window.open(`./cost/travelCost.html?travelId=${no}`);
});

// 여행 투두
$('.travel-todo').click(function (e) {
    e.preventDefault();
    window.open(`./todo/travelTodo.html?travelId=${no}`);
});

$('.travel-route').click(function (e) {
    e.preventDefault();
    location.href = `./root/travelRoot.html?travelId=${no}`;
});

export function ddd() {
    console.log('dkdkd');
}

// (async function () {
//     const oo = await userList();
//     oo.map((m) => {
//         console.log('oo:::', m.nickName);
//     });
// })();

// ----뒤로가기 화살표-----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/list/list.html';
});
