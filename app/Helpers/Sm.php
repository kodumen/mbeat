<?php

namespace App\Helpers;

class Sm
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

    // Song info
    public $title;
    public $title_translit;
    public $artist;
    public $credit;

    // Step info
    public $offset;
    public $bpms;

    // Notes
    public $notes_easy;
    public $notes_medium;
    public $notes_hard;

    public function parse($file_content)
    {
        // remove comments
        $file_content = preg_replace("/\/\/[^\n]*\n/", "", $file_content);

        $this->parseInfo($file_content);

        $notes_tag_start = strpos($file_content, self::NOTES . ':');
        $notes_raw = substr($file_content, $notes_tag_start);

        $this->notes_easy = $this->parseNotes($notes_raw, self::NOTES_EASY);
        $this->notes_medium = $this->parseNotes($notes_raw, self::NOTES_MEDIUM);
        $this->notes_hard = $this->parseNotes($notes_raw, self::NOTES_HARD);

        return $this;
    }

    /**
     * Parse song and step info.
     * @param $file_content
     */
    private function parseInfo($file_content)
    {
        $token = strtok($file_content, ';');    // represents a #TAG:VALUE pair
        while($token) {
            $tag_value_pair = explode(':', $token); // 0 is the tag and 1 is the value
            switch (trim($tag_value_pair[0])) {
                case self::TITLE:
                    $this->title = trim($tag_value_pair[1]);
                    break;
                case self::TITLE_TRANSLIT:
                    $this->title_translit = trim($tag_value_pair[1]);
                    break;
                case self::ARTIST:
                    $this->artist = trim($tag_value_pair[1]);
                    break;
                case self::CREDIT:
                    $this->credit = trim($tag_value_pair[1]);
                    break;
                case self::OFFSET:
                    $this->offset = trim($tag_value_pair[1]);
                    break;
                case self::BPMS:
                    $this->bpms = trim($tag_value_pair[1]);
                    break;
                default:
                    break;
            }
            $token = strtok(';');
        }
    }

    /**
     * parseNotes
     * @param $notes_raw
     * @param $difficulty
     * @return array
     */
    private function parseNotes($notes_raw, $difficulty)
    {
        $notes_raw = strtok($notes_raw, ';');

        while($notes_raw) {
            if (str_contains($notes_raw, $difficulty)) {
                $notes_raw = preg_replace("/.*:/", "", $notes_raw); // remove other info
                $notes_raw = trim(preg_replace("/\s+/", "\n", $notes_raw));

                $notes_array = explode(',', $notes_raw);

                foreach($notes_array as $key => $value) {
                    $notes_array[$key] = explode("\n", trim($value));
                }

                return $notes_array;
            }
            $notes_raw = strtok(';');
        }

        return [];
    }
}