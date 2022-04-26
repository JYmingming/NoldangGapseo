import { getLoginUser, getUserDesList } from '../../common/api/apiList.js';

// ----- 화면 렌더링 -----
(async function () {
    // ---- 세션(userId)가져오기 ----
    const userId = await getLoginUser().then(function (res) {
        return res.data.userId;
    });
    // ---- 리스트 가져오기 ----
    const list = await getUserDesList(userId);

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
        console.log(m.thumbNailImg);
        const view = `<div class="content-card col" data-id="${m.destinationId}">
                    <div class="card">
                        <img
                        src="/destination/img?filename=${m.thumbNailImg}"
                        class="card-img-top c-img"
                        alt="NO IMAGE"
                        style="height: 13em"
                        />
                        <div class="card-body">
                            <div class="title d-flex justify-content-between">
                                <h5 class="card-title">${m.destinationName}</h5>
                              <div class="d-tag" data-color=${tagColor}>${m.destinationTypeName}</div>
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
                                <span class="hart-cnt">${m.likesCnt}</span>
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
                                <span class="comment-cnt">${m.commentsCnt}</span>
                            </div>
                        </div>
                    </div>
                </div>`;

        $('.content').append(view);
    });
    // ----여행지 수정 페이지 이동-----
    $('.card-img-top').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const dId = $(this).closest('.content-card').attr('data-id');
        location.href = `/travel/myboard/view.html?desId=${dId}`;
    });
})();

// -----새로운 여행지 추가-----
$('.add-des').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/form.html';
});
