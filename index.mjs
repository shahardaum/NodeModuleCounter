import fs, { readdir } from "fs/promises";
import path from "path";

async function countFiles(dirPath, count = 0) {
  // get list of content that display in the dir
  const dirContents = await fs.readdir(dirPath, { withFileTypes: true });

  // go over the dir and check for each file dir/file
  for (let dirent of dirContents) {
    // if file count++
    if (dirent.isFile()) {
      count++;
    } else if (dirent.isDirectory()) {
      // if dir call the function again

      count = await countFiles(path.join(dirPath, dirent.name), count);
    }
  }
  return count;
}

const result = await countFiles("./node_modules");
console.log(result);
