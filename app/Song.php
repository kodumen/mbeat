<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    public $timestamps = false;

    /**
     * Get the song details and notes of specified difficulty
     *
     * @param $id
     * @param $difficulty
     * @return mixed
     */
    public static function get($id, $difficulty)
    {
        return self::select(
            'title',
            'title_translit',
            'artist',
            'credit',
            'music',
            'background',
            'bg_artist',
            'offset',
            'bpms',
            'notes_' . $difficulty
            )
            ->where('id', $id)
            ->first();
    }

    /**
     * Return all the titles and translation of songs in the db
     * @return mixed
     */
    public static function getAllTitles()
    {
        // Assume that songs are weaboo songs. Titles are in japanese and translated
        // to english
        return self::select('title', 'title_translit')
            ->orderBy('title_translit')
            ->orderBy('title')
            ->get();
    }

    // SETTERS

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

    public function setBpmsAttribute($value)
    {
        $this->attributes['bpms'] = json_encode($value);
    }

    public function setOffsetAttribute($value)
    {
        $this->attributes['offset'] = (float) $value;
    }

    // ACCESSORS

    public function getNotesEasyAttribute($value)
    {
        return json_decode($value);
    }

    public function getNotesMediumAttribute($value)
    {
        return json_decode($value);
    }

    public function getNotesHardAttribute($value)
    {
        return json_decode($value);
    }

    public function getBpmsAttribute($value)
    {
        return json_decode($value);
    }

    public function getOffsetAttribute($value)
    {
        return (float) $value;
    }
}
