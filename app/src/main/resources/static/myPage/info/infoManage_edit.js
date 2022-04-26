import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();

var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get("userId");

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}

    var xNick = document.querySelector("#id_edit");
    var xPhoneNumber = document.querySelector("#phoneNum_edit");
    var xEmail = document.querySelector("#email_edit");
    
    var UBtn = document.querySelector("#btn2");
    var CBtn = document.querySelector("#check-btn");
    
    
    fetch(`/user/get?userId=${no}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
      if (result.status == "fail") {
        window.alert("서버 요청 오류!");
        console.log(result.data);
        return;
      }
        
         var user = result.data;
         
         xNick.value = user.nickName;
         xPhoneNumber.value = user.phone;
         xEmail.value = user.email;
      })
     
     UBtn.onclick = function() {
    
    
    var fd = new FormData(document.forms.namedItem("form1"));
      
    //if (xReadDate.value == "") { // 독서일을 지정하지 않았으면 서버에 보내지 않는다.
     // fd.delete("readDate");
    //}
    
    // 변경할 독서록 데이터의 PK 값을 FormData에 추가한다.
    
    fetch("/user/update", {
        method: "POST",
        body: new URLSearchParams(fd)
      }).then(function(response) {
        return response.json();
      })
      .then(function(result) {
        if (result.resStatus == "success") {
          window.alert("내 정보 변경 완료!");
          location.href = "infoManage.html";
        } else {
          window.alert("내 정보 변경 실패!");
          console.log(result.data);
          console.log(result.resStatus);
        }
      });
      }
      
      CBtn.onclick = function() {  
    fetch("/user/checkNickname")
    
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      if (xNick.value ==""){
      window.alert("중복확인을 하려면 닉네임을 입력해주세요");
      return;
      } else if(result.data.ncikName == 0){
      window.alert("사용가능한 닉네임입니다");
      return;
      } else if (result.data.ncikName == 1){
      window.alert("이미 사용중인 닉네임입니다");
      return;
      }
    });
   
  }
