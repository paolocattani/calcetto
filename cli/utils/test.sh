#!/bin/bash


STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACMR | grep -E "*.(jsx|js|ts|tsx)$")
   for file in $STAGED_FILES
   do
      if [[ $file != *.d.ts ]]; then 
         echo $file
      fi
   done
