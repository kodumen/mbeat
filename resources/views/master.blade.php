<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>mbeat | @yield('section')</title>
    <link href="{{asset('/css/mbeat.css')}}" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
</head>
<body>
<div class="container">
    <div class="header">
        <h1><a href="{{url('/')}}">mbeat</a></h1>
        <ul class="nav">
            <li><a href="{{url('/')}}">songs</a></li>
            <li><a href="{{url('https://github.com/kodumen/mbeat/')}}">github</a></li>
        </ul>
    </div>
    <div class="content">@yield('content')</div>
</div>
</body>
</html>
