import { getLoginUser, getUserDesList, userDesCnt } from '../../common/api/apiList.js';

// -----return view function -----
const viewRender = (
    destinationId,
    thumbNailImg,
    destinationName,
    tagColor,
    destinationTypeName,
    likesCnt,
    commentsCnt
) => {
    const view = `<div class="content-card col" data-id="${destinationId}">
                    <div class="card">
                        <img
                        src="/destination/img?filename=${thumbNailImg}"
                        class="card-img-top c-img"
                        alt="NO IMAGE"
                        style="height: 13em"
                        />
                        <div class="card-body">
                            <div class="title d-flex justify-content-between">
                                <h5 class="card-title w-75">${destinationName}</h5>
                              <div class="d-tag" data-color=${tagColor}>${destinationTypeName}</div>
                            </div>
                            <div
                            class="card-text d-flex align-items-center justify-content-evenly w-50"
                            >
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-heart"
                                viewBox="0 0 16 16"
                                >
                                    <path
                                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                                    />
                                </svg>
                                <span class="hart-cnt">${likesCnt}</span>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                fill="currentColor"
                                class="bi bi-chat-left"
                                viewBox="0 0 16 16"
                                >
                                    <path
                                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                                    />
                                </svg>
                                <span class="comment-cnt">${commentsCnt}</span>
                            </div>
                        </div>
                    </div>
                </div>`;

    return view;
};
// ---- uesrId ----
let id;
// ---- userDesCnt ---
let desCnt;

// ---- paging Redering ----

// ---- 화면 렌더링 function ----
async function renderView(userId, limit, nextPage) {
    const list = await getUserDesList(userId, limit, nextPage);
    $('.content').children('.add-des').nextAll().remove();
    list?.map((m) => {
        //--- 태그 색 ----
        let tagColor;

        switch (m.destinationTypeName) {
            case '카페':
                tagColor = 'blue';
                break;
            case '명소':
                tagColor = 'green';
                break;
            case '맛집':
                tagColor = 'orange';
                break;
        }
        $('.content').append(
            viewRender(
                m.destinationId,
                m.thumbNailImg,
                m.destinationName,
                tagColor,
                m.destinationTypeName,
                m.likesCnt,
                m.commentsCnt
            )
        );
    });
}

var swiper = new Swiper('.swiper', {
    slidesPerGroup: 3,
    slidesPerView: 3,
    direction: getDirection(),
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        resize: function () {
            swiper.changeDirection(getDirection());
        },
    },
});

function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
}

(async function () {
    // ---- 세션(userId)가져오기 ----
    const userId = await getLoginUser().then(function (res) {
        return res.data.userId;
    });
    id = userId;
    const cnt = await userDesCnt(userId);
    desCnt = Math.ceil(cnt / 7);
    console.log(cnt);

    renderView(id, 7, 1);

    for (var i = 0; i < desCnt; i++) {
        const pageView = `<div class="swiper-slide"><span>${i + 1}</span></div>`;

        $('.swiper-wrapper').append(pageView);
    }
})();

// -----새로운 여행지 추가-----
$('.add-des').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/form.html';
});

// ----여행지 수정 페이지 이동-----
$(document).on('click', '.card-img-top', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const dId = $(this).closest('.content-card').attr('data-id');
    location.href = `/travel/myboard/view.html?desId=${dId}`;
});

// ---- 페이징 -----
$(document).on('click', '.swiper-slide', function (e) {
    const num = $(this).children('span').text();
    console.log(num);
    renderView(id, 7, num);
});
