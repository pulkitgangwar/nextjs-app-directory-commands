export function getWebviewContent(flowchart: string) {
  return `<!DOCTYPE html>
    <html lang="en">
      <body>
        <pre class="mermaid">
        ${flowchart}
        </pre>
        <script type="module">
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
          mermaid.init({
            'theme':'base',
            'themeVariables': {
              'lineColor':'#fff'
            }
          });
        </script>
      </body>
    </html>`;
}
