//검색어

$(document).ready(function(){
    $.ajax({ 
      url: "/notice/list",
      type:"post",
      data:{type:'Q'},
       success : function(data) {
        console.log(data);
        $.each(data, function(i, dat) {
          if (dat.view_count == "0") {
              answer = "접수";
            }else {
              answer = "답변완료"
            }
          $("#tb1").append("<tr><td>"+(i+1)+"</td><td>"+dat.title+"</td><td>"+dat.nick_name+"</td><td>"+dat.reg_date.substring(0, 10)+"</td><td>"+answer+"</td><td><button onclick='upd("+dat.servicecenterid+")'>수정</button></td><td><button onclick='del("+dat.servicecenterid+")'>삭제</button></td></tr>");
        });
      },
    });
});

function upd(i){
  location.href="update.html?serviceid="+i;
  
}


function del(i){
  console.log(i);
  
  if(confirm("정말 삭제하시겠습니까?")){
    $.ajax({
    url : "/notice/delete", 
      method: "post",
      data : {"idx" : i+""},
      success : function(data){
        
        alert("글이 삭제 되었습니다.");
        location.reload();
      }
    })
  }
}
