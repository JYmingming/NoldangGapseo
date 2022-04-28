
 
function login(){
            var loginForm = document.loginForm;
            var content = loginForm.content.value;
            var title = loginForm.title.value;
            
            if(!content || !title){
                alert("제목과 내용을 모두 입력해주세요.")
            }else{
            loginForm.submit();
            document.getElementById("modal").style.display="block";
            }
        }
