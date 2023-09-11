// Deliberately isolated fixture API: no database, scraping, authentication or external calls.
const http = require('node:http');
const universities = [
  {university_id: 1, name: 'Example Northern University', cs_ranking: 101, program_type: 'MSc', tuition_fees: 12000, available_scholarship: true},
  {university_id: 2, name: 'Example Coastal Institute', cs_ranking: 202, program_type: 'PhD', tuition_fees: 8000, available_scholarship: false},
  {university_id: 3, name: 'Example Mountain University', cs_ranking: 303, program_type: 'MSc', tuition_fees: 18000, available_scholarship: true}
];
function createDemoServer() {
  const shortlist = new Set();
  const blacklist = new Set();
  return http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    const send = (status, data) => { res.writeHead(status, {'Content-Type':'application/json'}); res.end(JSON.stringify(data)); };
    if (req.method === 'OPTIONS') return send(200, {});
    const path = new URL(req.url, 'http://localhost').pathname;
    if (path === '/health') return send(200, {status:'ok', mode:'synthetic-demo'});
    if (req.method === 'GET' && /^\/api\/user\/nonPersonalized\/1(?:\/[^/]+)?$/.test(path)) {
      const filter = path.split('/')[5];
      let rows = universities.filter(u => !blacklist.has(u.university_id));
      if (filter === 'scholarship') rows = rows.filter(u => u.available_scholarship);
      return send(200, {status:'success', demo:true, data:{universities:rows, user:rows}});
    }
    if (path === '/api/user/profile/1/shortlist' && req.method === 'GET') {
      const rows = universities.filter(u => shortlist.has(u.university_id));
      return send(200, {status:'success', demo:true, data:{universities:rows,user:rows}});
    }
    if (/^\/api\/user\/profile\/1\/(shortlist|blacklist)$/.test(path) && req.method === 'POST') {
      try {
        let body = '';
        for await (const chunk of req) { body += chunk; if (body.length > 4096) return send(413,{error:'Request too large'}); }
        const id = Number(JSON.parse(body).university_id);
        if (!universities.some(u => u.university_id === id)) return send(400,{error:'Unknown synthetic university'});
        (path.endsWith('/shortlist') ? shortlist : blacklist).add(id);
        return send(200,{status:'success',demo:true});
      } catch { return send(400,{error:'Invalid JSON'}); }
    }
    return send(501,{error:'This feature requires the original PostgreSQL application; not implemented in the fixture demo.'});
  });
}
if (require.main === module) createDemoServer().listen(Number(process.env.PORT || 3002), process.env.DEMO_HOST || '127.0.0.1', () => {
  console.log('SYNTHETIC DEMO ONLY. Open http://localhost:3000/api/user/nonPersonalized/1 after starting the client.');
});
module.exports = {createDemoServer};
