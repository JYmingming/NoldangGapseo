import {
    getTravel,
    updateTravelName,
    findByNickName,
    deleteTravel,
} from '../../common/api/apiList.js';
import { urlSearch } from '../../common/urlSearchParam.js';

var no = urlSearch('travelId');

let startDate;
let endDate;
// ---- 여행정보 불러오기 ----
// ---- 화면 렌더링 ----
(async function () {
    const response = await getTravel(no);
    //console.log('reponse:::', response);
    startDate = response?.travel.startDate;
    endDate = response?.travel.endDate;
    //console.log('date:::', startDate, endDate);
    //console.log('rep:::', response.travel.travelName);
    $('.travel-name').html(response.travel.travelName);
    if (response.travel.travelName.length > 6) {
        $('.travel-name').css('font-size', 20);
    }
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
    response.tagList?.map((m) => {
        console.log(m);
        const tagView = `<div class="tag col-3">${m.tagName}</div>`;
    $('.tagList').append(tagView);
    });
})();

// ===== 모달 ======

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

// ==== 여행 이름 바꾸기 ====
// ---- 이름 바꾸기 함수 ----
const getNewName = async () => {
    let name = $('#name-input').val();
    const response = await updateTravelName(no, name);
    if (response?.resCode == '0000') {
        $('.travel-name').html(response?.data);
        $('#nameModal').modal('hide');
    }
    if (response?.data.length > 6) {
        $('.travel-name').css('font-size', 20);
    }
    return;
};
// ---- 이름 바꾸기 이벤트 ----
// ---- Confirm 버튼 ----
$('.name-btn').on('click', function (e) {
    getNewName();
});
// ---- Enter ----
$('#name-input').on('keyup', function (key) {
    if (key.keyCode == 13) {
        getNewName();
    }
});

// ==== 닉네임 찾기 ====
// ---- 닉네임 찾기 함수 ----
const getUser = async (nickName) => {
    const user = await findByNickName(nickName);
    let searchView;
    user?.map((m) => {
        if (m?.nickName !== 'NoldangAdmin') {
            searchView = `<div class="s-nickName">${m?.nickName}</div>`;
        }
    });
    $('.search-box').append(searchView);
    //return user?.nickName;
};
// ---- 닉네임 찾기 이벤트 ----
$('#invite-input').on('input', function (e) {
    let nickName = $(this).val();

    getUser(nickName);

    //$('#invite-input').toggle();
});

const delTravel = async () => {
    const delRes = await deleteTravel(no);
    console.log(delRes);
    if (delRes?.resCode == '0000') {
        location.href = '/travel/list/list.html';
        return;
    }
};

//---- 여행 지우기 이벤트 ----
$('.delete-btn').on('click', async function (e) {
    Swal.fire({
        title: '정말로 삭제 할까요?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
    }).then((result) => {
        if (result.isConfirmed) {
            delTravel();
        }
    });
});

// ----뒤로가기 화살표-----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/list/list.html';
});
