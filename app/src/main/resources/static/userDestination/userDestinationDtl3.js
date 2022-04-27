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