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
          $("#tb1").append("<tr><td>"+(i+1)+"</td><td>"+dat.title+"</td><td>"+dat.nick_name+"</td><td>"+dat.reg_date.substring(0, 10)+"</td><td>"+answer+"</td></tr>");
        });
      },
    });
});