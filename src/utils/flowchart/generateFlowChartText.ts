export function generateFlowChartText(directoryTuple: any[]) {
  return `flowchart TD 
      ${directoryTuple
        .map((dirTuple) => `${dirTuple[0]} ==> ${dirTuple[1]}`)
        .join("\n")}
    `;
}
