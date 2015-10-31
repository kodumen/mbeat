<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Song;

class SongController extends Controller
{
    public function getNotes($id, $difficulty)
    {
        return response()->json(Song::get($id, $difficulty));
    }
}
