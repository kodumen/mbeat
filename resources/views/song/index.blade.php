@extends('master')
@section('section')
    songs
@endsection
@section('content')
    <h2>songs</h2>
    <ul>
        @foreach($songs as $song)
            <li>
                <a href="{{url('/song/info/' . $song->id, [], env('USE_HTTPS')  )}}">
                    {{$song->title_translit ? $song->title_translit : $song->title}}
                </a>
            </li>
        @endforeach
    </ul>
@endsection
