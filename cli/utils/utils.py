#!/usr/bin/env python3
import fileinput
# Import regex module
import re

packageJson1 = '"version": ".*\..*\..*"'
packageJson2 = '"version": "1.1.1"'


def search_and_replace(file_path, search_regexp, replace_regexp):
    file = fileinput.input(files=(file_path), inplace=True)
    for line in file:
        line = re.sub(search_regexp, replace_regexp, line.strip())
        print(line)
    file.close()


def search_string(file_path, search_string, separator):
    input_file = open(file_path, 'r')
    lines = input_file.readlines()
    result = ''
    for line in lines:
        if search_string in line:
            return line[(line.find(separator) + 1):].rstrip()
    return result
