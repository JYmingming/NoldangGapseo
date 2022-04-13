import { travelList} from '../../common/api/apiList.js';

// --- stiky color ---
const stikyColor = ['blue', 'green', 'yello', 'brown', 'purple', 'orange'];

//console.log('dddd');

$('.content-card').on('click', function (e) {
    e.preventDefault();
    location.href = '/travel/travelInfo/travelInfo.html';
});

(async function () {
    const response = await travelList('정창성장판이안닫혀서성장통이심해');
    console.log('reponse:::', response);
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
