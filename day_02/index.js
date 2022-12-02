
const hands = {
    // ROCK
    "A": { 
        points: 1,
        beats: "C",
        loses: "B"
    },
    // PAPER
    "B":  { 
        points: 2,
        beats: "A",
        loses: "C"
    },
    // SCISSORS
    "C":  { 
        points: 3,
        beats: "B",
        loses: "A"
    },
}

function points(opponent, outcome) {
    // look up the opposing card for win/loss for the opponent, then get its points
    if (outcome == 'X') {
        return hands[hands[opponent].beats].points
    }
    if (outcome == 'Y') {
        return hands[opponent].points + 3
    }
    // win
    return hands[hands[opponent].loses].points + 6
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
  });
  

let totalPoints = 0
let games = 0
lineReader.on('line', function (line) {
    let choices = line.split(" ")
    totalPoints += points(choices[0], choices[1])
    games++
}).on("close", () => {
    console.log(`total points after ${games} games: ${totalPoints}`)
});
