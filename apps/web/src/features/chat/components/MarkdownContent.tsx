"use client";

import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="text-[13px] leading-relaxed text-foreground sm:text-sm">
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-0.5">{children}</li>,
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-lg bg-secondary/60 p-3 text-xs">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-secondary/60 px-1.5 py-0.5 text-xs">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="mb-2 last:mb-0">{children}</pre>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
