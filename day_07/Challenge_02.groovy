import java.text.NumberFormat

class SmallestFolder {
    String name
    long size = Long.MAX_VALUE
}


// challenge 02
def findSmallestFolderOver(long minSize, ElfFolder currentFolder, SmallestFolder result) {
    def folderSize = currentFolder.totalSize()

    if (folderSize >= minSize) {
        println("comparing folder ${currentFolder.name} [${formatNumber(folderSize)}] to ${formatNumber(result.size)}")
        if (folderSize < result.size) {
            result.name = currentFolder.name
            result.size = folderSize
            println("\t found smaller folder ${result.name} [${formatNumber(result.size)}]")
        }
    }

    if (!currentFolder.folders.isEmpty()) {
        currentFolder.folders.forEach { findSmallestFolderOver(minSize, it, result) }
    }
}

def root = new ElfInput().parse()

def diskSize = 70000000
def result = new SmallestFolder()
def freeSpace = diskSize - root.totalSize()
def requiredSpace = 30000000

def minSize = requiredSpace - freeSpace

println("finding smallest folder over ${formatNumber(minSize)} to expand ${formatNumber(freeSpace)} to get ${formatNumber(requiredSpace)}")
findSmallestFolderOver(minSize, root, result)

println("smallest folder is ${result.name} (${result.size})")


def formatNumber(long number) {
    return NumberFormat.getNumberInstance(Locale.US).format(number)
}