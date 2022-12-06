package main

import (
	"fmt"
	"os"
	"strconv"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

// grow the marker, either fill until we reach the required marker length, or shift the marker left and append the latest symbol
func appendMarker(marker []string, read string, markerLength int) []string {
	if len(marker) < markerLength {
		return append(marker, read)
	}
	return append(marker[1:], read)
}

func checkMarker(marker []string, markerLength int) bool {
	if len(marker) < markerLength {
		return false
	}
	// create a helper map keeping track of unique values
	keys := make(map[string]bool)
	// we store unique values in a helper slice
	uniqueValues := []string{}
	for _, entry := range marker {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			uniqueValues = append(uniqueValues, entry)
		}
	}

	// if our unique values have the same length as the original marker, that means all elements in the marker are unique
	return len(uniqueValues) == len(marker)
}

func main() {

	markerLength, err := strconv.Atoi(os.Args[1])
	check(err)

	f, err := os.Open("input.txt")
	check(err)

	var marker []string
	var count int64 = 0

	// we're reading the file one byte at a time
	b := make([]byte, 1)
	for true {
		n1, err := f.Read(b)
		check(err)

		if n1 == 0 {
			fmt.Println("Reached end of file!!!")
			return
		}

		// extract current symbol from byte read from file
		var read = string(b[:n1])

		count++
		marker = appendMarker(marker, read, markerLength)
		fmt.Printf("new potential Marker: %v\n", marker)
		if len(marker) > markerLength {
			panic("marker slice has grown out of control!")
		}

		if checkMarker(marker, markerLength) {
			fmt.Printf("Found marker '%v' at position: %d", marker, count)
			return
		}

	}

}
