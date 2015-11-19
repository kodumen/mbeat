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
        <h1>mbeat</h1>
        <ul class="nav">
            <li><a href="">songs</a></li>
            <li><a href="">github</a></li>
        </ul>
    </div>
    <div class="content">@yield('content')</div>
</div>
</body>
</html>
