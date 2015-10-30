<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    public $timestamps = false;

    public function setNotesEasyAttribute($value)
    {
        $this->attributes['notes_easy'] = json_encode($value);
    }

    public function setNotesMediumAttribute($value)
    {
        $this->attributes['notes_medium'] = json_encode($value);
    }

    public function setNotesHardAttribute($value)
    {
        $this->attributes['notes_hard'] = json_encode($value);
    }
}
