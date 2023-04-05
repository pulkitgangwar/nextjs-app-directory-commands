import * as vscode from "vscode";

export async function getFileName() {
  const fileName = await vscode.window.showInputBox({
    value: "",
    placeHolder: "Enter the page directory name",
  });

  return fileName;
}
