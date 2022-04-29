import { getDes } from '../common/api/apiList.js';

import { urlSearch } from '../common/urlSearchParam.js';

// ---- URLSearchParams ----
const no = urlSearch('desId');

(async function () {
    const response = await getDes(no, 'N');
    console.log(response);
    const destination = response.destination;
    // ---- 사진 리스트 ----
    const imgList = response.destinationImgList;
    //const firstImg = response.destinationImList[0];

    imgList?.map((m, index) => {
        //console.log(m);
        // ---- 첫번째 사진 ----
        const firstImgView = `     
        <div class="carousel-item active" data-bs-interval="3000" data-imgId=${m.destinationImgId}>
            <img
            src="${m.img}"
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
            src="${m.img}"
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

    $('.like-cnt').html(response);
    $('.des-name').html(destination.destinationName);
    $('.des-contents').html(destination.contents);
    $('#d-address').html(destination.address);
    $('#d-phone').html(destination.phone);
})();
