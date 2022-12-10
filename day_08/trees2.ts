import * as fs from 'fs';


// let data = fs.readFileSync('input.txt','utf8');
class Forest {
    trees: Tree[][]
    constructor() {
        this.trees = []
    }

    print() : string {
        let print = `[${this.trees.length}|${this.trees[0].length}]\n`
        this.trees.forEach((row, y) => {
            print += "[ "
            row.forEach((tree, x) => {
                print += ` (${tree.position.row}|${tree.position.column})`
            })
            print += " ]\n"
        })
        return print
    }
}

class Tree {
    height: number
    position: Position
    constructor(height: number, position: Position) {
        this.height = height
        this.position = position
    }
}

class Position {
    row: number
    column: number
    constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }
}

fs.readFile('input.txt', (err, data) => {
    if (err) {
        return console.error(err);
    }
    splitToLines(data.toString())
        .then(buildForest)
        .then(forest => {
            console.log(forest.print())
            return Promise.resolve(forest)
        })
        .then(findVisibleTrees)
        .then(maxSight => console.log(`Maximum view: `, maxSight))

});



async function splitToLines(data: string) : Promise<string[]> {
    return data.split("\n")
}

async function buildForest(lines: string[]): Promise<Forest> {
    console.log(`building forest from ${lines.length} lines`)
    let forest = new Forest()
    lines.forEach((line, row) => {
        if (line.trim().length != 0){
            forest.trees.push([])
            line.split("").forEach((height, col) => {
                forest.trees[row].push(new Tree(parseInt(height), new Position(row, col)))
            });      
        }
    })
    return forest
}

async function findVisibleTrees(forest: Forest): Promise<number> {
    // let visibleOutside = (forest.trees.length + forest.trees[0].length)
    let maxSight = 0
    forest.trees.forEach((row, y) => {
        row.forEach((tree, x) => {
            if (y == 0 || x == 0 || y == row.length -1 || x == forest.trees.length -1 ) {
                // skip the outermost trees
                return
            }
            let sight = calculateSighLines(tree, forest)
            if (sight > maxSight) {
                maxSight = sight
            }
        })
    })
    return maxSight
}

function calculateSighLines(tree: Tree, forest: Forest): number {
    console.log(`checking tree: ${JSON.stringify(tree)}`)

    let distance: number[] = []
    let dist = 0
    let push = false
    // up
    for(let y = tree.position.row - 1; y >= 0; y--) {
        dist++
        push = true
        let tree2 = forest.trees[y][tree.position.column]
        console.log(`\t[u] [${dist}] height ${tree.height} vs ${JSON.stringify(tree2)}`)
        
        if(tree != tree2 && tree.height <= tree2.height){
            break;
        }
    }
    if (push) distance.push(dist)
    
    // left
    dist = 0
    push = false
    for(let x = tree.position.column - 1; x >= 0; x--) {
        dist++
        push = true
        let tree2 = forest.trees[tree.position.row][x]
        console.log(`\t[l] [${dist}] height ${tree.height} vs ${JSON.stringify(tree2)}`)
        
        if(tree != tree2 && tree.height <= tree2.height){
            break;
        }
    }
    if (push) distance.push(dist)
    
    // down
    dist = 0
    push = false
    for(let y = tree.position.row + 1; y < forest.trees[tree.position.row].length; y++) {
        push = true
        dist++
        let tree2 = forest.trees[y][tree.position.column]
        console.log(`\t[d] [${dist}] height ${tree.height} vs ${JSON.stringify(tree2)}`)
        if(tree != tree2 && tree.height <= tree2.height){
            break;
        }
    }
    if (push) distance.push(dist)
    
    // right
    dist = 0
    push = false
    for(let x = tree.position.column + 1; x < forest.trees[tree.position.column].length; x++) {
        push = true
        dist++
        let tree2 = forest.trees[tree.position.row][x]
        console.log(`\t[r] [${dist}] height ${tree.height} vs ${JSON.stringify(tree2)}`)
        if(tree != tree2 && tree.height <= tree2.height){
            break;
        }
    }
    if (push) distance.push(dist)
    
    console.log(`\t distances: ${distance}`)
    let sight = distance.reduce((accumulator, current) => {
        return accumulator * current;
      }, 1);
    console.log(`\t sight: ${sight}`)
    return sight
}

