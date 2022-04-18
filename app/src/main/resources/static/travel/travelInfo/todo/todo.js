import { todoList } from '../../../common/api/apiList.js';

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

(async function () {
    // ---- 화면 렌더링 ----
    const list = await todoList(no);
    list?.map((m) => {
        console.log(m);
        const todoView = `<div class="content-box w-50 d-flex flex-column align-items-center">
            <div class="todo-col w-100 d-flex justify-content-sm-around align-items-center"
            data-id=${m.todoId}
            >
                <input type="checkbox" class="form-check-input" value=${m.status}/>
                <div class="c-cost">${m.name}</div>
            </div>
        </div>`;
        $('.todo-content').append(todoView);
    });
})();

$('.input-name').on('keyup', function (key) {
    if (key.keyCode == 13) {
        if ($('.input-name').val() == '') {
            alert('jdkldjkl;;');
        }
    }
});
