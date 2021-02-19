#!/bin/bash
    RED='\033[0;31m'
    NC='\033[0m' # No Color

function red(){
    printf "I ${RED}$1${NC} Stack Overflow\n"
}


function color_text(){
    printf "I $2$1${NC} Stack Overflow\n"
}


color_text 'ciao mamma' $RED



exit 1