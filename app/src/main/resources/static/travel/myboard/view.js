import { getDes, getLoginUser, deleteDes, updateDes } from '../../common/api/apiList.js';
import { urlSearch } from '../../common/urlSearchParam.js';

// ---- URLSearchParams ----
const no = urlSearch('desId');

// ---- 회원정보 가져오기 ----
let user;
// ---- reponse 변수 ----
let destinationId;

let desTypeId;

// ---- 화면 렌더링 ----
(async function () {
    user = await getLoginUser();
    const response = await getDes(no, 'U');

    destinationId = response.destination.destinationId;

    desTypeId = response.destination.destinationTypeId;
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
    const phone = response.destination.phone;
    $('.in-title').val(title);
    $('#in-address').val(address);
    $('#in-contents').val(contents);
    $('#in-phone').val(phone);
})();

// ----뒤로가기 화살표-----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/myboard.html';
});

// ---- 주소 검색 ----
$('#in-address').on('click', function (e) {
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
                document.querySelector('#in-address').value = roadAddr;
            } else if (jibunAddr !== '') {
                document.querySelector('#in-address').value = jibunAddr;
            }
        },
    }).open();
}

// ---- Delte Destination function ----
const delDes = async () => {
    const delteRes = await deleteDes(destinationId);
    if (delteRes.resCode == '0000') {
        Swal.fire('삭제되었습니다.', '', 'success');
        location.href = '/travel/myboard/myboard.html';
        return;
    }
};

// ---- Delete Event ----
$('.btn-danger').on('click', function (e) {
    Swal.fire({
        title: '정말로 삭제 할까요?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
    }).then((result) => {
        if (result.isConfirmed) {
            delDes();
            return;
        }
    });
});

const des = {
    destinationId: destinationId,
    destinationName: $('.in-title').val(),
    address: $('.in-address').val(),
    phone: $('.in-phone').val(),
    contents: $('.in-contents').val(),
    destinationTypeId: '',
};
// ---- Update Event ----
$('#update-btn').on('click', async function (e) {
    des.destinationId = destinationId;
    des.destinationName = $('.in-title').val();
    des.address = $('#in-address').val();
    des.phone = $('#in-phone').val();
    des.contents = $('#in-contents').val();
    des.destinationTypeId = desTypeId;
    e.preventDefault();
    e.stopPropagation();
    const updateRes = await updateDes(des);
    if (updateRes.resCode == '0000') {
        location.href = '/travel/myboard/myboard.html';
    }
});
