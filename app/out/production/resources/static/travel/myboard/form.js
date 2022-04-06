const title = $('#in-title').val();

$('.confirm-btn').on('click', function (e) {
    e.preventDefault();
    console.log(title);
});
