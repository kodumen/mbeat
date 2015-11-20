@extends('master')
@section('section')
    info | {{$song->title_translit ? $song->title_translit : $song->title}}
@endsection
@section('content')
    <h2>{{$song->title_translit ? $song->title_translit : $song->title}}</h2>
    <img src="{{$song->background}}" alt="{{$song->title_translit ? $song->title_translit : $song->title}}" class="picture">
    <table>
        <tr>
            <td>title</td>
            <td>{{$song->title}}</td>
        </tr>
        <tr>
            <td>translation</td>
            <td>{{$song->title_translit}}</td>
        </tr>
        <tr>
            <td>artist</td>
            <td>{{$song->artist}}</td>
        </tr>
        <tr>
            <td>credit</td>
            <td>{{$song->credit}}</td>
        </tr>
    </table>
    <ul class="play">
        <li><strong>play</strong></li>
        <li><a href="{{url('/play/' . $song->id . '/easy', [], env('USE_HTTPS'))}}">easy</a></li>
        <li><a href="{{url('/play/' . $song->id . '/medium', [], env('USE_HTTPS'))}}">medium</a></li>
        <li><a href="{{url('/play/' . $song->id . '/hard', [], env('USE_HTTPS'))}}">hard</a></li>
    </ul>
@endsection
