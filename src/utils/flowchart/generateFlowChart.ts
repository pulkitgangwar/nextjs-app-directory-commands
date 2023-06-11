import * as vscode from "vscode";
import * as Walker from "walker";
import * as path from "path";
import { generateFlowChartText } from "./generateFlowChartText";
import { getWebviewContent } from "./getWebviewContent";

export function generateFlowChart(
  panel: vscode.WebviewPanel,
  project: {
    rootPath: string;
    typescriptEnabled: boolean;
  },
  appDirectoryPath: "/app" | "/src/app"
) {
  let directoryTuple: any = [];

  Walker(path.join(project.rootPath, appDirectoryPath))
    .filterDir((dir: any, stat: any) => {
      if (dir === path.join(project.rootPath, appDirectoryPath, "/api")) {
        console.log("skipping api folder");
        return false;
      }
      return true;
    })
    .on("dir", (dir: any, stat: any) => {
      const dirName = dir.split(
        path.join(project.rootPath, appDirectoryPath, path.sep)
      )[1];
      if (!dirName) return;

      const dirTuple: string[] = dirName
        .split(path.sep)
        .filter((dirSlice: string) => dirSlice);
      if (dirTuple.length === 1) {
        directoryTuple.push(["app", dirTuple[0]]);
      } else {
        directoryTuple.push([
          dirTuple[dirTuple.length - 2],
          dirTuple[dirTuple.length - 1],
        ]);
      }
    })
    .on("end", () => {
      panel.webview.html = getWebviewContent(
        generateFlowChartText(directoryTuple)
      );
    });
}
