import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();

/*// ---- URLSearchParams ----
var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get('userId');

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}
*/

    var xNick = document.querySelector("#id_edit");
    var xPhoneNumber = document.querySelector("#phoneNum_edit");
    var xEmail = document.querySelector("#email_edit");
    
    
    fetch("/user/getLoginUser")
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result.data);
        
        
         var user = result.data;
         
         xNick.value = user.nickName;
         xPhoneNumber.value = user.phone;
         xEmail.value = user.email;
      })
     
     fetch("/user/infoUpdate")
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result);
        })