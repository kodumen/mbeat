<?php

namespace App\Helpers;

use App\Song;

class SongFactory
{
    const TITLE = '#TITLE';
    const TITLE_TRANSLIT = '#TITLETRANSLIT';
    const ARTIST = '#ARTIST';
    const CREDIT = '#CREDIT';
    const OFFSET = '#OFFSET';
    const BPMS = '#BPMS';
    const NOTES = '#NOTES';
    const NOTES_EASY = 'Easy';
    const NOTES_MEDIUM = 'Medium';
    const NOTES_HARD = 'Hard';

    public static function create($file_content)
    {
        $song = new Song();

        // remove comments
        $file_content = preg_replace("/\/\/[^\n]*\n/", "", $file_content);

        self::parseInfo($file_content, $song);

        $song->notes_easy = self::parseNotes($file_content, self::NOTES_EASY);
        $song->notes_medium = self::parseNotes($file_content, self::NOTES_MEDIUM);
        $song->notes_hard = self::parseNotes($file_content, self::NOTES_HARD);

        return $song;
    }

    /**
     * Parse song and step info.
     * @param $file_content
     */
    private static function parseInfo($file_content, $song)
    {
        $token = strtok($file_content, ';');    // represents a #TAG:VALUE pair
        while($token) {
            $tag_value_pair = explode(':', $token); // 0 is the tag and 1 is the value
            switch (trim($tag_value_pair[0])) {
                case self::TITLE:
                    $song->title = trim($tag_value_pair[1]);
                    break;
                case self::TITLE_TRANSLIT:
                    $song->title_translit = trim($tag_value_pair[1]);
                    break;
                case self::ARTIST:
                    $song->artist = trim($tag_value_pair[1]);
                    break;
                case self::CREDIT:
                    $song->credit = trim($tag_value_pair[1]);
                    break;
                case self::OFFSET:
                    $song->offset = trim($tag_value_pair[1]);
                    break;
                case self::BPMS:
                    $song->bpms = trim($tag_value_pair[1]);
                    break;
                default:
                    break;
            }
            $token = strtok(';');
        }
    }

    /**
     * Parse notes and convert into "mbeat-readable" format
     *
     * @param $notes_raw
     * @param $difficulty
     * @return array
     */
    private static function parseNotes($file_content, $difficulty)
    {
        $notes_raw = [];
        $notes = [];

        // Extract raw notes
        preg_match("/#NOTES:\s*([^:]+:\s*){2}$difficulty:\s*([^:]+:\s*){2}([^;]+)\s*;/", $file_content, $notes_raw);
        $notes_raw = $notes_raw[3]; // Take only the notes


        // Prepare raw notes for parsing
        $notes_raw = trim(preg_replace("/\s+/", "\n", $notes_raw)); // remove other whitespaces
        $notes = explode(',', $notes_raw);

        foreach ($notes as $key => $value) {
            $notes[$key] = explode("\n", trim($value));
        }

       // Convert to "mbeat-readable" format

        return $notes;
    }
}