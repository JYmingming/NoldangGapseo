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

import { get4Des } from '../../common/api/apiList.js';

(async function () {
    const fourDes = await get4Des();

    for (var i = 0; i < fourDes.length; i++) {
        const imageView = ` <img
                        src="${fourDes[i].thumbNailImg}"
                        class="four-img"
                        alt="NO IMAGE"
                        />`;
        console.log(fourDes[i].thumbNailImg);
        $('.swiper-slide').children('.d-flex').eq(i).append(imageView);
    }
})();
