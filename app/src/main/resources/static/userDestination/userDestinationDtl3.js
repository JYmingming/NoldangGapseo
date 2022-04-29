import { getDes, getLoginUser, deleteDes } from '../../common/api/apiList.js';
import { urlSearch } from '../../common/urlSearchParam.js';

// ---- URLSearchParams ----
const no = urlSearch('desId');

// ---- 회원정보 가져오기 ----
let user;
// ---- reponse 변수 ----
let destinationId;

// ---- 화면 렌더링 ----
(async function () {
    user = await getLoginUser();
    console.log(user)
  let a = document.querySelector(".loginUser")
a.innerHTML = user.data.nickName
})();

$('.btn-like').on('click', async function (e) {

    console.log("userDestJs")
    //formdata
    var like = new FormData(document.forms.namedItem('form-d'));
    const response = await addLike(like);
    console.log(response);

    if (1) {
        then((result) => {
            if (1) {
                location.reload();
                return;
            } else {
                location.href = '/travel/myboard/myboard.html';
                return;
            }
        });
    }

});

function addLike(like) {
    try {
        const response = await fetch(`destination/addLike`, {
            method: 'POST',
            body: like,
        }).then(function (res) {
            return res.json();
        });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}
