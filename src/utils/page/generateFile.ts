import * as vscode from "vscode";
import * as Walker from "walker";
import * as fs from "fs";
import * as path from "path";
import { getFileName } from "./getFileName";
import { generateVscodePage } from "./generateVscodePage";

export async function generateFile(
  project: { rootPath: string; typescriptEnabled: boolean },
  appDirectoryPath: string
) {
  const fileName = await getFileName();
  if (!fileName) {
    vscode.window.showErrorMessage("Provide a valid file name");
    return;
  }

  const directories: { name: string; path: string }[] = [];
  const directoryPicker = vscode.window.createQuickPick();
  directoryPicker.placeholder = "Where to place this route directory?";
  const templatePicker = vscode.window.createQuickPick();
  templatePicker.placeholder = "Select the files to create in route directory.";
  templatePicker.canSelectMany = true;
  templatePicker.items = [
    { label: "Page" },
    { label: "Layout" },
    { label: "Error" },
    { label: "Loading" },
  ];

  Walker(path.join(project.rootPath, appDirectoryPath))
    .filterDir((dir: any, stat: any) => {
      if (dir === path.join(project.rootPath, appDirectoryPath, "/api")) {
        console.log("skipping api folder");
        return false;
      }
      return true;
    })
    .on("dir", (dir: any, stat: any) => {
      directories.push({
        name: dir.split(path.sep)[dir.split(path.sep).length - 1],
        path: dir,
      });
    })
    .on("end", () => {
      directoryPicker.items = directories.map((dir) => ({
        label: `${dir.name} -> ${
          dir.path.split(`${path.join(project.rootPath, path.sep)}`)[1]
        }`,
        value: dir.path,
      }));
      directoryPicker.show();
    });

  let directoryPath = "";
  directoryPicker.onDidChangeSelection(async (selection) => {
    if (selection[0]) {
      const pagePath = path.join((selection[0] as any).value, `/${fileName}`);

      directoryPath = pagePath;
      directoryPicker.hide();
      templatePicker.show();
    }
  });

  templatePicker.onDidAccept(async () => {
    if (templatePicker.selectedItems.length && directoryPath) {
      const files = templatePicker.selectedItems.map(
        (selection) =>
          `${selection.label.toLowerCase()}.${
            project.typescriptEnabled ? "tsx" : "jsx"
          }`
      );
      for await (let file of files) {
        if (fs.existsSync(path.join(directoryPath, `/${file}`))) {
          vscode.window.showErrorMessage("File already exists.");
          templatePicker.hide();
          return;
        } else {
          await generateVscodePage(directoryPath, file);
        }
      }

      templatePicker.hide();

      await vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.file(
          path.join(
            directoryPath,
            `/page.${project.typescriptEnabled ? "tsx" : "jsx"}`
          )
        )
      );
    } else {
      vscode.window.showErrorMessage("Please select valid files");
      templatePicker.hide();
      return;
    }
  });

  directoryPicker.onDidHide(() => {
    directoryPicker.dispose();
  });

  templatePicker.onDidHide(() => {
    directoryPicker.dispose();
  });
}
