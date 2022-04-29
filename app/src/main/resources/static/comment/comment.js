import { getLoginUser, addComment, getCom, updateComment } from '../common/api/apiList.js';

var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

const qs = arr[1];
console.log(qs);

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
const desId = params.get('desId');
const commentId = params.get('commentId');
const type = params.get('type');
console.log(desId);
console.log(commentId);
console.log(type);

let id;
(async function () {
    const userId = await getLoginUser();
    id = userId.data.userId;
    if (commentId != null) {
        const com = await getCom(commentId, type);
        console.log(com);
        $('#in-contents').val(com);
    }
})();

const comment = {
    commentId: '',
    destinationId: '',
    userId: '',
    contents: '',
};

$('#confirm-btn').on('click', async function (e) {
    comment.commentId = commentId;
    comment.destinationId = desId;
    comment.userId = id;
    comment.contents = $('#in-contents').val();
    if (commentId == null) {
        const response = await addComment(comment, type);
        if (response.resCode == '0000') {
            window.history.back();
        }
    }
    const upRes = await updateComment(comment, type);
    if (upRes.resCode == '0000') {
        window.history.back();
    }
});
