#!/bin/bash

arecord --format=S16_LE --rate=16000 --duration=5  --file-type=wav out.wav
