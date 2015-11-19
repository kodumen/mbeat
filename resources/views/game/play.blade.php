@extends('master')
@section('section')
    play | {{$song->title_translit ? $song->title_translit : $song->title}} | {{$difficulty}}
@endsection
@section('content')
    <div class="game" id="game"></div>

    <h2 style="text-align: center">{{$song->title_translit ? $song->title_translit : $song->title}}</h2>
    <p style="text-align:center"><strong>Instructions: </strong>press 'd', 'f', 'j', 'k' as the notes fall. If not in sync with the music press 'r' to restart the game.</p>
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
<script src="{{asset('/mbeat-game/js/webfont.js')}}"></script>
<script src="{{asset('/mbeat-game/js/phaser.js')}}"></script>
<script src="{{asset('/mbeat-game/js/mbeat.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/notes_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/keys_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/music_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/bpm_manager_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/player_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/factories/ui_factory.js')}}"></script>
<script src="{{asset('/mbeat-game/js/play_state.js')}}"></script>
<script src="{{asset('/mbeat-game/js/game_over_state.js')}}"></script>
<script src="{{asset('/mbeat-game/js/main.js')}}"></script>
<script>
    var request = new XMLHttpRequest();
    request.open('GET', '/song/{{$id}}/{{$difficulty}}');

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
