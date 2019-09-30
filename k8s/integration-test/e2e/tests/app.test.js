import { Selector } from 'testcafe';
import config from '/e2e/config.js';

fixture('App').page(config.pageUrl);

test('App test', async t => {

    const counter = await Selector('p');
    await t.expect(counter.innerText).contains('save to reload')

});



