$(function () {});

// ---- 뒤로가기 ----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/travelInfo/travelInfo.html';
});

var swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 5,
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

// $(function () {
//     $('.center').slick({
//         centerMode: true,
//         centerPadding: '60px',
//         slidesToShow: 3,
//         prevArrow: $('.prev-c'),
//         nextArrow: $('.next-c'),
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     arrows: false,
//                     centerMode: true,
//                     centerPadding: '40px',
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     arrows: false,
//                     centerMode: true,
//                     centerPadding: '40px',
//                     slidesToShow: 1,
//                 },
//             },
//         ],
//     });
// });
// // ---- slick ----
