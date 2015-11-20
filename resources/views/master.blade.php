<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>mbeat | @yield('section')</title>
    <link href="{{asset('/css/mbeat.css', env('USE_HTTPS'))}}" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
</head>
<body>
<div class="container">
    <div class="header">
        <h1><a href="{{url('/', [], env('USE_HTTPS'))}}">mbeat</a></h1>
        <ul class="nav">
            <li><a href="{{url('/', [], env('USE_HTTPS'))}}">songs</a></li>
            <li><a href="{{url('https://github.com/kodumen/mbeat/', [], env('USE_HTTPS'))}}">github</a></li>
        </ul>
    </div>
    <div class="content">@yield('content')</div>
</div>
</body>
</html>
