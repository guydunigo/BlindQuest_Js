#!/bin/sh

# To be started in the sounds directory containing a wav dir with the wav sounds in it

rm -Rf mp3 webm
mkdir mp3 webm

TO_MP3="../misc/scripts/convert_raw_to_mp3.sh"
TO_WEBM="../misc/scripts/convert_raw_to_webm.sh"

find wav/ -name "*.wav" -exec echo \{\} \; -exec sh $TO_MP3 \{\} \; -exec sh $TO_WEBM \{\} \;