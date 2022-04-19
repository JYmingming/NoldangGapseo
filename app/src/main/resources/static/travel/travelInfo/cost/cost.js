import { costList, addCost } from '../../../common/api/apiList.js';

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
let costArr = new Array();
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
    console.log(list);
    list?.map((m) => {
        $('.cost-content').append(costView(m.costId, m.cost, m.name));
        costArr.push(m.cost);
    });
    sumCost();
})();

// ---- cost 합계 함수 ----
const sumCost = () => {
    const result = costArr.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);
    $('.total-cost').html(result.toLocaleString('ko-KR', option));
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
            costArr.push(addResponse.cost);
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
});

costInput.on('keyup', function (e) {
    newCost.name = nameInput.val();
    newCost.cost = costInput.val();
    if (e.key == 'Enter') {
        addCost(newCost);
    }
});
