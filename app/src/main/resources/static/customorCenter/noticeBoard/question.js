$(document).ready(function(){  
  document.getElementById("registration").onclick = function() {
        document.getElementById("modal").style.display="block";
    }
   
    document.getElementById("modal_close_btn").onclick = function() {
        document.getElementById("modal").style.display="none" ;
    }   
 })