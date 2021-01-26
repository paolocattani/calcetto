#!/usr/bin/python
import sys

# python search_string.py 'TYPE' '../hooks/.hooks' '*'
if(len(sys.argv) == 3):
    searchString = sys.argv[1]
    filePath = sys.argv[2]
    #print("{} {}".format(searchString, filePath))

    # Using readlines()
    inputFile = open(filePath, 'r')
    lines = inputFile.readlines()
    result = ''
    for line in lines:
        if searchString in line:
            separator = line.find('=') + 1
            result = line[separator:].rstrip()
    print(result)
else:
    print('')
