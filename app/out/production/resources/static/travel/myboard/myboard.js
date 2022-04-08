// -----새로운 여행지 추가-----
$('.add-des').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/form.html';
});

// ----여행지 수정-----
$('#content-card').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    location.href = '/travel/myboard/view.html';
});
$('.bi-trash').on('click', function (e) {
    e.stopPropagation();
});
