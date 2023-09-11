const {test} = require('node:test');
const assert = require('node:assert/strict');
const {createDemoServer} = require('../demo');
test('fixture catalogue, shortlist, validation and unsupported routes', async () => {
  const server = createDemoServer();
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    assert.equal((await (await fetch(url+'/health')).json()).mode,'synthetic-demo');
    const list = await (await fetch(url+'/api/user/nonPersonalized/1')).json();
    assert.equal(list.data.universities.length,3);
    assert.equal((await fetch(url+'/api/user/profile/1/shortlist',{method:'POST',body:JSON.stringify({university_id:1})})).status,200);
    assert.equal((await (await fetch(url+'/api/user/profile/1/shortlist')).json()).data.universities.length,1);
    assert.equal((await fetch(url+'/api/user/profile/1/shortlist',{method:'POST',body:'invalid'})).status,400);
    assert.equal((await fetch(url+'/api/user/login')).status,501);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
