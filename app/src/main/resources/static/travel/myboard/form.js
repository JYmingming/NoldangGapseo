// ------입력값------
const title = $('#in-title');
const contents = $('#in-contents');
const tag = $('.d-tag');

// ----d-tag에 선택 태그 값 넣기----
$('.tag-btn').on('click', function (e) {
    e.stopPropagation();
    let t = $(e.target).data('val');
    $('.d-tag').attr('tagVal', t);
});

// -----입력값 널체크-----
$('.confirm-btn').on('click', function (e) {
    console.log('title::::', $(tag).attr('tagVal'));
    if ($(title).val() == '' || $(contents).val() == '' || $(tag).attr('tagVal') == undefined) {
        alert('입력값이 빠졌습니다.');
    }
});

// ----뒤로가기 화살표-----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/myboard.html';
});
