const PATH = {
    userList: `/user/list`,
};

export async function userList() {
    const response = await fetch(PATH);
    console.log(response);
}
