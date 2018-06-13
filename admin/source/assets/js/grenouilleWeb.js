function get_time() {
    var currentdate = new Date();
    var h = currentdate.getHours()
    var m = currentdate.getMinutes()
    var s = currentdate.getSeconds()
    return `${h < 10 ? '0'+h : h}:${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
}

function log(message) {
  console.log(message);
  $("#console").append($('<p/>', {
    text: `${get_time()} >> ${message}`
  }));
  document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight;  
}

$('#hostname').val(document.location.hostname);

const obs = new OBSWebSocket();

$( "#start_record" ).click(function() {
  obs.StartRecording();
});

$( "#stop_record" ).click(function() {
  obs.StopRecording();
});

$( "#connect" ).click(function() {
    $("#grenouille_scenes").empty();
    var address = `${$( "#hostname" ).val()}:${$( "#port" ).val()}`
    log(`Trying to connect to ${address}...`);
    obs.connect({ address: address, password: $( "#password" ).val() })
      .then(() => {
        log('Success! You are connected & authenticated.');
        return obs.getSceneList();
      })
      .then(data => {
        log(`${data.scenes.length} Available Scenes!`);
        data.scenes.forEach(scene => {
            log(`Scene: ${scene.name}`);
            $("#grenouille_scenes").append(
              $('<button/>', {
                text: scene.name,
                id: scene.name,
                class: 'scene_button',
                type: 'button',
                click: function () {
                  obs.setCurrentScene({'scene-name': this.id});
                }
              })
            );
        });
      })
      .catch(err => {
        log(err);
      });
  }
);

obs.onSwitchScenes(data => {
  log(`New Active Scene: ${data.sceneName}`);
});

obs.on('error', err => {
  log(`socket error: {err}`);
});

obs.onRecordingStarted(data => {
  log('Recording successfully started!');
});

obs.onRecordingStopped(data => {
  log('Recording successfully stopped!');
});

/*
var i;
for (i = 0; i < 50; i++) {
    log(`LOG message ${i}`);
}


for (i = 0; i < 10; i++) {
  $("#grenouille_scenes").append(
    $('<button/>', {
      text: `scene ${i}`,
      id: `scene ${i}`,
      type: 'button',
      class: 'scene_button',
      click: function () {
        obs.setCurrentScene({'scene-name': this.id});
      }
    })
  );
} 
*/
