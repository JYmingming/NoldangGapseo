import { travelList, getLoginUser } from '../../common/api/apiList.js';

// --- stiky color ---
const stikyColor = ['blue', 'green', 'brown', 'purple', 'orange'];

function readomCardColor(arr) {
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
}
// ---- 화면 렌더링 ----
(async function () {
    const session = await getLoginUser();
    //console.log(session);
    const response = await travelList(session.data.nickName);
    response?.map((m) => {
        //console.log(m);
        //m => arr[i].name
        let cardColor = readomCardColor(stikyColor);
        let view = ` <div class="col-md-4 col-sm-6 content-card">
                    <div class="card-big-shadow">
                        <div
                            class="card card-just-text"
                            data-background="color"
                    data-color=${cardColor}
                            data-radius="true"
                            data-id=${m.travelId}
                        >
                            <div class="content">
                                <div class="d-flex justify-content-center align-items-center">
                                    <h4>D-</h4>
                                    <h4 class="card-day">${m.dday}</h4>
                                </div>
                                <h4 class="title">
                                    <a class="d-title">${m.travelName}</a>
                                </h4>
                                <p class="description">${m.period}</p>
                            </div>
                        </div>`;
        $('.row').append(view);
    });
    // --- 상세 페이지로 넘어가기 ----
    $('.card').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const id = $(this).attr('data-id');
        location.href = `/travel/travelInfo/travelInfo.html?travelId=${id}`;
    });
})();
