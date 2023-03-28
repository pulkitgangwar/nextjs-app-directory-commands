export function getTemplate(file: string) {
  const templates = {
    "page.ts": `
    export default function Page() {
      return <h1>Hello, Next.js!</h1>;
    }`,
    "page.js": `
    export default function Page() {
      return <h1>Hello, Next.js!</h1>;
    }`,
    "layout.ts": `
    export default function Layout({
      children,
    }: {
      children: React.ReactNode,
    }) {
      return (
        <section>
          <nav></nav>
          {children}
        </section>
      );
    }`,
    "layout.js": `
    export default function Layout({
      children, 
    }) {
      return (
        <section>
          <nav></nav>
          {children}
        </section>
      );
    }`,
    "loading.ts": `
    export default function Loading() {
      return <div>Loading..</div>
    }`,
    "loading.js": `
    export default function Loading() {
      return <div>Loading..</div>
    }`,
    "error.ts": `
    import { useEffect } from 'react';

    export default function Error({
      error,
      reset,
    }: {
      error: Error;
      reset: () => void;
    }) {
      useEffect(() => {
        console.error(error);
      }, [error]);
    
      return (
        <div>
          <h2>Something went wrong!</h2>
          <button
            onClick={
              () => reset()
            }
          >
            Try again
          </button>
        </div>
      );
    }
    `,
    "error.js": `
    import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
`,
  };

  //@ts-ignore
  return templates[file as any];
}
