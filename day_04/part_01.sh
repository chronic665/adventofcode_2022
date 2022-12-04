#!/bin/zsh

TOTAL=0

while IFS='-,' read -r start1 end1 start2 end2; 
do
    # check if either pair fully contains the other
    if [[ $start1 -le $start2 && $end1 -ge $end2 || $start2 -le $start1 && $end2 -ge $end1 ]]
    then
        ((TOTAL=TOTAL + 1))
    fi
done < input.txt

echo "total overlapping: $TOTAL"