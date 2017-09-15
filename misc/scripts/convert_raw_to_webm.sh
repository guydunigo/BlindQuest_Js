#!/bin/sh

# Usage : ./script.sh wav/file.wav
# # create a webm file in "webm/file.webm"

ffmpeg -i $1 -dash 1 $(echo $1 | sed "s/wav/webm/g")
