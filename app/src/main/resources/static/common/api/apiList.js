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
