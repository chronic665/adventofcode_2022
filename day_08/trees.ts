import * as fs from 'fs';


// let data = fs.readFileSync('input.txt','utf8');
class Forest {
    trees: Tree[][]
    constructor() {
        this.trees = [[]]
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
        // .then(forest => console.log(forest))
        .then(findVisibleTrees)
        .then(visibleTrees => console.log(`Visible Trees: `, visibleTrees))

});



async function splitToLines(data: string) : Promise<string[]> {
    return data.split("\n")
}

async function buildForest(lines: string[]): Promise<Forest> {
    console.log(`building forest from ${lines.length} lines`)
    let forest = new Forest()
    lines.forEach((line, row) => {
        forest.trees.push([])
        line.split("").forEach((height, col) => {
            forest.trees[row].push(new Tree(parseInt(height), new Position(row, col)))
        });      
    })
    return forest
}

async function findVisibleTrees(forest: Forest): Promise<number> {
    // let visibleOutside = (forest.trees.length + forest.trees[0].length)
    let visibleInside = 0
    forest.trees.forEach((row, x) => {
        row.forEach((tree, y) => {
            if (isVisibleInForest(tree, forest)) {
                visibleInside++
            }
        })
    })
    return visibleInside
}

function isVisibleInForest(tree: Tree, forest: Forest): boolean {
    console.log(`checking tree: ${JSON.stringify(tree)}`)

    let visible = true
    // up
    for(let y = tree.position.row - 1; y >= 0; y--) {
        visible = visible && isVisible(tree, forest.trees[y][tree.position.column])
    }
    if (visible) return true
    visible = true
    // left
    for(let x = tree.position.column - 1; x >= 0; x--) {
        visible = visible && isVisible(tree, forest.trees[tree.position.row][x])
    }
    if (visible) return true
    
    visible = true
    // down
    for(let y = tree.position.row + 1; y <= forest.trees[tree.position.row].length; y++) {
        visible = visible && isVisible(tree, forest.trees[y][tree.position.column])
    }
    if (visible) return true
    visible = true
    // right
    for(let x = tree.position.column + 1; x <= forest.trees[tree.position.column].length; x++) {
        visible = visible && isVisible(tree, forest.trees[tree.position.row][x])
    }
    if (visible) return true

    return false
}

function isVisible(tree: Tree, tree2: Tree) : boolean {
    if (!tree2) return true
    return tree.height > tree2.height
}