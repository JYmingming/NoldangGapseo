import { get4Des } from '../common/api/apiList.js';

(async function () {
    const fourDes = await get4Des();

    for (var i = 0; i < fourDes.length; i++) {
        const imageView = ` <img
                        src="${fourDes[i].thumbNailImg}"
                        class="four-img"
                        alt="NO IMAGE"
                        />`;
        $('.col-3').children('span').eq(i).html(fourDes[i].destinationName);
        console.log(fourDes[i].thumbNailImg);
        $('.col-3').children('div').eq(i).append(imageView);
    }
})();
