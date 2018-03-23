import axios from 'axios'
import config from '../config'
import { transformHeaders } from './transforms/header'

class Domains {
  constructor () {
    const headers = transformHeaders(config.headers)
    this.requestor = axios.create({ baseURL: config.host, headers })
  }

  test () {
    return 'this is a test'
  }

  all () {
    const now = Date.now()
    return this.requestor
      .get('/domains')
      .then(response => {
        const domains = response.data.filter(element => {
          const expirationDate = new Date(element.expires)
          return element.status === 'ACTIVE' && expirationDate >= now
        })
        .map(element => element.domain)

        return domains
      })
      .catch(e => console.log(e))
  }

  get (domain) {
    return this.requestor
      .get(`/domains/${domain}/records`)
      .then(response => {
        return response.data
      })
      .catch(e => console.log(e))
  }

  add (domain, type, name, ttl, data, priority) {
    const record = { type, name, ttl, data }

    if (priority) {
      record['priority'] = priority
    }

    return this.requestor
      .patch(`/domains/${domain}/records`, [ record ])
      .catch(e => console.log(e))
  }

  remove (domain, type, name, ttl, data, priority) {
     return this.requestor
      .get(`/domains/${domain}/records/${type}`)
      .then(response => {
        const records = response.data

        const candidate = records.find(r => {
          if (priority) {
            return r.ttl === ttl && r.data === data && r.priority === priority && r.name === name
          } else {
            return r.ttl === ttl && r.data === data && r.name === name
          }
        })

        if (!candidate) throw new Error('no matching record found')

        const indexOfCandidate = records.indexOf(candidate)

        records.splice(indexOfCandidate, 1)

        console.log(records)

        return this.requestor
          .put(`/domains/${domain}/records/${type}`, records)
      })
      .catch(e => console.log(e))
  }

  clear (domain, type) {
    return this.replace(domain, type, [])
  }

  replace (domain, type, data) {
    return this.requestor.put(`/domains/${domain}/records/${type}`, data)
      .catch(e => console.log(e))
  }

}

export default new Domains

/*
{
  type (string) = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'SRV', 'TXT']
  name (string, domain, {1...255})
  data (string, {1...1024})
  ttl (integer, integer-positive, optional)
  priority (integer, integer-positive, optional): Record priority (MX and SRV only)
  service (string, optional): Service type (SRV only)
  protocol (string, optional): Service protocol (SRV only)
  port (integer, (1...65535), optional): Service port (SRV only)
  weight (integer, integer-positive, optional): Record weight (SRV only)
}
*/
