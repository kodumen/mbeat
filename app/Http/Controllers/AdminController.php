<?php

namespace App\Http\Controllers;

use App\Helpers\Sm;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
            return 'Invalid request';
        }

        $sm = new Sm();
        $sm->parse($sm_contents);

        dd($sm);
    }
}
