#!/usr/bin/env bash
#
# This script assumes a linux environment

echo "*** EasyDutch: Assembling EasyDutch.txt"
node ./tools/make-list.js in=tools/dutch-filter-list.template out=Personal%20List%20(uBo).out.txt
