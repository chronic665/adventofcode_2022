import java.text.NumberFormat

class Result {
    long total = 0
}

def root = new ElfInput().parse()

//root.print()

def result = new Result()
sumFoldersSmallerThan(100000, root, result)

println("total size of folders: ${formatNumber(result.total)} (for copying: ${result.total}")


// challenge 01
def sumFoldersSmallerThan(long size, ElfFolder currentFolder, Result result) {
    def folderSize = currentFolder.totalSize()
    if(folderSize <= size) {
        result.total += folderSize
        println("adding folder ${currentFolder.name} with size $folderSize, total: ${NumberFormat.getNumberInstance(Locale.US).format(result.total)}")
    }
    if (!currentFolder.folders.isEmpty()) {
        currentFolder.folders.forEach {sumFoldersSmallerThan(size, it, result) }
    }
}


def formatNumber(long number) {
    return NumberFormat.getNumberInstance(Locale.US).format(number)
}