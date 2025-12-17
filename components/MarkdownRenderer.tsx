import React from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const renderMarkdown = (text: string) => {
    // Split into lines to process block elements
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let inList = false;
    let listItems: string[] = [];

    const processInlineMarkdown = (line: string) => {
      // Bold (**text** or __text__)
      line = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      line = line.replace(/__(.+?)__/g, "<strong>$1</strong>");

      // Italic (*text* or _text_)
      line = line.replace(/\*(.+?)\*/g, "<em>$1</em>");
      line = line.replace(/_(.+?)_/g, "<em>$1</em>");

      // Code (`code`)
      line = line.replace(
        /`(.+?)`/g,
        '<code class="bg-primary/10 px-1 py-0.5 rounded text-primary text-sm">$1</code>'
      );

      return line;
    };

    const flushList = () => {
      if (inList && listItems.length > 0) {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="list-disc list-inside space-y-1 my-2"
          >
            {listItems.map((item, idx) => (
              <li
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: processInlineMarkdown(item),
                }}
              />
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      // Skip empty lines
      if (line.trim() === "") {
        flushList();
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // Headers (##, ###)
      if (line.startsWith("###")) {
        flushList();
        const text = line.replace(/^###\s*/, "");
        elements.push(
          <h3
            key={index}
            className="text-lg font-semibold mt-4 mb-2 text-foreground"
          >
            {text}
          </h3>
        );
      } else if (line.startsWith("##")) {
        flushList();
        const text = line.replace(/^##\s*/, "");
        elements.push(
          <h2
            key={index}
            className="text-xl font-bold mt-6 mb-3 text-foreground"
          >
            {text}
          </h2>
        );
      }
      // List items (* or -)
      else if (line.match(/^[\*\-]\s+/)) {
        inList = true;
        const text = line.replace(/^[\*\-]\s+/, "");
        listItems.push(text);
      }
      // Regular paragraph
      else {
        flushList();
        elements.push(
          <p
            key={index}
            className="mb-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }}
          />
        );
      }
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  return (
    <div className={`markdown-content ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
}
