//검색어
$(document).ready(function(){
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

//공지테이블//
function view(arg) {
  var t1 = document.getElementById("tb1");
  var t2 = document.getElementById("tb2");
  
  if(arg == 1 ) {
    t1.style.display="block";
    t2.style.display="none";
  } 
  else {
    t2.style.display="block";
    t1.style.display="none";
  }
}