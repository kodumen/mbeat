<?php

namespace App\Http\Controllers;

use App\Helpers\SongFactory;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class AdminController extends Controller
{
    public function index()
    {
        return view('admin/index');
    }

    public function addSong(Request $request)
    {
        $sm_contents = $request->input('sm');

        if (!$sm_contents) {
            return response('.sm contents not passed.', Response::HTTP_BAD_REQUEST);
        }

        $song = SongFactory::create($sm_contents);

        dd($song);
    }
}
