
## *Tube to remote

This extension intercept video urls (actually youtube, vimeo and ultimedia) and send them as a mqtt message.

Thus one can play videos on another device.

## Why ?

* I run browsers in vm/container in the cloud, video will have latency and bandwidth issue
* When at home, I like to play video on the big screen on the wall, and when on the road, laptop screen is the only choice. None of them runs the browser.
* A MQTT broker + some script will play video on the right device automatically.
