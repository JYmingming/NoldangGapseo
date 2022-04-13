import { travelList, userList, userList } from '../../common/api/apiList.js';

// --- stiky color ---
const stikyColor = ['blue', 'green', 'brown', 'purple', 'orange'];

function readomCardColor(arr) {
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
}

$('.d-title').on('click', function (e) {
    e.preventDefault();
    console.log('jkl;');
    console.log($('.title').attr('data-id'));
    //location.href = '/travel/travelInfo/travelInfo.html';
});

(async function () {
    const response = await travelList('정창성장판이안닫혀서성장통이심해');
    response?.map((m) => {
        console.log(m);
        //m => arr[i].name
        let cardColor = readomCardColor(stikyColor);
        let view = ` <div class="col-md-4 col-sm-6 content-card">
                    <div class="card-big-shadow">
                        <div
                            class="card card-just-text"
                            data-background="color"
                    data-color=${cardColor}
                            data-radius="true"
                        >
                            <div class="content">
                                <div class="d-flex justify-content-center align-items-center">
                                    <h4>D-</h4>
                                    <h4 class="card-day">${m.dday}</h4>
                                </div>
                                <h4 class="title" data-id=${m.travelId}>
                                    <a class="d-title">${m.travelName}</a>
                                </h4>
                                <p class="description">${m.period}</p>
                            </div>
                        </div>`;
        $('.row').append(view);
    });
})();

$('.choice1 .btn1').on('click', function (e) {
    e.preventDefault();
    $('.list1').toggle();
});
$('.choice1 .btn2').on('click', function (e) {
    e.preventDefault();
    $('.list1').toggle(2000);
});
$('.choice1 .btn3').on('click', function (e) {
    e.preventDefault();
    $('.list1').toggle('fast');
});
