//여행이름 모달
$('.travel-name').click(function (e) {
    e.preventDefault();
    $('#nameModal').modal('show');
});

//

//모달 닫기
$('.btn-close').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
});

$('.invite-box').click(function (e) {
    e.preventDefault();
    $('#compModal').modal('show');
});

$('.travel-weather').click(function (e) {
    e.preventDefault();
    $('#weatherModal').modal('show');
});

$('.travel-cost').click(function (e) {
    e.preventDefault();
    window.open('./cost/travelCost.html');
});
