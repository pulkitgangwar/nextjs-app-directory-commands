import * as fs from "fs";
import * as path from "path";

export function getAppDirectoryPath(projectRootPath: string) {
  if (fs.existsSync(path.join(projectRootPath, "/app"))) {
    return "/app";
  } else if (fs.existsSync(path.join(projectRootPath, "/src/app"))) {
    return "/src/app";
  } else {
    return;
  }
}
