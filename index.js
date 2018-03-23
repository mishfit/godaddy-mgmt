import Domains from './src/domain'
import { writeFile } from './src/utils/file'
export default {
  Domains,
  writeFile
}

/*
Promise.all([
replaceRecords('mishochu.com', 'A', [ { type: 'A', name: '@', data: ip, ttl: 600 } ]),
replaceRecords('mishochu.com', 'CNAME', [{ type: 'CNAME', name: 'www', data: '@', ttl: 3600 }, { type: 'CNAME', name: 'ws.discovery', data: '@', ttl: 3600 }]),
replaceRecords('contrechess.io', 'A', [ { type: 'A', name: '@', data: ip, ttl: 600 } ]),
replaceRecords('contrechess.io', 'CNAME', [{ type: 'CNAME', name: 'www', data: '@', ttl: 3600 }, { type: 'CNAME', name: 'ws.discovery', data: '@', ttl: 3600 }]),
replaceRecords('sugarhousecoins.com', 'A', [ { type: 'A', name: '@', data: ip, ttl: 600 } ]),
replaceRecords('sugarhousecoins.com', 'CNAME', [{ type: 'CNAME', name: 'www', data: '@', ttl: 3600 }, { type: 'CNAME', name: 'ws.discovery', data: '@', ttl: 3600 }])])
*/


