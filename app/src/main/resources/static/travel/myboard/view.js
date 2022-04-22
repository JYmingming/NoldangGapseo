import { getDes } from '../../common/api/apiList.js';

// ---- URLSearchParams ----
var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get('desId');

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}
// ---- reponse 변수 ----
let destinationId;

// ---- 화면 렌더링 ----
(async function () {
    const response = await getDes(no, 'N');
    console.log(response);
    destinationId = response.destination.destinationId;
    // ---- 사진 리스트 ----
    const imgList = response.destinationImgList;
    //const firstImg = response.destinationImList[0];

    imgList?.map((m, index) => {
        // ---- 첫번째 사진 ----
        const firstImgView = `     
        <div class="carousel-item active" data-bs-interval="3000" data-imgId=${m.destinationImgId}>
            <img
            src=/destination/img?filename=${m.img}
            class="d-block h-auto w-100"
            alt="..."
            style="border-radius: 20px"
            />
        </div>
        `;
        // ---- 나머지 사진 ----
        const otherImgView = `     
        <div class="carousel-item" data-bs-interval="3000" data-imgId=${m.destinationImgId}>
            <img
            src=/destination/img?filename=${m.img}
            class="d-block h-auto w-100"
            alt="..."
            style="border-radius: 20px"
            />
        </div>
        `;

        // ---- map의 인덱스에 따라 다른 화면을 렌더링 해준다 (active 때문) ----
        index == 0
            ? $('.carousel-inner').append(firstImgView)
            : $('.carousel-inner').append(otherImgView);
    });

    const title = response.destination.destinationName;
    const type = response.destination.destinationTypeName;
    const address = response.destination.address;
    const contents = response.destination.contents;
    $('.in-title').val(title);
    $('#in-address').val(address);
    $('#in-contents').val(contents);
})();

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
// ---- Update Event ----
$('#update-btn').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(destinationId);
});
