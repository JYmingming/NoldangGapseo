import { defaultTagList, addTravelTag, getTravel, setRoute } from '../common/api/apiList.js';
import { urlSearch } from '../common/urlSearchParam.js';

var no = urlSearch('travelId');

// ----- 선택한 태그들 배열 ----
let selectTagIds = [];

// ---- tag renderin View ----
const makeTagView = (id, name) => {
    const tagView = `<div class="tag col-2 default" data-id=${id}>${name}</div>`;
    return tagView;
};

let period = '';
const travelId = no;

// ---- 기본 태그를 불러온다. ----
(async function () {
    const travelRes = await getTravel(no);
    period = travelRes?.travel?.dday;
    console.log(period);
    const response = await defaultTagList();
    response?.map((m) => {
        $('#default-box').append(makeTagView(m.tagId, m.tagName));
    });
})();

// ---- 태그들을 default-box 와 favor-box로 이동한다.
$(document).on('click', '.default', function (e) {
    $(this).removeClass('default');
    $(this).addClass('favor');
    $('#favor-box').append($(this));
});
$(document).on('click', '.favor', function (e) {
    $(this).removeClass('favor');
    $(this).addClass('default');
    $('#default-box').append($(this));
});

$('.confirm-btn').on('click', async function (e) {
    for (var i = 0; i < $('#favor-box').children().length; i++) {
        const tag = {
            tagId: '',
        };
        tag.tagId = $('#favor-box').children().eq(i).attr('data-id');
        selectTagIds.push(tag);
    }
    console.log(selectTagIds);
    if (selectTagIds == undefined) {
        alert('태그를 설정해 주세요');
        return;
    }
    const tagResponse = await addTravelTag(no, selectTagIds);
    console.log(tagResponse);
    if (tagResponse.resCode == '0000') {
        const routeResponse = await setRoute(no, period, selectTagIds);
        console.log(routeResponse);
        if (routeResponse.resCode == '0000') {
            location.href = '/travel/list/list.html';
            return;
        }
    }
    return;
});
