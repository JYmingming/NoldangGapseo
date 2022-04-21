import { get4Des } from '../common/api/apiList.js';

(async function () {
    const fourDes = await get4Des();
    console.log(fourDes);
    // fourDes?.map((m) => {
    //     console.log(m);
    //     $('.col-3').find('span').html(m.destinationName);
    // });
    for (var i = 0; i < fourDes.length; i++) {
        $('.col-3').children('span').eq(i).html(fourDes[i].destinationName);
    }
})();
