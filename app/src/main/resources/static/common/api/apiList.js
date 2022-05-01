export const PATH = {
    USER: {
        list: `/user/list`,
        getLoginUser: '/user/getLoginUser',
        findByNickName: '/user/search/nickName',
    },
    DESTINATION: {
        adminList: '/destination/admin/list',
        userDesList: '/destination/user/list',
        getDes: '/destination/getDes',
        get4Des: '/destination/get4Des',
        addDestination: '/destination/add/destination',
        deleteDes: '/destination/delete/des',
        deleteImg: '/destination/delete/img',
        userDesCnt: '/destination/user/cnt',
        updateDes: '/destination/update/des',
        checkLike: '/destination/check/like',
        addComment: '/destination/add/comment',
        getCom: '/destination/get/com',
        deleteCom: '/destination/delete/com',
        updateComment: '/destination/update/comment',
        addLike: '/destination/addLike',
        delLike: '/destination/deleteLike',
    },
    TRAVEL: {
        travelList: '/travel/travelList',
        info: '/travel/getOne',
        addTravel: '/travel/add/travel',
        addTag: '/travel/add/tag',
        setRoute: '/travel/set/route',
        getRoutes: '/travel/get/routes',
        updateRoute: '/travel/update/route',
        getPeriod: '/travel/get/period',
        updateName: '/travel/updateName',
        todoList: '/travel/todoList',
        addTodo: '/travel/addTodo',
        setTodoStatus: '/travel/todoStatus',
        todoName: '/travel/todoName',
        deleteTodo: '/travel/deleteTodo',
        costList: '/travel/costList',
        addCost: '/travel/addCost',
        updateCost: '/travel/updateCost',
        deleteCost: '/travel/deleteCost',
        deleteTravel: '/travel/delete',
        invite: '/travel/invite',
    },
    TAG: {
        defaultTagList: '/tag/list',
    },
};
// ===== 날짜 포멧 =====
export async function dateFormat(colon, date) {
    let OldDate = new Date(await date);
    let year = OldDate.getFullYear().toString();
    let month;
    if (OldDate.getMonth() + 1 < 10) {
        month = '0' + (OldDate.getMonth() + 1).toString();
    }
    let day;
    if (OldDate.getDate() < 10) {
        day = '0' + OldDate.getDate().toString();
    }
    let time = OldDate.getTime();

    let formatDate = year + colon + month + colon + day;

    return formatDate;
}

// ===== 유저 =====
// ---- 유저리스트를 가져온다. ----
export async function userList() {
    try {
        const response = await axios(PATH.USER.list);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 유저의 로그인 여부를 확인한다. ----
export async function getLoginUser() {
    try {
        const response = await fetch(PATH.USER.getLoginUser).then(function (res) {
            return res.json();
        });
        return response;
    } catch (e) {
        console.log(e);
    }
}

// ---- 닉네임으로 유저 정보 가져오기 ----
export async function findByNickName(nickName) {
    try {
        const response = await fetch(`${PATH.USER.findByNickName}?nickName=${nickName}`).then(
            function (res) {
                return res.json();
            }
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

// ===== Destination ====
// ---- 놀당 여행지 리스트를 가져온다. ----
export async function getAdminList() {
    try {
        const response = await axios(`${PATH.DESTINATION.adminList}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 회원이 작성한 여행지 리스트를 가져온다.----
export async function getUserDesList(userId, limit, nextPage) {
    try {
        const response = await axios(
            `${PATH.DESTINATION.userDesList}?userId=${userId}&limit=${limit}&nextPage=${nextPage}`
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 회원이 작성한 여행지 리스트 갯수 ----
export async function userDesCnt(userId) {
    try {
        const response = await axios(`${PATH.DESTINATION.userDesCnt}?userId=${userId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행지 하나를 가지고 온다  ----
// type : 놀당 여행지 = N , 유저 여행지 = U
export async function getDes(id, type) {
    try {
        const response = await axios(`${PATH.DESTINATION.getDes}?desId=${id}&type=${type}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 메인페이지의 4여행지를 가져온다 ----
export async function get4Des() {
    try {
        const response = await axios(PATH.DESTINATION.get4Des);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ----- 여행지 추가 ----
export async function addDestination(destination) {
    try {
        const response = await fetch(PATH.DESTINATION.addDestination, {
            method: 'POST',
            body: destination,
        }).then(function (res) {
            return res.json();
        });
        console.log(response);
        return response;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행지 업데이트 ---
export async function updateDes(destination = {}) {
    try {
        const response = await axios({
            method: 'PUT',
            url: PATH.DESTINATION.updateDes,
            data: destination,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ----- 여행지를 삭제 ----
export async function deleteDes(id) {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${PATH.DESTINATION.deleteDes}?id=${id}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행지 이미 삭제 ----
export async function dleteImgs(id) {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${PATH.DESTINATION.deleteImg}?id=${id}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- like Check ----
export async function checkLike(desId, userId) {
    try {
        const response = await axios(
            `${PATH.DESTINATION.checkLike}?desId=${desId}&userId=${userId}`
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 댓글 추가 ----
// type : 놀당 여행지 = N , 유저 여행지 = U
export async function addComment(comment = {}, type) {
    try {
        const resopnse = await axios({
            method: 'POST',
            url: `${PATH.DESTINATION.addComment}?type=${type}`,
            data: comment,
        });
        return resopnse.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 댓글 수정 ----
// type : 놀당 여행지 = N , 유저 여행지 = U
export async function updateComment(comment = {}, type) {
    try {
        const response = await axios({
            method: 'POST',
            url: `${PATH.DESTINATION.updateComment}?type=${type}`,
            data: comment,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 댓글 하나 가져오기 ----
// type : 놀당 여행지 = N , 유저 여행지 = U
export async function getCom(commentId, type) {
    try {
        const response = await axios(
            `${PATH.DESTINATION.getCom}?commentId=${commentId}&type=${type}`
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 댓글 삭제 ----
// type : 놀당 여행지 = N , 유저 여행지 = U
export async function delCom(commentId, type) {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${PATH.DESTINATION.deleteCom}?commentId=${commentId}&type=${type}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 좋아요 추가 ----
export async function addLike(desId, userId) {
    try {
        const response = await axios({
            method: 'POST',
            url: `${PATH.DESTINATION.addLike}?desId=${desId}&userId=${userId}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 좋아요 취소 ----
export async function delLike(desId, userId) {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${PATH.DESTINATION.delLike}?desId=${desId}&userId=${userId}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ===== Travel =====
// ---- 회원의 여행리스트 가져오기 ----
export async function travelList(nickName, companionId) {
    try {
        const response = await axios(
            `${PATH.TRAVEL.travelList}?nickName=${nickName}&companionId=${companionId}`
        );
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행 상세 정보를 가져온다 ----
export async function getTravel(travelId) {
    try {
        const response = await axios(`${PATH.TRAVEL.info}?travelId=${travelId}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행 하나를 생성한다. ----
export async function addTravel(travel = {}) {
    try {
        const response = await axios({
            method: 'POST',
            url: PATH.TRAVEL.addTravel,
            data: travel,
        });
        console.log('response:::::', response);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행의 태그를 설정한다. ----
export async function addTravelTag(id, tags) {
    try {
        const response = await axios({
            method: 'POST',
            url: `${PATH.TRAVEL.addTag}?travelId=${id}`,
            data: tags,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행 루트를 설정 한다. ----
export async function setRoute(id, period, tags) {
    try {
        const response = await axios({
            method: 'POST',
            url: `${PATH.TRAVEL.setRoute}?travelId=${id}&day=${period}`,
            data: tags,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행 날짜별 루트를 가져온다. ----
export async function getRoutes(id, day) {
    try {
        const response = await axios(`${PATH.TRAVEL.getRoutes}?id=${id}&day=${day}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 루트 순서를 바꾼다. ----
export async function updateRoute(id) {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${PATH.TRAVEL.updateRoute}?ids=${id}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행 기간을 가져온다. ----
export async function getPeriod(id) {
    try {
        const response = await axios(`${PATH.TRAVEL.getPeriod}?id=${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행이름을 변경한다. ----
export async function updateTravelName(id, name) {
    try {
        const response = await axios({
            method: 'put',
            url: `${PATH.TRAVEL.updateName}?id=${id}&name=${name}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- todoList를 가져온다. ----
export async function todoList(id) {
    try {
        const response = fetch(`${PATH.TRAVEL.todoList}?travelId=${id}`).then(function (res) {
            return res.json();
        });
        return response;
    } catch (e) {
        console.log(e);
    }
}

// ---- todo를 추가시킨다. ----
export async function addTodo(id, name) {
    try {
        const response = await axios({
            method: 'POST',
            url: `${PATH.TRAVEL.addTodo}?id=${id}&name=${name}`,
        });
        return (await response).data;
    } catch (e) {
        console.log(e);
    }
}

// ---- todo의 상태를 변경한다. ----
export async function setTodoStatus(id, status) {
    try {
        const response = await axios({
            method: 'PUT',
            url: `${PATH.TRAVEL.setTodoStatus}?todoId=${id}&status=${status}`,
        });
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- todo이름를 변경한다. ----
export async function updateTodo(id, name) {
    try {
        const response = await axios({
            method: 'put',
            url: `${PATH.TRAVEL.todoName}?todoId=${id}&name=${name}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- todo를 삭제한다. ----
export async function deleteTodo(id) {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${PATH.TRAVEL.deleteTodo}?todoId=${id}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- costList를 가져온다. ----
export async function costList(id) {
    try {
        const response = await axios(`${PATH.TRAVEL.costList}?travelId=${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- cost 추가 ----
export async function addCost(cost = {}) {
    try {
        const reponse = await axios({
            method: 'POST',
            url: PATH.TRAVEL.addCost,
            data: cost,
        });
        return reponse.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- cost 업데이트 ----
export async function updateCost(cost = {}) {
    try {
        const response = await axios({
            method: 'PUT',
            url: PATH.TRAVEL.updateCost,
            data: cost,
        });
        return response.data;
    } catch (e) {
        console(e);
    }
}

// ---- cost 삭제 ----
export async function deleteCost(id) {
    try {
        const resopnse = await axios({
            method: 'DELETE',
            url: `${PATH.TRAVEL.deleteCost}?id=${id}`,
        });
        return resopnse.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행 delete ----
export async function deleteTravel(id) {
    try {
        const resopnse = await axios({
            method: 'DELETE',
            url: `${PATH.TRAVEL.deleteTravel}?id=${id}`,
        });
        return resopnse.data;
    } catch (e) {
        console.log(e);
    }
}

// ---- 여행초대 ----
export async function invite(travelId, companionId) {
    try {
        const response = await axios({
            method: 'POST',
            url: `${PATH.TRAVEL.invite}?travelId=${travelId}&companionId=${companionId}`,
        });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

// ====== Tag ======

// ----- 놀당갑서 태그 리스트 ----
export async function defaultTagList() {
    try {
        const response = await fetch(PATH.TAG.defaultTagList).then(function (res) {
            return res.json();
        });
        return response;
    } catch (e) {
        console.log(e);
    }
}
