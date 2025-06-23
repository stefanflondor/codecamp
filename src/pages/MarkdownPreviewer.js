import React, { useState } from 'react';
import { marked } from 'marked';

// This option helps interpret line breaks as <br>
marked.setOptions({
  breaks: true,
});

const defaultMarkdown = `# Welcome to my Markdown Previewer!

## This is a sub-heading...

[Check out FreeCodeCamp](https://www.freecodecamp.org)

Here is some inline code: \`<div></div>\`

\`\`\`
// This is a code block:
function sayHello() {
  console.log("Hello!");
}
\`\`\`

- This is a list item
- Another one

> This is a blockquote.

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

**This text is bold**
`;

function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Markdown Previewer</h1>
      <textarea
        id="editor"
        style={{ width: '100%', height: '200px', marginBottom: '2rem' }}
        value={markdown}
        onChange={handleChange}
      />
      <h2>Preview</h2>
      <div
        id="preview"
        style={{ border: '1px solid #333', padding: '1rem' }}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </div>
  );
}

export default MarkdownPreviewer;
