export function urlSearch(id) {
    // ---- URLSearchParams ----
    var arr = location.href.split('?');

    if (arr.length == 1) {
        alert('요청 형식이 옳바르지 않습니다.');
        throw 'URL 형식 오류!';
    }

    var qs = arr[1];

    // 쿼리 스트링에서 email 값을 추출한다.
    var params = new URLSearchParams(qs);
    var no = params.get(id);

    if (no == null) {
        throw '파라미터 오류!';
    }
    return no;
}
