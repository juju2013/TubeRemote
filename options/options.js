const form = document.querySelector("#options")
const broker = document.querySelector("#broker")
const connectstatus = document.querySelector("#connectstatus")

// Store the currently selected settings using browser.storage.local.
function storeSettings() {
  check();
  browser.storage.local.set(f2j(form));
}

// Update the options UI with the settings values retrieved from storage,
// or the default settings if the stored settings are empty.
function updateUI(j) {
  for (k in j ) {
    const field = document.querySelector("#"+k);
    field && (field.value = j[k]);
  }
  check();
}

// check if the current broker is pingable
function check() {
  const url = "ws://"+broker.value
  // test connection
  var client  = mqtt.connect(url, {keepalive:0, reconnectPeriod:0 });

  client.on('connect', function () {
    connectstatus.className="connected";
    connectstatus.textContent="connected";
  })
  
  client.on('error', function () {
    connectstatus.className="notconnected";
    connectstatus.textContent="not connected";
  })
}

// log error if any
function onError(e) {
  console.error(e);
}

// convert form dom to object
function f2j(f) {
  var j = {};
  var fd = new FormData(f);
  fd.forEach((value, key) => j[key] = value);
  return j;
}

// On opening the options page, fetch stored settings and update the UI with them.
browser.storage.local.get().then(updateUI, onError);

// Whenever the contents of the textarea changes, save the new values
form.addEventListener("change", storeSettings);
broker.onchange=check;
