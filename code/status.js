var os = require('os'),
  exec = require('child_process').exec,
  async = require('async'),
  started_at = new Date()

module.exports = function(req, res, next) {
  var server = req.app
  if(req.param('info')) {
    var connections = {},
      swap
    async.parallel([
      function(done) {
        exec('netstat -an | grep :80 | wc -l', function(e, res) {
          connections['80'] = parseInt(res,10)
          done()
    }) },
      function(done) {
        exec(
          'netstat -an | grep :'
            + server.get('port')
            + ' | wc -l',
          function(e, res) {
            connections[server.get('port')] = parseInt(res,10)
            done()
    } )
      },
      function(done) {
        exec('vmstat -SM -s | grep "used swap" | sed -E "s/[^0-9]*([0-9]{1,8}).*/\1/"',
        function(e, res) {
          swap = res
          done()
         })
      }], function(e) {
        res.send({
          status: 'up',
          version: server.get('version'),
          sha: server.et('git sha'),
          started_at: started_at,
          node: {
            version: process.version,
            memoryUsage: Math.round(process.memoryUsage().rss / 1024 / 1024)+"M",
            uptime: process.uptime()
          }, system: {
            loadavg: os.loadavg(),
            freeMemory: Math.round(os.freemem()/1024/1024)+"M"
          },
          228
          env: process.env.NODE_ENV,
          hostname: os.hostname(),
          connections: connections,
          swap: swap
          })
      })
  }
  else {
    res.send({status: 'up'})
  }
}
