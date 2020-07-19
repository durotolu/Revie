const server = require('./api/server');
require('dotenv').config();

const port = process.env.PORT || 4500;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});