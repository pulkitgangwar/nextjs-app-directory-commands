import * as vscode from "vscode";
import * as Walker from "walker";
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

  Walker(project.rootPath + appDirectoryPath)
    .filterDir((dir: any, stat: any) => {
      if (dir === project.rootPath + appDirectoryPath + "/api") {
        console.log("skipping api folder");
        return false;
      }
      return true;
    })
    .on("dir", (dir: any, stat: any) => {
      const dirName = dir.split(project.rootPath + appDirectoryPath)[1];
      if (!dirName) return;

      const dirTuple: string[] = dirName
        .split("/")
        .filter((dirSlice: string) => dirSlice);
      console.log(dirTuple);
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
      console.log(generateFlowChartText(directoryTuple));
      panel.webview.html = getWebviewContent(
        generateFlowChartText(directoryTuple)
      );
    });
}
