#!/usr/bin/python

import sys

#### function definitions

def find_common_item(rucksacks):
    if len(rucksacks) != 3:
        raise ValueError(f"Expected batches of 3 rucksacks, got {len(rucksacks)}")
    # getting rid of duplicates in each compartment
    deduped_s1 = ''.join(set(rucksacks[0]))
    deduped_s2 = ''.join(set(rucksacks[1]))
    deduped_s3 = ''.join(set(rucksacks[2]))

    # finding duplicates across compartments in smaller search space
    common_in_first_two = []
    for c1 in deduped_s1:
        for c2 in deduped_s2:
            if c1 == c2: 
                common_in_first_two.append(c1)

    for c in common_in_first_two:
        for c3 in deduped_s3:
            if c == c3:
                return c

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

current_batch = []
while True:
    line = file.readline()

    if not line:
        break
    
    current_batch.append(line.strip())

    if len(current_batch) < 3:
        continue

    common_item = find_common_item(current_batch)

    item_priority = calculate_priority(common_item)
    print(f"found common item {common_item} with priority {item_priority}")
    priority += item_priority
    current_batch = []
    count += 1


print(f"Processing {count} backpack batches found a priority of {priority} mispacked items")


file.close()

