$('.travel-name').click(function (e) {
    e.preventDefault();
    $('#nameModal').modal('show');
});
$('.btn-close').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
});
