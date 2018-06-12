const obs = new OBSWebSocket();

$( "#connect" ).click(function() {
    obs.connect({ address: $( "#url" ).val(), password: $( "#password" ).val() })
      .then(() => {
        console.log('Success! You are connected & authenticated.');
        return obs.getSceneList();
      })
      .then(data => {
        console.log(`${data.scenes.length} Available Scenes!`);
        data.scenes.forEach(scene => {
            console.log(`Scene: ${scene.name}`);
            var tmp_button = $('<button/>', {
              text: scene.name,
              id: scene.name,
              type: 'button',
              click: function () {
                obs.setCurrentScene({'scene-name': this.id});
              }
            });
            $("#grenouille_scenes").append(tmp_button);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

obs.onSwitchScenes(data => {
  console.log(`New Active Scene: ${data.sceneName}`);
});

obs.on('error', err => {
  console.error('socket error:', err);
});

$('#url').val(`${document.location.hostname}:4444`);