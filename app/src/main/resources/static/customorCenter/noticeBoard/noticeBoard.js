



//검색어
$(document).ready(function(){
  
  $(".clicked").trigger('click')
  $(".a-button").click(function(event){
  $(".a-button").removeClass("clicked");
  $(event.target).addClass("clicked");
});

//공지사항//
$(".b-button").click(function(event){
  $(".b-button").removeClass("clicked");
  $(event.target).addClass("clicked");
});
 
});

function contentView(i){
  
    if($("#a_"+i).css('display') === 'none'){
      $("#a_"+i).show();
    }
    else {
      $("#a_"+i).hide();
    }
}

function contentView2(i){
  
    if($("#b_"+i).css('display') === 'none'){
      $("#b_"+i).show();
    }
    else {
      $("#b_"+i).hide();
    }
}

//공지테이블//
function view(arg) {
  var t1 = document.getElementById("tb1");
  var t2 = document.getElementById("tb2");
  var answer = "접수";
  
  if(arg == 1) {
    t1.style.display="block";
    t2.style.display="none";
    
    $.ajax({ 
      url: "/notice/list",
      type:"post",
      data:{type:'A'},
       success : function(data) {
        $("#tb1 td").remove();
        $.each(data, function(i, dat) {
          $("#tb1").append("<tr><td>"+(i+1)+"</td><td onclick='contentView("+i+")'>"+dat.title+"</td></tr><tr><td class='content' id='a_"+i+"' colspan='2'>"+dat.contents+"</td></tr>");
                    
        });
      },
    });
  } 
  else {
    t2.style.display="block";
    t1.style.display="none";
    
    $.ajax({ 
      url: "/notice/list",
      type:"post",
      data:{type:'Q'},
       success : function(data) {
        $("#tb2 td").remove();
        $.each(data, function(i, dat) {
          if (dat.view_count == "0") {
              answer = "접수";
            }else {
              answer = "답변완료"
            }
          $("#tb2").append("<tr><td>"+(i+1)+"</td><td onclick='contentView2("+i+")'>"+dat.title+"</td></tr><tr><td class='content' id='b_"+i+"' colspan='2'>"+dat.contents+"</td></tr>");
        });
      },
    });
  }
}