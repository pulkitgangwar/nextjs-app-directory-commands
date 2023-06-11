import * as vscode from "vscode";
import { generateFile } from "./utils/page/generateFile";
import { getAppDirectoryPath } from "./utils/getAppDirectoryPath";
import { getProjectInfo } from "./utils/getProjectInfo";
import { generateFlowChart } from "./utils/flowchart/generateFlowChart";

export async function activate(context: vscode.ExtensionContext) {
  let pageCommandDispose = vscode.commands.registerCommand(
    "nextjs-app-directory-commands.page",
    async () => {
      const project = await getProjectInfo();
      if (!project) {
        vscode.window.showErrorMessage("Unable to find package.json");
        return;
      }
      const appDirectoryPath = getAppDirectoryPath(project.rootPath);
      if (!appDirectoryPath) {
        vscode.window.showErrorMessage("Cannot find app folder");
        return;
      }

      if (!project || !project.rootPath || !appDirectoryPath) {
        vscode.window.showErrorMessage("Cannot find project");
        return;
      }

      await generateFile(project, appDirectoryPath);
    }
  );

  let flowchartCommandDispose = vscode.commands.registerCommand(
    "nextjs-app-directory-commands.flowchart",
    async () => {
      const project = await getProjectInfo();
      if (!project) {
        vscode.window.showErrorMessage("Unable to find package.json");
        return;
      }
      const appDirectoryPath = getAppDirectoryPath(project.rootPath);
      if (!appDirectoryPath) {
        vscode.window.showErrorMessage("Cannot find app folder");
        return;
      }

      const panel = vscode.window.createWebviewPanel(
        "Flowchart",
        "Flow Chart",
        vscode.ViewColumn.One,
        { enableScripts: true }
      );

      generateFlowChart(panel, project, appDirectoryPath);
    }
  );

  context.subscriptions.push(pageCommandDispose);
  context.subscriptions.push(flowchartCommandDispose);
}

// This method is called when your extension is deactivated
export function deactivate() {}
