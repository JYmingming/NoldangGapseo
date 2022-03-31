import { ddd } from '../travelInfo.js';

$('.input-name').on('keyup', function (key) {
    if (key.keyCode == 13) {
        if ($('.input-name').val() == '') {
            alert('jdkldjkl;;');
        }
    }
});
