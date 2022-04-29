import { getDes } from '../../../common/api/apiList.js';


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
            src=${m.img}
            class="d-block h-auto w-100"
            alt="..."
            style="border-radius: 20px"
            />
        </div>
        `;
       

     
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
    location.href = '/adminPage/admin/report.html';
});




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
            window.close();
        return;
        }
    });
});

