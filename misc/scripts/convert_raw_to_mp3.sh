#!/bin/sh

# Usage : ./script.sh wav/file.wav
# # create a webm file in "mp3/file.mp3"

lame $1 $(echo $1 | sed "s/wav/mp3/g")
