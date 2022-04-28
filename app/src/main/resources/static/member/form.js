    var xEmail = document.querySelector("input[name=email]");
    var xNickName = document.querySelector("input[name=nickName]");
    var xPhone = document.querySelector("input[name=phone]");
    var xPassword = document.querySelector("input[name=password]");

    document.querySelector("form[name=form1]").onsubmit = function() {
    if (xEmail.value == "" ||
    xNickName.value == "" ||
    xPhone.value == "" ||
    xPassword.value == "") {
    window.alert("필수 입력 항목이 비어 있습니다.");
    return false;
}

    var fd = new FormData(document.forms.namedItem("form1"));

    fetch("/user/signup", {
    method: "POST",
    body: new URLSearchParams(fd)
})
    .then(function(response) {
    return response.json();
})
    .then(function(result) {
    if (result.resStatus == "success") {
    window.alert("회원가입 완료!");
    location.href = "../indexPage/index.html";
} else {
    window.alert("회원가입 실패!!");
}
});
    return false;
};


    $('.email-checking').on('click', function (e) {
    Swal.fire({
        icon: 'error',
        title: '위의 항목들을 모두 입력해주세요',
        text: 'something is missing',
    });
});

    $('input[name=nickName]').keyup(function() {
        var key = $(this).val();
        console.log(key);
        fetch("/user/search/nickNameCall?nickName="+key)
            .then(function (response) {
                return response.json();
            }).then(function (result) {
            if (result.status == "fail") {
                window.alert("서버 요청 오류!");
                console.log(result.data);
                return;
            }
            console.log(result[0]);
        })
    })

    //