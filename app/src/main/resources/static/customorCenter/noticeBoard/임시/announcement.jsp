<!DOCTYPE html>
<html lang="en" dir="ltr">
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<head>
  <meta charset="utf-8">
  <title>Noldang</title>
  <link rel="stylesheet" type="text/css" href="announcement.css">
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="announcement.js" type="text/javascript"></script>
  <link rel="stylesheet" href="../../node_modules/bootstrap/dist/css/bootstrap.min.css" />
    <script>
            $(document).ready(function () {
                $('.headers').load('../../common/header/header.html');
            });
    </script>
</head>
<body>
<div class="headers"></div>

<div id="container">                  <!-- 몸통 전체 -->

  <div id="body">
    <div id="body-a">
      <span id="announcement-center" >공지사항/Q&A</span> 
    </div>
    
    <div id="body-b">
        <input id="search" type="search" 
        placeholder="검색어를 입력해주세요">
        <img id= "search-img" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png">
        <img id="img-3" src="img/b1.jpg"> 
        <div id="s-text">
          <p><span style="color: orange;">궁굼한 점</span>이 있으면 검색해주세요
        </div>
        <div id="date-box">
        <input type="text" id="datepicker1">
        <input type="text" id="datepicker2">
        </div>
    </div>
    
    <div id="body-d">
      <table>
        <tr>
         <th><input class="b-button clicked" type="button" value="공지사항" onClick="view(1)"></th>
         <th><input class="b-button" type="button" value="Q&A" onClick="view(2)"></th>
        </tr>  
      </table> 
    </div>
    
    <div id= "body-e">
  
      <div id="view1">
      <form id="view-box">
       <p>전체<span style="color: orange;">100</span>건
        <select name="view" >
          <option value="up views" selected>조회수 높은순</option>
          <option value="down views">조회수 낮은순</option>
          <option value="new date">최신 등록일</option>
          <option value="old date">예전 등록일</option>
        </select>
      </form>

      <table id="tb1">
        <tbody>
          <tr><th>No.</th><th>제목</th><th>등록일</th><th>조회수</th></tr>
          <c:forEach var="item" items="${list}">
          <tr>
            <td>#{item.title}</td>
            <td>#{item.regdate}</td>
            <td>#{item.viewcount}</td>
          </tr>
          </c:forEach>
        </tbody>
      </table> 
      <button id="back" onclick="location.href='noticeBoard.html'">뒤로가기</button>
      </div>



      <div id="view2">
        <form id="view-box">
       <p>전체<span style="color: orange;">100</span>건
        <select name="view" >
          <option value="all" selected>전체 글</option>
          <option value="answer">완료된 답변</option>
          <option value="new date">최신 등록일</option>
          <option value="old date">예전 등록일</option>
        </select>
       </form>
       <button id="myquestion" onclick="location.href='myquestion.html'">내질문관리</button>
        <table id="tb2">
         <tbody>
          <tr><th>No.</th><th>제목</th><th>작성자</th><th>등록일</th><th>답변상태</th></tr>
         </tbody>
        </table>
        <button id="back" onclick="location.href='noticeBoard.html'">뒤로가기</button>
        <button id="question" onclick="location.href='question.html'">질문하기</button>
      </div>
      
     </div>
    
    
    
    
    <div id="page">
      <a class=page-a href="" type="button">《</a>
      <a class=page-a href="" type="button">1</a>
      <a class=page-a href="" type="button">2</a>
      <a class=page-a href="" type="button">3</a>
      <a class=page-a href="" type="button">4</a>
      <a class=page-a href="" type="button">5</a>
      <a class=page-a href="" type="button">》</a>
    </div>
    
    
    
  </div>
</div>

</body>
</html>