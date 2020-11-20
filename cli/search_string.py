#!/usr/bin/python
import sys

if(len(sys.argv) == 3):
	searchString = sys.argv[1]
	filePath = sys.argv[2]
	print("{} {}".format(searchString, filePath))

	# Using readlines()
	file1 = open(filePath , 'r')
	lines = file1.readlines()

	result = 0
	for line in lines:
		if searchString in line :
			result = line[line.find('=')+1]

	sys.exit(result)
else:
	print('Missing parameters')
