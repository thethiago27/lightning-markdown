const serialize = (text: string) => {
  text = text.replace(
    /\[caption\]\[image\](.*?)\[\/image\](.*?)\[\/caption\]/g,
    (match, image, caption) => {
      return serializeCaption(image, caption);
    }
  );

  text = text.replace(/\[title](.*?)\[\/title]/g, (match, p1) => {
    return serializeTag("h1", p1);
  });

  text = text.replace(/\[subtitle](.*?)\[\/subtitle]/g, (match, p1) => {
    return serializeTag("h2", p1);
  });

  text = text.replace(/\[image](.*?)\[\/image]/g, (match, p1) => {
    return serializeImage(p1);
  });

  text = text.replace(/\[link](.*?)\[\/link]/g, (match, p1) => {
    return serializeLink(p1);
  });

  text = text.replace(/\[text](.*?)\[\/text]/g, (match, p1) => {
    return serializeTag("p", p1);
  });

  text = text.replace(/\[strong](.*?)\[\/strong]/g, (match, p1) => {
    return serializeTag("strong", p1);
  });

  text = text.replace(/\[italic](.*?)\[\/italic]/g, (match, p1) => {
    return serializeTag("i", p1);
  });

  text = text.replace(/\[video](.*?)\[\/video]/g, (match, p1) => {
    return serializeVideo(p1);
  });

  text = text.replace(/\[code](.*?)\[\/code]/g, (match, p1) => {
    return serializeTag("code", p1);
  });

  text = text.replace(/\[iframe](.*?)\[\/iframe]/g, (match, p1) => {
    return serializeIframe(p1);
  });

  return text;
};

const serializeTag = (tag: string, text: string): string => {
  return `<${tag}>${text}</${tag}>`;
};

const serializeImage = (src: string) => {
  return `<img src="${src}" />`;
};

const serializeLink = (text: string) => {
  return `<a href="${text}">${text}</a>`;
};

const serializeCaption = (image: string, text: string) => {
  return `<figure><img src="${image}" /><figcaption>${text}</figcaption></figure>`;
};

const serializeIframe = (text: string) => {
  return `<iframe src="${text}"></iframe>`;
};

const serializeVideo = (text: string) => {
  return `<video controls preload="auto"><source src="${text}">Your browser does not support the video tag.</video>`;
};

const validate = (text: string) => {
  const tags = [
    "title",
    "subtitle",
    "image",
    "link",
    "text",
    "strong",
    "italic",
    "video",
    "code",
    "iframe",
    "caption",
  ];

  tags.forEach((tag) => {
    const openTag = `[${tag}]`;
    const closeTag = `[/${tag}]`;

    const openTagCount = text.split(openTag).length - 1;
    const closeTagCount = text.split(closeTag).length - 1;

    if (openTagCount !== closeTagCount) {
      throw new Error(`Invalid tag count for ${tag}`);
    }

    // Check if the tag is a caption
    if (tag === "caption") {
      const tagMatch = text.match(/\[caption\](.*?)\[\/caption\]/g);

      if (tagMatch) {
        tagMatch.forEach((match) => {
          const imageCount = match.split("[image]").length - 1;
          const imageCloseCount = match.split("[/image]").length - 1;

          if (imageCount !== 1 || imageCloseCount !== 1) {
            throw new Error(`Invalid use of caption tag`);
          }
        });
      }
    }
  });
};

const serializeRichText = (text: string) => {
  validate(text);
  return serialize(text);
};

export default serializeRichText;
