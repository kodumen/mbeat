<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
        return view('game.play', ['id' => $id, 'difficulty' => $difficulty]);
    }
}
