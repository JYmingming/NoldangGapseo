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

// ===== Travel =====

// ---- 회원의 여행리스트 가져오기 ----
export async function travelList(nickName) {
    try {
        const response = await axios(`${PATH.TRAVEL.travelList}?nickName=${nickName}`);
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
