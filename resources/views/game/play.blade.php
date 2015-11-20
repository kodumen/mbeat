@extends('master')
@section('section')
    play | {{$song->title_translit ? $song->title_translit : $song->title}} | {{$difficulty}}
@endsection
@section('content')
    <div class="game" id="game"></div>

    <h2 style="text-align: center">{{$song->title_translit ? $song->title_translit : $song->title}}</h2>
    <p style="text-align:center"><strong>Instructions: </strong>press 'd', 'f', 'j', 'k' as the notes fall. If not in sync with the music press 'r' to restart the game.</p>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
<script src="{{asset('/mbeat-game/js/webfont.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/phaser.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/mbeat.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/factories/notes_factory.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/factories/keys_factory.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/factories/music_factory.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/factories/bpm_manager_factory.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/factories/player_factory.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/factories/ui_factory.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/play_state.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/game_over_state.js', env('USE_HTTPS'))}}"></script>
<script src="{{asset('/mbeat-game/js/main.js', env('USE_HTTPS'))}}"></script>
<script>
    var request = new XMLHttpRequest();
    request.open('GET', '{{url("/song/$id/$difficulty", [], env('USE_HTTPS'))}}');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            Mbeat.song_data = JSON.parse(request.responseText);
            game.state.start('Play');
        } else {
            alert('An error occured on the server. Please refresh the page.');
        }
    };

    request.onerror = function () {
        alert('Failed to connect to server. Please refresh the page.');
    };

    request.send();
</script>
@endsection
