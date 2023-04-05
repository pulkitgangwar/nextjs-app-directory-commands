import * as vscode from "vscode";
import { getTemplate } from "./getTemplate";

export async function generateVscodePage(directoryPath: string, file: string) {
  const path = vscode.Uri.file(directoryPath + `/${file}`);
  await vscode.workspace.fs.writeFile(
    path,
    Buffer.from(getTemplate(file).trim())
  );

  return;
}
