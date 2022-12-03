#!/usr/bin/python

import sys

#### function definitions

def find_common_item(s1, s2):
    # getting rid of duplicates in each compartment
    deduped_s1 = ''.join(set(s1))
    deduped_s2 = ''.join(set(s2))

    # finding duplicates across compartments in smaller search space
    for c1 in deduped_s1:
        for c2 in deduped_s2:
            if (c1 == c2): 
                return c1

    raise ValueError(f"No common item in compartments {deduped_s1} and {deduped_s2}")

def calculate_priority(item):
    if item.islower():
        return ord(item) - 96 # 97 is ASCII value of 'a', -96 makes a = 1
    return ord(item) - 64 + 26 # 65 is ASCII value of 'A', -64 makes A = 1; +26 to make A = 27



#### actual program

try:
    inputfile = sys.argv[1]
except IndexError:
    print("No input file provided! Usage: python rucksack.py FILEPATH")
    sys.exit(2)


print("Using: " + inputfile)

file = open(inputfile, 'r')
count = 0
priority = 0

while True:
    line = file.readline()

    if not line:
        break
    
    count += 1
    middle = len(line) // 2  # Get middle of string. "//" is floor division
    first_compartment = line[:middle].strip()
    second_compartment = line[middle:].strip()
    
    common_item = find_common_item(first_compartment, second_compartment)
    item_priority = calculate_priority(common_item)
    print(f"found common item {common_item} with priority {item_priority}")
    priority += item_priority


print(f"Processing {count} backpack found a priority of {priority} mispacked items")


file.close()

