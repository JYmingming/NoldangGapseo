// ------입력값------
const title = $('#in-title');
const contents = $('#in-contents');
const tag = $('.d-tag');
const file = $('.d-file-up');
const adress = $('.d-adress');

// ----d-tag에 선택 태그 값 넣기----
$('.tag-btn').on('click', function (e) {
    e.stopPropagation();

    // tag 색 바꾸기
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
    } else {
        $(this).addClass('active');
    }
    $('active').css({ 'background-color': '#0d6efd', color: 'white' });

    let t = $(e.target).data('val');
    $('.d-tag').attr('tagVal', t);
});

// -----입력값 널체크-----
$('.confirm-btn').on('click', function (e) {
    console.log('title::::', file.val());
    if (
        title.val() == '' ||
        contents.val() == '' ||
        tag.attr('tagVal') == undefined ||
        adress.val() == '' ||
        file.val() == ''
    ) {
        Swal.fire({
            icon: 'error',
            title: '위의 항목들을 모두 입력해주세요',
            text: 'something is missing',
        });
    }
});

// ---- 주소 api ----
$('.adress-btn').on('click', function (e) {
    e.preventDefault();
    findAddr();
});

function findAddr() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            //document.querySelector('member_post').value = data.zonecode;
            if (roadAddr !== '') {
                document.querySelector('#in-adress').value = roadAddr;
            } else if (jibunAddr !== '') {
                document.querySelector('#in-adress').value = jibunAddr;
            }
        },
    }).open();
}

// ---- 뒤로가기 화살표 -----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/myboard.html';
});
