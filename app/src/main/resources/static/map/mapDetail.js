import {
    getDes,
    getLoginUser,
    checkLike,
    delCom,
    addLike,
    delLike,
} from '../common/api/apiList.js';

import { urlSearch } from '../common/urlSearchParam.js';

// ---- URLSearchParams ----
const no = urlSearch('desId');
let userId;
let userNickName;

// 댓글 Rendering
const commentView = (nickName, regDate, content, commentId) => {
    const view = `<div class="comment-box d-flex flex-column" data-id=${commentId}>
                    <div class="comment-user d-flex">
                        <div class="c-profile-img"></div>
                        <div class="user-nic align-self-center">${nickName}</div>
                    </div>
                    <div class="c-content">${content}</div>
                      <div class="report-box d-flex justify-content-between">
                        <div class="c-regDate">${regDate}</div>
                        <div class="c-rud d-flex align-items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-exclamation-triangle report"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
                                />
                                <path
                                    d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
                                />
                            </svg>
                            ${
                                userNickName == nickName
                                    ? `<div class="update">수정</div>
                                        <div class="delete">삭제</div>`
                                    : ''
                            }
                        </div>
                    </div>
                    <div class="c-line align-self-center"></div>
                </div>`;

    $('.comment-container').append(view);

    return view;
};

// ---- 데이터 불러오기 ----
(async function () {
    // ---- 로그인한 유저 정보 값을 가져온다. ----
    const id = await getLoginUser();
    userId = id.data.userId;
    userNickName = id.data.nickName;
    const chLike = await checkLike(no, id.data.userId);
    // 좋아요 체크
    console.log('frist::', $('.like-btn').attr('check'));
    if (userId == chLike.data) {
        $('.like-btn').addClass('l-check');
        $('.like-btn').attr('check', 'true');
        console.log('last::', $('.like-btn').attr('check'));
    }
    const response = await getDes(no, 'N');
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
            class="d-block  w-100"
            alt="..."
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
            />
        </div>
        `;

        // ---- map의 인덱스에 따라 다른 화면을 렌더링 해준다 (active 때문) ----
        index == 0
            ? $('.carousel-inner').prepend(firstImgView)
            : $('.carousel-inner').append(otherImgView);
    });

    $('.like-cnt').html(response.destination.likesCnt);
    $('.des-name').html(destination.destinationName);
    $('.des-contetnts').html(destination.contents);
    $('#d-address').html(destination.address);
    $('#d-phone').html(destination.phone);
    $('.review-box')
        .children('div')
        .children('.review-colum')
        .next()
        .html(response.commentList.length);

    response.commentList?.map((m) => {
        //console.log(m);
        commentView(m.nickName, m.regDate, m.contents, m.commentId);
    });
})();

// ---- 댓글 추가 이벤트 ----
$('.add-comment').on('click', function (e) {
    location.href = `/comment/comment.html?desId=${no}&type=N`;
});

// ---- 댓글 업데이트 이벤트 ----
$(document).on('click', '.update', function (e) {
    let commentId = $(this).closest('.comment-box').attr('data-id');
    location.href = `/comment/comment.html?desId=${no}&commentId=${commentId}&type=N`;
});

// ---- 댓글 삭제 이벤트 ----
$(document).on('click', '.delete', async function (e) {
    let commentId = $(this).closest('.comment-box').attr('data-id');
    console.log(commentId);
    const delRes = await delCom(commentId, 'N');
    if (delRes.resCode == '0000') {
        location.reload();
    }
});

let like = $('.like-btn');
let likeCnt = $('.like-cnt');
// ---- 좋아요 추가 삭제 ----
$('.like-btn').on('click', async function (e) {
    console.log(typeof likeCnt.text());

    if (like.attr('check') == 'false') {
        const addRes = await addLike(no, userId);
        if (addRes == 1) {
            like.attr('check', 'true');
            like.addClass('l-check');
            likeCnt.html(Number(likeCnt.text()) + 1);
        }
    } else {
        const dellRes = await delLike(no, userId);
        if (dellRes == 1) {
            like.attr('check', 'false');
            like.removeClass('l-check');
            likeCnt.html(Number(likeCnt.text()) - 1);
        }
    }
});
