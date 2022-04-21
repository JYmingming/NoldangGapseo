import {
     dotoList,
    addDoto,
    setDotoStatus,
    updateDoto,
    deleteDoto,
} from '../../common/api/apiList.js';

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
        const dotoView = `<div class="content-box w-50 d-flex flex-column align-items-center">
            <div class="todo-col w-100 d-flex justify-content-sm-around align-items-center"
            data-id=${m.dotoId}
            >
                <input type="checkbox" class="form-check-input"
                    ${m.status == 0 ? '' : 'checked'}/>
                <input type="text" class="t-todo w-75" value="${m.name}" />
                <div class="delete-btn">❌</div>
            </div>
        </div>`;
        $('.todo-content').append(dotoView);
    });
})();
// ===== todo 추가 =====
const newDoto = $('.input-name');

// ---- todo 추가 함수 ----
const addNewDoto = async (id, newName) => {
    if (newName == '') {
        Swal.fire({
            icon: 'error',
            title: 'Todo 항목을 작성해 주세요',
            text: 'something is missing',
        });
    } else {
        const todoRes = await addDoto(id, newName);
        if (todoRes?.resCode == '0000') {
            location.reload();
        }
    }
};

// ---- todo 추가 이벤트 -----
newDoto.on('keyup', function (key) {
    if (key.keyCode == 13) {
        addNewDoto(no, newDoto.val());
    }
});

$('.confirm-btn').on('click', function (e) {
    addNewDoto(no, newDoto.val());
});

// ===== todo상태 변경 ====

$(document).on('click', '.form-check-input', async function (e) {
    const todoId = $(this).closest('div').attr('data-id');
    const status = $(this).is(':checked') ? 1 : 0;
    setDotoStatus(dotoId, status);
});

// ==== todo 항목 업데이트 ====
$(document).on('change', '.t-todo', function (e) {
    const dotoId = $(this).closest('div').attr('data-id');
    const text = $(this).val();
    updateDoto(dotoId, text);
});

// ==== todo 지우기 ====
$(document).on('click', '.delete-btn', async function (e) {
    const dotoId = $(this).closest('.todo-col').attr('data-id');
    const response = await deleteDoto(dotoId);
    $(this).closest('.content-box').remove();
});

//