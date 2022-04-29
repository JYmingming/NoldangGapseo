import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();

var xProfile = document.querySelector(".user_photo");
var xInfoNick = document.querySelector("#x-infoNick");
var xInfoEmail = document.querySelector("#x-infoEmail");

fetch("/user/getLoginUser")
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result.data);

 var user = result.data;

 xProfile.src = user.profileImg;
 xInfoNick.innerHTML = user.nickName;
 xInfoEmail.innerHTML = user.email;
     

var arr = location.href.split('?');

if (arr.length == 1) {
    alert('요청 형식이 옳바르지 않습니다.');
    throw 'URL 형식 오류!';
}

var qs = arr[1];

// 쿼리 스트링에서 email 값을 추출한다.
var params = new URLSearchParams(qs);
var no = params.get("nickName");

if (no == null) {
    alert('게시물 번호가 없습니다.');
    throw '파라미터 오류!';
}

var name = user.nickName;

$('#img2').on('click', function (e) {
    e.preventDefault();
    location.href = `../invite/invitedList.html?nickName=${name}`;
  });

let a;

const inviteNick = document.querySelectorAll("#td-nick")

fetch(`/user/inviteList?nickName=${no}`)
  .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result);
        
            for (var i = 0; i < 8; i++) {
              inviteNick[i].innerHTML =result[i].invitedNickName;
              }
})

let c;

const InviteTravel = document.querySelectorAll("#td-travel")

fetch(`/user/inviteList?nickName=${no}`)
  .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result);
        
            for (var i = 0; i < 8; i++) {
              InviteTravel[i].innerHTML =result[i].travelName;
              }
      })
      
      


});