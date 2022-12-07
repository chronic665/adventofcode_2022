import java.text.NumberFormat

class ElfFile {
    String name
    long size

    ElfFile(name, size) {
        this.name = name
        this.size = size
    }

    String toString() {
        "$name (file, size=${size})"
    }
}

class ElfFolder {
    String name
    ElfFolder parent
    List<ElfFolder> folders
    List<ElfFile> files

    ElfFolder(name, parent) {
        this.name = name
        this.parent = parent
        folders = new ArrayList<>()
        files = new ArrayList<>()
    }

    def getChild(String folderName) {
        return folders.find {it.name == folderName}
    }

    def addFolder(String folderName) {
        def existingFolder = getChild(folderName)
        if (existingFolder == null) {
            folders.add(new ElfFolder(folderName, this))
        }
    }

    def addFile(String fileName, long size) {
//        println("adding file $fileName with size $size to folder ${this.name}")
        files.add(new ElfFile(fileName, size))
    }

    def print(indentation = 0) {
        def indent = "\t"*indentation
//        println("$indent- ${this.name} (dir) totalSize: ${totalSize()}")
        files.forEach {println("$indent\t - ${it.toString()}") }
        folders.forEach {println("$indent\t - ${it.print(indentation + 1)}") }
    }

    long totalSize() {
        def childrenSizes = 0
        if (!folders.isEmpty()) {
            childrenSizes = folders.collect { it.totalSize() }.sum()
        }
        def size = 0
        if (!files.isEmpty()) {
            size = files.collect { it.size }.sum()
        }
        def totalSize = childrenSizes + size
//        println("folder $name contains files with size $size and folders with size $childrenSizes, totalling $totalSize")
        return totalSize
    }
}

class ElfInput {
    def commandPrefix = "\$"
    def root = new ElfFolder("/", null)
    def currentFolder = root

    def parse() {
        new File("input.txt")
                .eachLine {
                    if (it.startsWith("$commandPrefix cd")) {
                        def folderName = it.substring(5)
//                        println("changing directory to $folderName")
                        if (folderName == "..") {
                            currentFolder = currentFolder.parent
                        } else if (folderName == "/") {
                            currentFolder = root
                        } else {
                            currentFolder = currentFolder.getChild(folderName)
                        }
//                        println("\tnew folder is now ${currentFolder.name}")
                        return
                    }
                    if (it.startsWith("dir")) {
                        def folderName = it.substring(4)
                        currentFolder.addFolder(folderName)
                        return
                    }
                    if (it.startsWith(commandPrefix)) {
//                        println("found command $it")
                        return
                    }

                    def fileContent = it.split(" ")
                    currentFolder.addFile(fileContent[1], Long.parseLong(fileContent[0]))
                }
        return root
    }

}
