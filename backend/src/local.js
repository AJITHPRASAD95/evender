process.env.JWT_SECRET ||= 'local-development-secret-change-me';
process.env.ADMIN_PHONE ||= '9999999999';
process.env.ADMIN_PASSWORD ||= 'admin123';
process.env.LOCAL_SERVE_WEB = 'true';
process.env.APP_ORIGIN ||= 'http://localhost:4000';
process.env.MONGOMS_DOWNLOAD_DIR ||= require('path').resolve(__dirname, '../.cache/mongodb-binaries');
process.env.MONGOMS_MD5_CHECK = 'false';
const { MongoMemoryReplSet } = require('mongodb-memory-server');
const { connectDB } = require('./config/db');
const app = require('./server');
async function main() {
  const replica = await MongoMemoryReplSet.create({ replSet: { count: 1, storageEngine: 'wiredTiger' } });
  process.env.MONGODB_URI = replica.getUri('hyperlocal');
  await connectDB(process.env.MONGODB_URI);
  const port = Number(process.env.PORT || 4000);
  const server = app.listen(port, () => {
    console.log(`Local FreshLane running at http://localhost:${port}`);
    console.log(`Vendor: http://localhost:${port}/vendor/vendor-login.html`);
    console.log(`Admin:  http://localhost:${port}/admin/admin-login.html`);
    console.log('Local admin credentials: 9999999999 / admin123');
  });
  const close = async () => { server.close(); await replica.stop(); process.exit(0); };
  process.on('SIGINT', close); process.on('SIGTERM', close);
}
main().catch(error => { console.error(error); process.exit(1); });
