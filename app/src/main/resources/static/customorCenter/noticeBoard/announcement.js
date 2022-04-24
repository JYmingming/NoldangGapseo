//검색어
$(document).ready(function(){
  $(".clicked").trigger('click')
  
//공지사항//
$(".b-button").click(function(event){
  $(".b-button").removeClass("clicked");
  $(event.target).addClass("clicked");
});

//검색 날짜 조회//
    $(function() {
        $("#datepicker1,#datepicker2").datepicker({
           dateFormat: 'yy-mm-dd' //달력 날짜 형태
           ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
           ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
           ,changeYear: true //option값 년 선택 가능
           ,changeMonth: true //option값  월 선택 가능                
           ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
           ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
           ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
           ,buttonText: "선택" //버튼 호버 텍스트              
           ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
           ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
           ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
           ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
           ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
           ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
           ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)  
       });                    
       
       //초기값을 오늘 날짜로 설정해줘야 합니다.
       $('#datepicker').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)            
   });
 
});

//공지테이블//


function view(arg) {
  var t1 = document.getElementById("view1");
  var t2 = document.getElementById("view2");
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
          $("#tb1").append("<tr><td>"+(i+1)+"</td><td>"+dat.title+"</td><td>"+dat.reg_date.substring(0, 10)+"</td><td>"+dat.view_count+"</td></tr>");
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
          $("#tb2").append("<tr><td>"+(i+1)+"</td><td>"+dat.title+"</td><td>"+dat.nick_name+"</td><td>"+dat.reg_date.substring(0, 10)+"</td><td>"+answer+"</td></tr>");
        });
      },
    });
  }
}