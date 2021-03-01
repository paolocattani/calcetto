#!/bin/bash

mkdir test
cd test

mkdir prod
mkdir dev
touch test1.txt
touch test2.txt
touch prod/test1.txt
touch prod/test2.txt

shopt -s extglob
printf '%s\n' !(prod)
rm -rfv !(prod)
