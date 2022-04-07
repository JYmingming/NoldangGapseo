$('.content-card').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/travelInfo/travelInfo.html';
});

$('.choice1 .btn1').on('click', function (e) {
    e.preventDefault();
    $('.list1').toggle();
});
$('.choice1 .btn2').on('click', function (e) {
    e.preventDefault();
    $('.list1').toggle(2000);
});
$('.choice1 .btn3').on('click', function (e) {
    e.preventDefault();
    $('.list1').toggle('fast');
});
