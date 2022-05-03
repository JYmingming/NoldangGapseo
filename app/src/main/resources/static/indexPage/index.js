import { get4Des, addTravel } from '../common/api/apiList.js';
// 로그인 세션 확인
css('.login', 'display', 'none');
css('.admin-login', 'display', 'none');

fetch('/user/getLoginUser')
    .then(function (response) {
        return response.json();
    })
    .then(function (result) {
        if (result.resStatus == 'success') {
            document.querySelector('#user-name').innerHTML = result.data.nickName;
            css('.login', 'display', '');
            css('.not-login', 'display', 'none');
            console.log('로그인');
            travel.userId = result.data.userId;
        }
        if (result.data.userId == 1) {
            console.log('어드민 로그인');
            css('.admin-login', 'display', '');
        }
        var user = result.data;
        var no = user.userId;

        $('#myPage').on('click', function (e) {
            e.preventDefault();
            location.href = `../myPage/main/myPageMain.html?userId=${no}`;
        });
    });

document.querySelector('#logout-btn').onclick = function () {
    fetch('/user/signout').then(function (response) {
        location.href = 'index.html';
    });
};

//css 함수
function css(selector, name, value) {
    var el = document.querySelectorAll(selector);
    for (var e of el) {
        e.style[name] = value;
    }
}

// 로그인
var xEmail = document.querySelector('input[name=email]');
var xPassword = document.querySelector('input[name=password]');

document.querySelector('form[name=form1]').onsubmit = function () {
    if (xEmail.value == '' || xPassword.value == '') {
        window.alert('필수 입력 항목이 비어 있습니다.');
        return false;
    }
    var fd = new FormData(document.forms.namedItem('form1'));

    fetch('/user/signin', {
        method: 'POST',
        body: new URLSearchParams(fd),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            if (result.resStatus == 'success') {
                location.href = '/indexPage/index.html';
            } else {
                window.alert('로그인 실패!');
            }
        });
    return false;
};
document.querySelector('#go_home').onclick = function () {
    location.href = '/indexPage/index.html';
};

// 카카오맵 api 설정
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(33.374, 126.557),
    level: 9,
};
var map = new kakao.maps.Map(container, options);

//datepicker

$(function () {
    //모든 datepicker에 대한 공통 옵션 설정
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd', //Input Display Format 변경
        showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
        changeYear: false, //콤보박스에서 년 선택 가능
        changeMonth: false, //콤보박스에서 월 선택 가능
        //,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
        buttonImage: 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif', //버튼 이미지 경로
        buttonImageOnly: true, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        buttonText: '선택', //버튼에 마우스 갖다 댔을 때 표시되는 텍스트
        /*,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트*/
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //달력의 월 부분 텍스트
        monthNames: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월',
        ], //달력의 월 부분 Tooltip 텍스트
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'], //달력의 요일 부분 Tooltip 텍스트
        minDate: '-0D', //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        maxDate: '+3M', //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
    });

    //input을 datepicker로 선언
    $('#datepicker_start').datepicker();
    $('#datepicker_end').datepicker();

    //From의 초기값을 오늘 날짜로 설정
    $('#datepicker_start').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    //To의 초기값을 내일로 설정
    $('#datepicker_end').datepicker('setDate', '+1D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
});

// 4여행지

(async function () {
    const fourDes = await get4Des();

    for (var i = 0; i < fourDes.length; i++) {
        const imageView = ` <img
                        src="${fourDes[i].thumbNailImg}"
                        class="four-img"
                        alt="NO IMAGE"
                        />`;
        $('.col-3').children('span').eq(i).html(fourDes[i].destinationName);
        console.log(fourDes[i].thumbNailImg);
        $('.col-3').children('div').eq(i).append(imageView);
    }
})();

const travel = {
    startDate: '',
    endDate: '',
    travelName: '',
    userId: '',
    color: '',
};

// ---- 여행 포스트잇 색 랜덤으로 정하기 -----
const stikyColor = ['blue', 'green', 'brown', 'purple', 'orange', 'yellow'];

function readomCardColor(arr) {
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
}

document.querySelector('#datepicker_start').onchange = function () {
    travel.startDate = document.querySelector('#datepicker_start').value;
    console.log(travel.startDate);
};
document.querySelector('#datepicker_end').onchange = function () {
    travel.endDate = document.querySelector('#datepicker_end').value;
    console.log(travel.endDate);
};

document.querySelector('#thema-btn').onclick = function () {
    travel.travelName = document.querySelector('#thema-input').value;
    $('#themaModal').modal('hide');
};

document.querySelector('#makeDec-btn').onclick = async function () {
    console.log(
        '시작일:' +
            travel.startDate +
            '종료일 :' +
            travel.endDate +
            '여행이름' +
            travel.travelName +
            '아이디번호' +
            travel.userId
    );
    travel.color = readomCardColor(stikyColor);
    if (travel.userId == '') {
        alert('로그인이 필요합니다.');
        return;
    } else if (travel.startDate == '' || travel.endDate == '' || travel.travelName == '') {
        alert('값을 입력해주세요.');
        return;
    }
    console.log('만들기 성공!');
    const response = await addTravel(travel);
    console.log('response.data:::::', response);
    if (response.resCode == '0000') {
        location.href = `/tag/tag.html?travelId=${response.data}`;
    }
    return;
};
// 여행 이름을 설정 하고 확인 버튼을 누르면
// travel.startDate = startDate.value;
// travel.endDate = enddate.value;
// travel.travelName = trvelName.value;

// => travel을 넣어주면 됌

var listUl = document.querySelector('#result-list');
fetch('/destination/users/list')
    .then(function (response) {
        return response.json();
    })
    .then(function (result) {
        console.log('jjjjjjjj', result);
        if (result.status == 'fail') {
            window.alert('서버 요청 오류!');
            return;
        }
        for (let i = 0; i < 3; i++) {
            console.log(result[i]);
            var li = document.createElement('li');
            li.classList.add('list-group');
            li.innerHTML = `
                <div class="travel-list">
                                <figure class="img-con" style="background-image: url('/img/destination/userDesImg/${result[i].thumbNailImg}')"></figure>
                                <div class ="travel-text-group">
                                    <div class="travel-text-title">
                                        <h5>${result[i].destinationName}</h5>
                                    </div>
                                    <div class="travel-text-text">
                                        ${result[i].contents}
                                    </div>
                                </div>
                            </div>`;
            listUl.appendChild(li);
        }
    });

$('#map').on('click', function (e) {
    location.href = '/map/map.html';
});
