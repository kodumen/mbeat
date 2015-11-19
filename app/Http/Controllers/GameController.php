<?php

namespace App\Http\Controllers;

use App\Song;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class GameController extends Controller
{
    /**
     * Show the game.
     *
     * @param $id
     * @param $difficulty
     * @return string
     */
    public function play($id, $difficulty)
    {
        $song = Song::getInfo($id);
        return view('game.play', ['id' => $id, 'difficulty' => $difficulty, 'song' => $song]);
    }

    /**
     * Get the asset from the 'src' parameter
     *
     * @param Request $request
     * @return $this|Response
     */
    public function getAsset(Request $request)
    {
        if (!$request->get('src')) {
            return response('"src" not passed.', Response::HTTP_BAD_REQUEST);
        }

        $file = file_get_contents($request->get('src'));

        $file_info = new \finfo(FILEINFO_MIME_TYPE);
        $mime_type = $file_info->buffer($file);

        return response($file)->header('Content-Type', $mime_type);
    }
}
