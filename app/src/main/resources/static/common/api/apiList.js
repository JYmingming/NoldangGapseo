const PATH = {
    userList: `/user/list`,
};

export async function dateFormat(colon, date) {
    let oldDate = await date;
    let dateOldDate = new Date(oldDate);
    let year = dateOldDate.getFullYear();
    let month = dateOldDate.getMonth();
    let day = dateOldDate.
}

export async function userList() {
    try {
        const response = await axios(PATH.userList);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function mm() {
    try {
        const response = await fetch(PATH.userList).then(function (res) {
            return res.json();
        });
        return response;
    } catch (e) {
        console.log(e);
    }
}
