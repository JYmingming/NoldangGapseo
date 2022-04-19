import { costList } from '../../../common/api/apiList.js';

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
let costArr = new Array();

const option = {
    maximumFractionDigits: 4,
};
(async function () {
    // ---- 화면 렌더링 ----
    const list = await costList(no);
    console.log(list);
    list?.map((m) => {
        const listView = `  <div class="content-box w-100 d-flex flex-column align-items-center">
                        <div class="cost-col w-75 d-flex justify-content-between" data-id=${
                            m.costId
                        }>
                            <input type="text" class="c-name w-50 c-in" value="${m.name}" />
                            <input type="text" class="c-cost c-in"
                            value="${m?.cost?.toLocaleString('ko-KR', option)}"
                             />
                            <div class="delete-btn">❌</div>
                        </div>
                        <div class="con-line w-75"></div>
                    </div>`;

        $('.cost-content').append(listView);
        costArr.push(m.cost);
    });
    console.log(costArr);
    console.log(sumCost());
})();

// ---- cost 합계 함수 ----
const sumCost = () => {
    const result = costArr.reduce(function add(sum, currValue) {
        return sum + currValue;
    }, 0);
    return result.toLocaleString('ko-KR', option);
};
