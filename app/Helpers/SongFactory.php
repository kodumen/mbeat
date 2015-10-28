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

        $notes_raw = substr($file_content, strpos($file_content, self::NOTES . ':'));

        $song->notes_easy = self::parseNotes($notes_raw, self::NOTES_EASY);
        $song->notes_medium = self::parseNotes($notes_raw, self::NOTES_MEDIUM);
        $song->notes_hard = self::parseNotes($notes_raw, self::NOTES_HARD);

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
    private static function parseNotes($notes_raw, $difficulty)
    {
        $beats = [];

        // Extract raw notes of chosen difficulty
        // each difficulty is separated by a semicolon
        $notes_raw = strtok($notes_raw, ';');
        while($notes_raw) {
            if (str_contains($notes_raw, $difficulty)) {
                // remove other info and whitespace
                $notes_raw = preg_replace("/.*:/", "", $notes_raw);
                $notes_raw = trim(preg_replace("/\s+/", "\n", $notes_raw));

                $beats = explode(',', $notes_raw);

                foreach($beats as $key => $value) {
                    $beats[$key] = explode("\n", trim($value));
                }
            }
            $notes_raw = strtok(';');
        }

        // TODO: Convert beats to "mbeat-readable" format

        return $beats;
    }
}