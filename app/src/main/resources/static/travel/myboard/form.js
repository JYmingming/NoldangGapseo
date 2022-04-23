import { addDestination, getLoginUser } from '../../common/api/apiList.js';

// ------입력값------
const title = $('#in-title');
const contents = $('#in-contents');
const tag = $('#tag-d');
const file = $('.d-file-up');
const adress = $('#in-adress');
const phone = $('#phone');

// ---- 세션에서 유저 id를 가져온다. ----
(async function () {
    const userId = await getLoginUser();
    $('#d-user').val(userId.data.userId);
})();

// ----d-tag에 선택 태그 값 넣기----
$('.tag-btn').on('click', function (e) {
    e.stopPropagation();

    // tag 색 바꾸기
    $('.tag-btn').removeClass('d-select');
    $(this).addClass('d-select');

    let t = $(e.target).data('val');
    tag.val(t);
});

// ---- 주소 api ----
$('.adress-btn').on('click', function (e) {
    e.preventDefault();
    findAddr();
});

function findAddr() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var jibunAddr = data.jibunAddress; // 지번 주소 변수
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            //document.querySelector('member_post').value = data.zonecode;
            if (roadAddr !== '') {
                document.querySelector('#in-adress').value = roadAddr;
            } else if (jibunAddr !== '') {
                document.querySelector('#in-adress').value = jibunAddr;
            }
        },
    }).open();
}

// ---- 뒤로가기 화살표 -----
$('.bi').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/myboard/myboard.html';
});

// ===== 사진 올리기 =====s
(function imageView(att_zone, btn) {
    var attZone = document.querySelector('.d-file');
    var btnAtt = document.querySelector('.d-file-up');
    var sel_files = [];

    // 이미지와 체크 박스를 감싸고 있는 div 속성
    var div_style =
        'display:inline-block;position:relative;' +
        'width:300px;height:200px;margin:5px;border-radius:10px;z-index:1';
    // 미리보기 이미지 속성
    var img_style = 'width:100%;height:100%;z-index:none';
    // 이미지안에 표시되는 체크박스의 속성
    var chk_style =
        'width:30px;height:30px;position:absolute;font-size:24px;' +
        'right:0px;bottom:0px;z-index:999;background-color:rgba(255,255,255,0.1);color:#f00;border:none;';

    btnAtt.onchange = function (e) {
        var files = e.target.files;
        var fileArr = Array.prototype.slice.call(files);
        for (var f of fileArr) {
            imageLoader(f);
        }
    };
    // 탐색기에서 드래그앤 드롭 사용
    attZone.addEventListener(
        'dragenter',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        false
    );

    attZone.addEventListener(
        'dragover',
        function (e) {
            e.preventDefault();
            e.stopPropagation();
        },
        false
    );

    attZone.addEventListener(
        'drop',
        function (e) {
            var files = {};
            e.preventDefault();
            e.stopPropagation();
            var dt = e.dataTransfer;
            files = dt.files;
            for (var f of files) {
                imageLoader(f);
            }
        },
        false
    );

    /*첨부된 이미리즐을 배열에 넣고 미리보기 */
    const imageLoader = function (file) {
        sel_files.push(file);
        var reader = new FileReader();
        reader.onload = function (ee) {
            let img = document.createElement('img');
            img.setAttribute('style', img_style);
            img.src = ee.target.result;
            attZone.appendChild(makeDiv(img, file));
        };

        reader.readAsDataURL(file);
    };

    /*첨부된 파일이 있는 경우 checkbox와 함께 attZone에 추가할 div를 만들어 반환 */
    const makeDiv = function (img, file) {
        var div = document.createElement('div');
        div.setAttribute('style', div_style);

        var btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'x');
        btn.setAttribute('delFile', file.name);
        btn.setAttribute('style', chk_style);
        btn.onclick = function (ev) {
            var ele = ev.srcElement;
            var delFile = ele.getAttribute('delFile');
            for (var i = 0; i < sel_files.length; i++) {
                if (delFile == sel_files[i].name) {
                    sel_files.splice(i, 1);
                }
            }

            const dt = new DataTransfer();
            for (var f in sel_files) {
                var file = sel_files[f];
                dt.items.add(file);
            }
            btnAtt.files = dt.files;
            var p = ele.parentNode;
            attZone.removeChild(p);
        };
        div.appendChild(img);
        div.appendChild(btn);
        return div;
    };
})('att_zone', 'btnAtt');

// -----입력값 널체크-----
$('.confirm-btn').on('click', async function (e) {
    if (
        title.val() == '' ||
        contents.val() == '' ||
        tag.val() == '' ||
        adress.val() == '' ||
        file.val() == '' ||
        phone.val() == ''
    ) {
        Swal.fire({
            icon: 'error',
            title: '위의 항목들을 모두 입력해주세요',
            text: 'something is missing',
        });
        return;
    }
    //formdata
    var destination = new FormData(document.forms.namedItem('form-d'));
    const response = await addDestination(destination);
    console.log(response);
    if (response.resCode == '0000') {
        Swal.fire({
            icon: 'success',
            title: '여행지 공유 감사합니다.\n 추가로 작성 하시겠어요?',
            showCancelButton: true,
            confirmButtonText: 'YES!',
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
                return;
            } else {
                location.href = '/travel/myboard/myboard.html';
                return;
            }
        });
    }
});
