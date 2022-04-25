import { defaultTagList } from '../common/api/apiList.js';

const makeTagView = (id, name) => {
    const tagView = `<div class="tag" data-id=${id}>#${name}</div>`;
    return tagView;
};
$('.tag').draggable();

(async function () {
    const response = await defaultTagList();
    console.log(response);

    response?.map((m) => {
        const view = makeTagView(m.tagId, m.tagName);
        $('#default').append(view);
    });
})();
