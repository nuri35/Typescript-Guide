import fs from 'fs';

fs.readFile('/proc/meminfo', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
