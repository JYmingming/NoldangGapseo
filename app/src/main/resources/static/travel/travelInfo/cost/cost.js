import { costList, addCost, updateCost, deleteCost } from '../../../common/api/apiList.js';

// ---- URLSearchParams ----
var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get('travelId');

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}

// --- cost Array ---
let total = 0;
//--- toLocaleString option ----
const option = {
    maximumFractionDigits: 4,
};

const costView = (costId, cost, name) => {
    const view = `  <div class="content-box w-100 d-flex flex-column align-items-center">
                        <div class="cost-col w-75 d-flex justify-content-between" data-id=${costId}>
                            <input type="text" class="c-name w-50 c-in" value="${name}" />
                            <input type="text" class="c-cost c-in"
                            value="${cost?.toLocaleString('ko-KR', option)}"
                             />
                            <div class="delete-btn">❌</div>
                        </div>
                        <div class="con-line w-75"></div>
                    </div>`;
    return view;
};

(async function () {
    // ---- list불러오기 ----
    const list = await costList(no);
    list?.map((m) => {
        $('.cost-content').append(costView(m.costId, m.cost, m.name));
    });
    for (var i = 0; i < list.length; i++) {
        sumCost(list[i].cost, '+');
    }
    //sumCost(costArr, 0);
})();

// ---- cost 합계 함수 ----
const sumCost = (cost, colon) => {
    if (colon == '+') {
        total += Number(cost);
    } else {
        total -= Number(cost);
    }
    $('.total-cost').html(total?.toLocaleString('ko-KR', option));
};

// ===== cost add =====
const nameInput = $('.input-name');
const costInput = $('.input-cost');

const newCost = {
    travelId: no,
    name: '',
    cost: '',
};

// ---- 항목 작성 후 엔터 => costInput으로 foucus ----
nameInput.on('keydown', function (e) {
    if (e.key == 'Enter') {
        costInput.focus();
    }
});

// ---- cost add function ----
const addNewCost = async (cost = {}) => {
    if (cost.name == '' || cost.cost == '') {
        Swal.fire({
            icon: 'error',
            title: '항목과 비용을 \n모두 작성해 주세요',
            text: 'something is missing',
        });
        return;
    } else {
        const addResponse = await addCost(cost);
        if (addResponse != null) {
            $('.cost-content').prepend(
                costView(addResponse.costId, addResponse.cost, addResponse.name)
            );
            nameInput.val('');
            costInput.val('');
            return;
        }
    }
};

// ---- cost add event ----
$('.confirm-btn').on('click', function (e) {
    newCost.name = nameInput.val();
    newCost.cost = costInput.val();
    addNewCost(newCost);
    nameInput.focus();
    sumCost(costInput.val(), '+');
});

costInput.on('keyup', function (e) {
    newCost.name = nameInput.val();
    newCost.cost = costInput.val();
    if (e.key == 'Enter') {
        addNewCost(newCost);
        nameInput.focus();
        sumCost(costInput.val(), '+');
    }
});

// ====== COST UPDATE ======

const setCostObj = {
    costId: '',
    name: '',
    cost: '',
};

// ---- cost update function ----
const setCost = async (cost = {}) => {
    const response = await updateCost(cost);
    return response;
};

// ---- cost update event ----
$(document).on('change', '.c-name', function (e) {
    setCostObj.cost = Number($(this).next('.c-cost').val().replace(',', ''));
    setCostObj.name = $(this).val();
    setCostObj.costId = $(this).parent().attr('data-id');
    setCost(setCostObj);
});

$(document).on('change', '.c-cost', async function (e) {
    if (typeof Number($(this).val().replace(',', '')) != 'number') {
        Swal.fire({
            icon: 'error',
            title: '비용 항목에는 숫자를 적어 주세요!',
            text: 'something is missing',
        });
        return;
    }
    setCostObj.cost = Number($(this).val().replace(',', ''));
    setCostObj.name = $(this).siblings('.c-name').val();
    setCostObj.costId = $(this).parent().attr('data-id');
    const updateCost = await setCost(setCostObj);
    if (updateCost?.name != null) {
        location.reload();
    }
});

// ===== deleteCost =====
$(document).on('click', '.delete-btn', async function (e) {
    const costId = $(this).parent().attr('data-id');
    const response = await deleteCost(costId);
    if (response.resCode == '0000') {
        sumCost($(this).siblings('.c-cost').val().replace(',', ''), '-');
        $(this).closest('.content-box').remove();
    }
});
