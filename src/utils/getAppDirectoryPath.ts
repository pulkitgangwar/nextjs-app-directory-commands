import * as fs from "fs";

export function getAppDirectoryPath(projectRootPath: string) {
  if (fs.existsSync(projectRootPath + "/app")) {
    return "/app";
  } else if (fs.existsSync(projectRootPath + "/src/app")) {
    return "/src/app";
  } else {
    return;
  }
}
