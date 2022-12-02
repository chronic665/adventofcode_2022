
const opponentChoices = {
    "ROCK": { sign: "A" },
    "PAPER": { sign: "B" },
    "SCISSORS": { sign: "C" }
}

const hands = {
    // ROCK
    "X": {
        points: 1,
        draws: (sign) => sign == opponentChoices["ROCK"].sign,
        beats: (sign) => sign == opponentChoices["SCISSORS"].sign
    },
    // PAPER
    "Y": {
        points: 2,
        draws: (sign) => sign == opponentChoices["PAPER"].sign,
        beats: (sign) => sign == opponentChoices["ROCK"].sign
    },
    // SCISSORS
    "Z": {
        points: 3,
        draws: (sign) => sign == opponentChoices["SCISSORS"].sign,
        beats: (sign) => sign == opponentChoices["PAPER"].sign
    }
}

function points(opponent, choice) {
    if (choice.beats(opponent)) {
        return choice.points + 6
    }
    if (choice.draws(opponent)) {
        return choice.points + 3
    }
    // looses
    return choice.points
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('input.txt')
  });
  

let totalPoints = 0
let games = 0
lineReader.on('line', function (line) {
    let choices = line.split(" ")
    totalPoints += points(choices[0], hands[choices[1]])
    games++
}).on("close", () => {
    console.log(`total points after ${games} games: ${totalPoints}`)
});

