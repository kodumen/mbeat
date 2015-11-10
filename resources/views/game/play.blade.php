<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Play</title>
</head>
<body>
<script src="{{asset('/mbeat-game/js/phaser.js')}}"></script>
<script src="{{asset('/mbeat-game/js/mbeat.js')}}"></script>
<script src="{{asset('/mbeat-game/js/note_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/key_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/notes_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/behaviors/KeyBehavior.js')}}"></script>
<script src="{{asset('/mbeat-game/js/load_state.js')}}"></script>
<script src="{{asset('/mbeat-game/js/main.js')}}"></script>
<script>
    var request = new XMLHttpRequest();
    request.open('GET', '/song/{{$id}}/{{$difficulty}}');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            Mbeat.song_data = JSON.parse(request.responseText);
            game.state.start('Load');
        } else {
            alert('An error occured on the server. Please refresh the page.');
        }
    };

    request.onerror = function () {
        alert('Failed to connect to server. Please refresh the page.');
    };

    request.send();
</script>
</body>
</html>