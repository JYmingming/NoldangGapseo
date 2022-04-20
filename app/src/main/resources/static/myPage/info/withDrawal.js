import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();


    var xNick = document.querySelector("#x-nick");
    var xInfoNick = document.querySelector("#x-infoNick");
    var xInfoEmail = document.querySelector("#x-infoEmail");
    
    fetch("/user/getLoginUser")
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result.data);
        
        
         var user = result.data;
         
         xNick.innerHTML = user.nickName;
         xInfoNick.innerHTML = user.nickName;
         xInfoEmail.innerHTML = user.email;
      })

        // 비밀번호 재확인
      
        var xPassword = document.querySelector("#password");

        document.querySelector("form[name=form1]").onsubmit = function() {
            if ( xPassword.value == "" ) {
                window.alert("필수 입력 항목이 비어 있습니다.");
                return false;
            }
            var fd = new FormData(document.forms.namedItem("form1"));

            fetch("/user/signin", {
                method: "POST",
                body: new URLSearchParams(fd)
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    if (result.resStatus == "success") {
                        location.href = "../info/password_change.html";
                    } else {
                        window.alert("비밀번호가 맞지 않습니다!")
                    }
                });
            return false;
        };

