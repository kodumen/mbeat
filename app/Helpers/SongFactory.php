<?php

namespace App\Helpers;

use App\Song;

class SongFactory
{
    const TITLE = '#TITLE';
    const TITLE_TRANSLIT = '#TITLETRANSLIT';
    const ARTIST = '#ARTIST';
    const CREDIT = '#CREDIT';
    const MUSIC = '#MUSIC';
    const BACKGROUND = '#BACKGROUND';
    const BG_ARTIST = '#BGARTIST';
    const OFFSET = '#OFFSET';
    const BPMS = '#BPMS';
    const NOTES = '#NOTES';
    const NOTES_EASY = 'Easy';
    const NOTES_MEDIUM = 'Medium';
    const NOTES_HARD = 'Hard';

    const MIN_BEATS_PER_MEASURE = 4;

    public static function create($file_content)
    {
        $song = new Song();

        // remove comments
        $file_content = preg_replace("/\/\/[^\n]*\n/", "", $file_content);

        self::parseInfo($file_content, $song);

        $song->notes_easy = self::parseNotes($file_content, self::NOTES_EASY, $song);
        $song->notes_medium = self::parseNotes($file_content, self::NOTES_MEDIUM, $song);
        $song->notes_hard = self::parseNotes($file_content, self::NOTES_HARD, $song);

        unset($song->bpms); // bpms is no longer needed

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
            $tag_value_pair = explode(':', $token, 2); // 0 is the tag and 1 is the value
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
                case self::BG_ARTIST:
                    $song->bg_artist = trim($tag_value_pair[1]);
                    break;
                case self::MUSIC:
                    $song->music = trim(stripslashes($tag_value_pair[1]));
                    break;
                case self::BACKGROUND:
                    $song->background = trim(stripslashes($tag_value_pair[1]));
                    break;
                case self::BPMS:
                    $song->bpms = explode(',', trim($tag_value_pair[1]));
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
    private static function parseNotes($file_content, $difficulty, Song $song)
    {
        $notes_raw = [];

        // Extract raw notes
        preg_match("/#NOTES:\s*([^:]+:\s*){2}$difficulty:\s*([^:]+:\s*){2}([^;]+)\s*;/", $file_content, $notes_raw);
        $notes_raw = $notes_raw[3]; // Take only the notes


        // Prepare raw notes for parsing
        // Include beat number
        $notes_raw = trim(preg_replace("/\s+/", "\n", $notes_raw)); // remove other whitespaces
        $measures = explode(',', $notes_raw);
        $beat_num = 0;
        foreach ($measures as $key => $value) {
            $measures[$key] = explode("\n", trim($value));

            $beat_fraction = self::MIN_BEATS_PER_MEASURE / count($measures[$key]);

            foreach ($measures[$key] as $beat => $notes) {
                $measures[$key][$beat] = ['number' => $beat_num, 'notes' => $notes];
                $beat_num += $beat_fraction;
            }
        }

        // Convert to "mbeat-readable" format
        // Starting from the last beat and last bpm, calculate the time of the beat
        $bpms = $song->bpms;
        $curr_bpm = explode('=', $bpms[count($bpms) - 1]);
        $mbeat = [];

        while ($curr_measure = array_pop($measures)) {
            while ($curr_beat = array_pop($curr_measure)) {
                if ($curr_beat['notes'] == '0000') {
                    continue;
                }

                // Change bpm
                if ($curr_beat['number'] <= $curr_bpm[0]) {
                    array_pop($bpms);
                    $curr_bpm = explode('=', $bpms[count($bpms) - 1]);
                }

                // An expensive process, sure, but it works so I'll keep it for now.
                $time = self::getTotalTime($bpms, $curr_beat['number']);

                array_unshift($mbeat, [
                    'time' => $time - $song->offset,
                    'notes' => $curr_beat['notes'],
                ]);
            }
        }

        return $mbeat;
    }

    /**
     * Get the total time of bpms up to beat number.
     *
     * @param array $bpms
     * @param $beat_number
     */
    public static function getTotalTime(array $bpms, $beat_number)
    {
        $curr_bpm = explode('=', array_shift($bpms));
        $next_bpm = explode('=', array_shift($bpms));
        $time = 0;

        while($next_bpm[0]) {
            $time += ($next_bpm[0] - $curr_bpm[0]) * 60 /*sec*/ / $curr_bpm[1];
            $curr_bpm = $next_bpm;
            $next_bpm = explode('=', array_shift($bpms));
        }

        $time += ($beat_number - $curr_bpm[0]) * 60 /*sec*/ / $curr_bpm[1];

        return $time;
    }
}