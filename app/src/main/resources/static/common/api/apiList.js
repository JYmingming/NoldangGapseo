//import axios from 'axios';

export const PATH = {
    USER: {
        list: `/user/list`,
    },
    DESTINATION: {},
    TRAVEL: {
        travelList: '/travel/travelList',
    },
};

export async function dateFormat(colon, date) {
    let oldDate = await date;
    let dateOldDate = new Date(oldDate);
    let year = dateOldDate.getFullYear().toString();
    let month = dateOldDate.getMonth() + 1;
    let day = dateOldDate.getDate().toString();
    let time = dateOldDate.getTime();

    let formatDate = year + colon + month + colon + day;

    return formatDate;
}

// ===== Travel =====

// ---- 회원의 여행리스트 가져오기 ----
export async function travelList(nickName) {
    try {
        const response = await axios(`${PATH.TRAVEL.travelList}?nickName=${nickName}`);
        console.log(response.data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function userList() {
    try {
        const response = await axios(PATH.USER.list);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function mm() {
    try {
        const response = await fetch(PATH.USER.list).then(function (res) {
            return res.json();
        });
        return response;
    } catch (e) {
        console.log(e);
    }
}
