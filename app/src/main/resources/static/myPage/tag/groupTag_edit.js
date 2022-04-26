import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();


var xInfoNick = document.querySelector("#x-infoNick");
var xInfoEmail = document.querySelector("#x-infoEmail");
var xProfile = document.querySelector(".user_photo");

fetch("/user/getLoginUser")
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result.data);
    
    
 var user = result.data;
 
 xInfoNick.innerHTML = user.nickName;
 xInfoEmail.innerHTML = user.email;
 xProfile.src = user.profileImg;
         
var name = user.nickName;
         
$('#img4').on('click', function (e) {
    e.preventDefault();
    location.href = `../invite/invitedList.html?nickName=${name}`;
});
})


