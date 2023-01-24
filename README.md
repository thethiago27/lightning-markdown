## Lightning Markdown

Lightning Markdown is a powerful, programmable, markdown text editor for the web.

### Example

```text
[text]Hello, World![/text]
[text]This is [strong]Lightning Markdown[/strong][/text]
[text]This is [link]https://github.com[/link][/text]
[video]URL[/video]
[italic]This is italic[/italic]
[strong]This is strong[/strong]
[link]URL[/link]
[code]This is code[/code]
[iframe]URL[/iframe]
[caption][image]URL[/image]This a Caption[/caption]
```

It will be rendered as:

```html
<p>Hello, World!</p>
<p>This is <b>Lightning Markdown</b></p>
<p>This is <a href="https://github.com">https://github.com</a></p>
<video src="URL"></video>
<i>This is italic</i>
<b>This is strong</b>
<a href="URL">URL</a>
<code>This is code</code>
<iframe src="URL" />
<figure>
  <img src="URL" />
  <figcaption>This a Caption</figcaption>
</figure>
```

Cool, isn't it?

### Features

- [x] Text
- [x] Strong
- [x] Videos
- [x] Images
- [x] Links
- [x] Code
- [x] Iframes
- [x] Captions
- [ ] Lists
- [ ] Tables

### Installation

```bash
npm install lightning-markdown
```

### Usage

Live Demo: https://stackblitz.com/edit/js-va7j6t?file=index.js

```javascript
import lightningMarkdown from "lightning-markdown";

const markdown = lightningMarkdown("[text]Hello, World![/text]");

console.log(markdown);
```

In react:

```javascript
import React from "react";
import lightningMarkdown from "lightning-markdown";

const App = () => {
  const markdown = lightningMarkdown("[text]Hello, World![/text]");

  return <div dangerouslySetInnerHTML={{ __html: markdown }}>{markdown}</div>;
};

export default App;
```

### License

MIT

### Author

thethiago27
