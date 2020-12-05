// from https://unpkg.com/mqtt@4.0.1/dist/mqtt.min.js

/*
Generic error logger.
*/
function onError(e) {
  console.error(e);
}

/*
 * Poublish a message
 */
function publish(broker, topic, msg) {
  var opts = {
    keepalive:0,
    reconnectPeriod:0
  };
  var client  = mqtt.connect(broker, opts);

  client.on('connect', function () {
    client.subscribe(topic, function (err) {
      if (!err) {
        client.publish(topic, msg);
      }
    })
  })
}

/*
 * redirect to remote
 */
function tuberemote(req)
{
  browser.storage.local.get().then(
    options => publish("ws://"+options.broker, options.topic, req.url)
  );
  return {cancel:true};
}

/*
 * Initialization
 */
browser.webRequest.onBeforeRequest.addListener(
  tuberemote,
  {
    urls: [
      '*://*.youtube.com/*',
      '*://youtube.com/*',
      '*://vimeo.com/*',
      "*://www.ultimedia.com/deliver/*"
    ]
  },
  ["blocking"]
);
