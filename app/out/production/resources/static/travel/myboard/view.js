// ----뒤로가기 화살표-----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/myboard.html';
});

// ---- 주소 검색 ----
$('#in-adress').on('click', function (e) {
    e.preventDefault();
    findAddr();
});

// ---- 주소 검색 function ----
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

// ---- Delete Event ----
$('.btn-danger').on('click', function (e) {
    Swal.fire({
        title: '정말로 삭제 할까요?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('삭제되었습니다.', '', 'success');
        }
    });
});
