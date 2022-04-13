import { mm, userList, dateFormat } from '../../common/api/apiList.js';

// ---- URLSearchParams ----
var arr = location.href.split('?');
console.log(arr);

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];
console.log(qs);

// 2) 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get('travelId');

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}
console.log(no);

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
    const DATE = '2022-04-08 04:20:43.000';

    const realdate = await dateFormat('-', DATE);
    console.log('formatDate:::::', realdate);
});

// ---------------------------

// ------새창-------

// 여행 비용
$('.travel-cost').click(function (e) {
    e.preventDefault();
    window.open('./cost/travelCost.html');
});

// 여행 투두
$('.travel-todo').click(function (e) {
    e.preventDefault();
    window.open('./todo/travelTodo.html');
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
