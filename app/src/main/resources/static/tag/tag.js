import { defaultTagList, addTravelTag, getTravel } from '../common/api/apiList.js';
import { urlSearch } from '../common/urlSearchParam.js';

var no = urlSearch('travelId');

// ----- 선택한 태그들 배열 ----
let selectTagIds = [];
let selectTagName = [];

// ---- tag renderin View ----
const makeTagView = (id, name) => {
    const tagView = `<div class="tag col-2 default" data-id=${id}>${name}</div>`;
    return tagView;
};

const period = '';
const travelId = no;

// ---- 기본 태그를 불러온다. ----
(async function () {
    const travelRes = await getTravel(no);
    travelRes?.tagList?.map((m) => {
        selectTagName.push(m.tagName);
    });
    console.log(travelRes);
    console.log(selectTagName);
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

    // const response = await addTravelTag(no, selectTags);
    // console.log(response);
});
