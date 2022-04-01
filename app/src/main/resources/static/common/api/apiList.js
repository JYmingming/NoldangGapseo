const PATH = {
    userList: `/user/list`,
};

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
