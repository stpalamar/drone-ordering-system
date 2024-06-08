#!/bin/bash

rm -r -f ./backend/public
mkdir ./backend/public; mv ./frontend/build/* ./backend/public;
