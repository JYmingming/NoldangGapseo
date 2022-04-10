export const PATH = {
    USER: {
        list: `/user/list`,
    },
    userList: `/user/list`,
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

const aa = {
  id : 'aaa',
  pasw : 'eeee',
  email : 'aa@test.com'
}


userList(aa)


export async function userList(user = {}) {
    try {
        const response = await axios(PATH.USER.list)
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
