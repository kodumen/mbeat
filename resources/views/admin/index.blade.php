<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>mbeat | admin</title>
</head>
<body>
<h2>Hello, admin!</h2>

<h3>Add song</h3>
<form action="{{url('/admin/song/add')}}" method="post">
    <textarea name="sm" id="sm" cols="80" rows="15" placeholder="Paste .sm contents here"></textarea>
    <input type="hidden" name="_token" value="{{csrf_token()}}"><br>
    <button type="submit">Submit</button>
</form>
</body>
</html>