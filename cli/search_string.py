#!/usr/bin/python
import sys

# python search_string.py 'TYPE' '../hooks/.hooks' '*'
if(len(sys.argv) == 4):
    searchString = sys.argv[1]
    filePath = sys.argv[2]
    searchLength = sys.argv[3]
    print("{} {}".format(searchString, filePath))

    # Using readlines()
    inputFile = open(filePath, 'r')
    lines = inputFile.readlines()
    result = ''
    for line in lines:
        if searchString in line:
            separator = line.find('=') + 1
            if searchLength != '*':
                result = line[separator]
            else:
                result = line[separator:].rstrip()
    sys.exit(result)
else:
    print('Missing parameters')
