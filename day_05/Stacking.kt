import java.io.File
import java.lang.IllegalStateException
import java.util.Stack

fun readInput(path: String) : List<String> {
    return File(path).bufferedReader().readLines()
}

fun readStacks(path: String) : List<String> {
    val input = readInput(path)
    val stackLines = mutableListOf<String>()
    input.forEach {
        if (it.isNotEmpty()) {
            println(it)
            stackLines.add(it)
        } else {
            return stackLines
        }
    }
    throw IllegalStateException("File didn't end")
}

fun parseStacks(path: String): MutableList<Stack<String>> {
    val stackLines = readStacks(path)
    val stackCount = stackLines.last().filter { it.isDigit() }.takeLast(1).toInt()

    val stacks = MutableList(stackCount) { Stack<String>() }
    for (stack in 0 until stackCount) {
        val stackPosition = if (stack == 0) 1 else 1 + stack * 4
        stackLines
                .subList(0, stackLines.size - 1)
                .map { line -> line.substring(stackPosition, stackPosition + 1)}
                .asReversed()
                .filter { it.isNotBlank() }
                .forEach { stacks[stack].push(it) }
    }
    return stacks
}


data class Instruction(private val moveCount: Int, private val from: Int, private val to: Int) {
    fun run(stacks: List<Stack<String>>) {
        println("Running instruction: $this")
        for (step in 0 until moveCount) {
            val item = stacks[from].pop()
            stacks[to].push(item)
        }
    }

    fun runVersion2(stacks: List<Stack<String>>) {
        println("Running instruction: $this")
        val temp = mutableListOf<String>()
        for (step in 0 until moveCount) {
            temp.add(stacks[from].pop())
        }
        temp
                .reversed()
                .forEach { stacks[to].push(it) }
    }
}

fun parseInstructions(path: String) : List<Instruction> {
    val lines = readInput(path)
    return lines
            .filter { it.startsWith("move") }
            .map { it.split("\\s".toRegex()).slice(1..5 step 2) }
            .map { Instruction(
                    it[0].toInt(),
                    it[1].toInt() - 1, // instruction text is 1 based, stack list index starts at 0
                    it[2].toInt() - 1) // instruction text is 1 based, stack list index starts at 0
            }

}

fun main() {
    val inputFilePath = "day_05/input.txt"
    val stacks = parseStacks(inputFilePath)

    println(stacks)

//    parseInstructions(inputFilePath).forEach { it.run(stacks) } // challenge 1
    parseInstructions(inputFilePath).forEach { it.runVersion2(stacks) } // challenge 2

    println(stacks)
    println(stacks.map { it.peek() })
}
