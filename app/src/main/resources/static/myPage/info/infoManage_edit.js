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
var xProfile = document.querySelector(".user_photo");
var xInfoNick = document.querySelector("#x-infoNick");
var xInfoEmail = document.querySelector("#x-infoEmail");

var UBtn = document.querySelector("#btn2");
    
    
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
    var name = user.nickName;
     
    xNick.value = user.nickName;
    xPhoneNumber.value = user.phone;
    xEmail.value = user.email;
    xProfile.src = user.profileImg;
    xInfoNick.innerHTML = user.nickName;
    xInfoEmail.innerHTML = user.email;
    
    $('#img2').on('click', function (e) {
    e.preventDefault();
    location.href = `../invite/invitedList.html?nickName=${name}`;
});
  });
  
function css(selector, name, value) {
    var el = document.querySelectorAll(selector);
    for (var e of el) {
        e.style[name] = value;
    }
}
  
css('.nickName-check-ok','visibility','hidden');
css('.nickName-check-no',`visibility`,'hidden');
let nickNameCheck = 0; //닉네임 중복 여부
$('input[name=nickName]').keyup(function() {
    let nickNameKeyup = $(this).val();
    console.log(nickNameKeyup);
    fetch("/user/search/nickNameCall?nickName="+nickNameKeyup)
        .then(function (response) {
            return response.json();
        }).then(function (result) {
        if (result.status == "fail") {
            window.alert("서버 요청 오류!");
            console.log(result.data);
            return;
        }
        if(result.length==0){
            css('.nickName-check-ok','display','');
            css('.nickName-check-no','display','none');
            css('.nickName-check-ok','visibility','');
            css('.nickName-check-no','visibility','');
            nickNameCheck = 0;
        }else{
            css('.nickName-check-ok','display','none');
            css('.nickName-check-no',`display`,'');
            nickNameCheck = 1;
        }
    })
})
  
     
UBtn.onclick = function() {
  
  document.querySelector("#update-form").onsubmit = function() {
            if ( xNick.value == "" || xPhoneNumber.value == "" ) {
                return false;
            }
    }
  
  var fd = new FormData(document.querySelector("#update-form"));
  //if (xReadDate.value == "") { // 독서일을 지정하지 않았으면 서버에 보내지 않는다.
   // fd.delete("readDate");
  //}
    
  // 변경할 독서록 데이터의 PK 값을 FormData에 추가한다.
  fetch("/user/update", {
      method: "POST",
      body: new URLSearchParams(fd)
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      
      if (result.resStatus == "success") {
        window.alert("내 정보 수정이 완료되었으니 다시 로그인해 주세요!");
        fetch("/user/signout").then(function(response) {
            location.href = "../../indexPage/index.html";
        });
      } else {
        window.alert("닉네임이 중복되었습니다! 다른 닉네임을 사용해주세요.");
        console.log(result.data);
        console.log(result.resStatus);
      }
      
    });
    
    
};

$('#col4').on('click', function (e) {
    e.preventDefault();
    location.href = `withDrawal.html?userId=${no}`;
});


      
