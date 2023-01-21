## Lightning Markdown

Lightning Markdown is a powerful, programmable, markdown text editor for the web.

### Example

```text
[text]Hello, World![/text]
[text]This is [strong]Lightning Markdown[/strong][/text] 
[text]This is [link]https://github.com[/link][/text] 
```
It will be rendered as:

```html
<p>Hello, World!</p>
<p>This is <b>Lightning Markdown</b></p>
<p>This is <a href="https://github.com">https://github.com</a></p>
```

Cool, isn't it?

### Features

- [x] Text
- [x] Strong
- [x] Videos
- [x] Images
- [x] Links
- [ ] Code
- [ ] Lists
- [ ] Tables
- [ ] Iframes

### Installation

```bash
npm install lightning-markdown
``` 

### Usage

```javascript
import lightningMarkdown from 'lightning-markdown';

const markdown = lightningMarkdown('[text]Hello, World![/text]');

console.log(markdown);
```

In react:

```javascript

import React from 'react';
import lightningMarkdown from '@thethiago27/lightning-markdown';

const App = () => {
  const markdown = lightningMarkdown('[text]Hello, World![/text]');

  return (
    <div dangerouslySetInnerHTML={{ __html: markdown }}>
      {markdown}
    </div>
  );
}

export default App;
```

### License

MIT

### Author
thethiago27
