//검색어

$(document).ready(function(){
    $.ajax({ 
      url: "/notice/list",
      type:"post",
      data:{type:'Q'},
       success : function(data) {
        $.each(data, function(i, dat) {
          if (dat.view_count == "0") {
              answer = "접수";
            }else {
              answer = "답변완료"
            }
          $("#tb1").append("<tr><td>"+(i+1)+"</td><td>"+dat.title+"</td><td>"+dat.nick_name+"</td><td>"+dat.reg_date.substring(0, 10)+"</td><td>"+answer+"</td><td></td><td><button id='de' onclick='del("+i+")'>삭제</button></td></tr>");
        });
      },
    });
});



function del(i){
            deleteForm.submit(i);
}




/*function del(i){
  deleteForm.submit();
  var fd = new FormData();
  var No = i + 1;
  console.log(No)
  fd.append("service_center_id", No)
  fetch("/notice/delete", {
    method: "POST",
    body: fd
  }).then(function(response){
    return response.text();
  }).then(function(result){
    if (result == 0) {
      alert("해당 게시물 삭제를 실패했습니다")
    } else {
      alert("해당 게시물을 삭제했습니다")
      location.reload();
    }
  })
}*/
