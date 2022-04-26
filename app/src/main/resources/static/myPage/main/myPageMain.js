import { getLoginUser, findByNickName } from '../../common/api/apiList.js';

(async function () {
    const session = await getLoginUser();
    console.log(session.data.nickName);
    const response = await findByNickName(session.data.nickName);
    console.log(response);
})();

/*swiper*/

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
/*swiper end*/

    var xInfoNick = document.querySelector("#x-infoNick");
    var xInfoEmail = document.querySelector("#x-infoEmail");
    
    fetch("/user/getLoginUser")
      .then(function(response) {
        return response.json();
      })
      .then(function(result) {
        console.log(result.data);
        
        
         var user = result.data;
         
         xInfoNick.innerHTML = user.nickName;
         xInfoEmail.innerHTML = user.email;
      })
