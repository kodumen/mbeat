<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Helpers\SongFactory;
use App\Song;

class SongController extends Controller
{
    /**
     * Get the song data, with notes.
     *
     * @param $id
     * @param $difficulty
     * @return \Illuminate\Http\JsonResponse
     */
    public function getNotes($id, $difficulty)
    {
        return response()->json(Song::get($id, $difficulty));
    }

    /**
     * Add a song to the database.
     *
     * @param Request $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function add(Request $request)
    {
        $sm_contents = $request->input('sm');

        if (!$sm_contents) {
            return response('.sm contents not passed.', Response::HTTP_BAD_REQUEST);
        }

        $song = SongFactory::create($sm_contents);
        $song->save();

        return redirect()->back();
    }

    public function listAll()
    {
        $songs = Song::getAllTitles();

        return view('song.index', ['songs' => $songs]);
    }
}
