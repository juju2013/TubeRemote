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
        client.publish(topic, msg, {}, function (err) {
          client.end();
        });
      }
    })
  })
}

/*
 * redirect to remote
 */
function tuberemote(req)
{
  // exceptions
  if (req.url.match(/.*\.youtube\.com\/user\/.*/gm) 
    || req.url.match(/.*\.youtube\.com\/channel\/.*/gm) 
    || req.url.match(/.*\/consent\.youtube\.com\/.*/gm) 
    || req.url.match(/.*youtube\.com\/.*\.js/gm) 
  ) {
    return {cancel:false};
  }
  // send to mqtt
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
      "*://player.vimeo.com/*",
      "*://www.vimeo.com/*",
      "*://www.ultimedia.com/deliver/*"
    ]
  },
  ["blocking"]
);
