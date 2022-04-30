$(document).ready(function(){
  
   const urlParameter = window.location.search; /* ?serviceid=18 */
   var idx = urlParameter.substring(11);
   $("#idx").val(idx);
   $.ajax({ 
      url: "/notice/updateContent",
      type:"post",
      data:{idx:idx},
       success : function(data) {
        console.log(data);
          $("#title").val(data.title);
          $("#content").val(data.contents);
      },
    });
});

 

 
function login(){
  console.log("strt");
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
