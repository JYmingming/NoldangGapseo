import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();

var xProfile = document.querySelector(".user_photo");
var xInfoNick = document.querySelector("#x-infoNick");
var xInfoEmail = document.querySelector("#x-infoEmail");

fetch("/user/getLoginUser")
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    console.log(result.data);
    
     
 var user = result.data;
 
 
 xProfile.src = user.profileImg;
 xInfoNick.innerHTML = user.nickName;
 xInfoEmail.innerHTML = user.email;
 
 
 var name = user.nickName;
 var no = user.userId
 
 const WishListImg = document.querySelectorAll(".myImg")
 
 fetch(`/user/likesImg?userId=${no}`)
        .then(function(response) {
              return response.json();
            })
            .then(function(result) {
              console.log(result);
              
              for (var i = 0; i < 5; i++) {
                    WishListImg[i].src =result[3*i].img;
                    var no1 = result[0].destinationId;
                    var no2 = result[3].destinationId;
                    var no3 = result[6].destinationId;
                    var no4 = result[9].destinationId;
                    var no5 = result[12].destinationId;
                  $("#d-flex1").on("click", function(e) {

                  location.href = `/userDestination/userDestinationDtl3.html?desId=${no1}`
                  })
                  $("#d-flex2").on("click", function(e) {

                  location.href = `/userDestination/userDestinationDtl3.html?desId=${no2}`
                  })
                  $("#d-flex3").on("click", function(e) {

                  location.href = `/userDestination/userDestinationDtl3.html?desId=${no3}`
                  })
                  $("#d-flex4").on("click", function(e) {

                  location.href = `/userDestination/userDestinationDtl3.html?desId=${no4}`
                  })
                  $("#d-flex5").on("click", function(e) {

                  location.href = `/userDestination/userDestinationDtl3.html?desId=${no5}`
                  })
                }
      })
      $('#img2').on('click', function (e) {
    e.preventDefault();
    location.href = `../invite/invitedList.html?nickName=${name}`;
  });
        
})
 




var swiper = new Swiper('.swiper', {
    slidesPerGroup: 4,
    slidesPerView: 4,
    direction: getDirection(),
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        resize: function () {
            swiper.changeDirection(getDirection());
        },
    },
});

function getDirection() {
    var windowWidth = window.innerWidth;
    var direction = window.innerWidth <= 760 ? 'vertical' : 'horizontal';

    return direction;
}

