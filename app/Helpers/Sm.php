<?php

namespace App\Helpers;

class Sm
{
    const TITLE = 'TITLE:';
    const TITLE_TRANSLIT = 'TITLETRANSLIT:';
    const ARTIST = 'ARTIST:';
    const CREDIT = 'CREDIT:';
    const OFFSET = 'OFFSET:';
    const BPMS = 'BPMS:';
    const NOTES = 'NOTES:';

    // Song details
    public $title;
    public $title_translit;
    public $artist;
    public $credit;

    // Step details
    public $offset;
    public $bpms;
    public $notes;

    public function parse($file_content)
    {

    }
}