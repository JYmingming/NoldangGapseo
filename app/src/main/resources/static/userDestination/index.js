"use strict"

var titleInput = $("#x-title-input");
titleInput.css("display", "none");

var tbody = $("#x-todo-table tbody");
console.log(titleInput)
$("#x-todo-input").keyup(function(e) {

  if (e.keyCode == 27) {
    $(e.target).val("");

  } else if (e.keyCode == 13) {
    if ($(e.target).val() == "") {
      //window.alert("필수 입력 항목이 비어 있습니다.");
      Swal.fire("필수 입력 항목이 비어 있습니다.");
      return;
    }
    
              // 1) URL에서 쿼리스트링(query string)을 추출한다.
          var arr = location.href.split("?");
          console.log(arr);

          if (arr.length == 1) {
            alert("요청 형식이 옳바르지 않습니다.")
            throw "URL 형식 오류!";
          }

          var qs = arr[1];
          console.log(qs);

          //2) 쿼리 스트링에서 desId 값을 추출한다.
          var params = new URLSearchParams(qs);
          var no = params.get("desId");
          console.log(no);

          //동적으로 변화줄 elements 선택    
          //제목
          var title = document.querySelector(".title");
          //아이디
          var nickName = document.querySelector(".nickName");
          //등록일  
          var regDate = document.querySelector(".regDate");
          //이미지 경로 1, 2, 3,
          var img = document
              .querySelectorAll(".d-block.h-auto.w-100");

          var content = document.querySelector(".content");

          //좋아요 수
          var btnLikeCnt = document.querySelector(".btn-like-cnt");
          console.log(btnLikeCnt)
          //댓글 수   
          var btnCommentCnt = document
              .querySelector(".btnCommentCnt");
          //주소
          var address = document.querySelector(".address");

          // 3) 서버에서 데이터 가져오기
          fetch(`/destination/getDes?desId=${no}&type=N`)

      .then(function(response) {
        console.log(response)
        return response.json();
      })
      .then(function(result) {
        if (result.status == "success") {
          location.reload();
        } else {
          alert(result.data);
        }
      });
  }
});

fetch("/todo/list")
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result);
    for (var todo of result.data) {
      var checkedOption = "";
      var titleTdOption = "";
      if (todo.done) {
        checkedOption = "checked";
        titleTdOption = "class='todo-checked'";
      }
      $("<tr>").attr("data-no", todo.no)
               .html(`<td><input type="checkbox" ${checkedOption} onchange="checkTodo(${todo.no}, event.target.checked)"></td>
                      <td class="todo-title"><span ${titleTdOption}>${todo.title}</span></td>
                      <td><button type="button" class="btn btn-primary btn-sm" onclick="updateTodo(${todo.no})">변경</button></td>
                      <td><button type="button" class="btn btn-primary btn-sm" onclick="deleteTodo(${todo.no})">삭제</button></td>`)
               .appendTo(tbody);
    }
    $("#x-todo-input").focus();
  });

function deleteTodo(no) {
   fetch(`/todo/delete?no=${no}`)
     .then(function(response) {
       return response.json();
     })
     .then(function(result) {
       if (result.status == "fail") {
         window.alert(result.data);
       } else {
         location.reload();
       }
     });
 }

function checkTodo(no, checked) {
   console.log(no, checked);
   fetch(`/todo/check?no=${no}&done=${checked}`)
     .then(function(response) {
       return response.json();
     })
     .then(function(result) {
       if (result.status == "fail") {
         window.alert(result.data);
       } else {
         var titleSpan = $(`tr[data-no="${no}"] > td.todo-title > span`);
         if (checked) {
           titleSpan.addClass("todo-checked");
         } else {
           titleSpan.removeClass("todo-checked")
         }
       }
     });
}

function updateTodo(no) {
   // 현재 Todo 항목을 편집 중인 상태에서 변경 버튼을 눌렀다면
   if (titleInput.parent()[0] instanceof HTMLTableCellElement) {
     // 다른 항목을 편집하기 위해 이동하기 전에 편집 전의 상태로 되돌린다.
     titleInput.parent().find("span").css("display", "");
   }
   var titleTd = $(`tr[data-no="${no}"] > td.todo-title`);
   var titleSpan = titleTd.find("span");
   titleSpan.css( "display", "none" );
   titleInput.val( titleSpan.html() );
   titleInput.attr("data-no", no);
   titleTd.append(titleInput);
   titleInput.css("display", "");
}

titleInput.keyup(function(e) {
   var no = titleInput.attr("data-no");
   var titleSpan = titleInput.parent().find("span");
   var originTitle = titleSpan.html();

   if (e.keyCode == 27) { // ESC 키를 눌러 편집을 취소한다면
     cancelTodoEditing();
   } else if (e.keyCode == 13 && titleInput.value != "" && originTitle != titleInput.value) {
     fetch(`/todo/update?no=${no}&title=${titleInput.val()}`)
       .then(function(response) {
         return response.json();
       })
       .then(function(result) {
         if (result.status == "fail") {
           window.alert(result.data);
         } else {
           console.log("변경했습니다.");
           titleSpan.html( titleInput.val() );
           cancelTodoEditing();
         }
       });
   }
 });

function cancelTodoEditing() {
   titleInput.parent().find("span").css("display", "");
   titleInput.css("display", "none");
   $(document.body).append(titleInput);
}