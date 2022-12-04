#!/bin/zsh

TOTAL=0

while IFS='-,' read -r start1 end1 start2 end2; 
do
    # check if the pairs partially overlap
    if  [[ $start1 -le $start2 && $end1 -ge $start2 || $start2 -le $start1 && $end2 -ge $start1 || $start1 -le $end2 && $start1 -ge $start2 || $start2 -le $end1 && $start2 -ge $start1 ]]
    then
        echo "found line: [" $start1 "," $end1 "] <> [" $start2 "," $end2 "]"
        ((TOTAL=TOTAL + 1))
    fi
done < input.txt

echo "total overlapping: $TOTAL"