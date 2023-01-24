import serializeRichText from "../lib/index";

describe("markdown test", () => {
  it("should render markdown", () => {
    const text = "[text]This is a title[/text]";
    const result = serializeRichText(text);
    expect(result).toBe("<p>This is a title</p>");
  });

  it("Should render markdown with multiple tags", () => {
    const text = "[text]This is a title[/text][text]This is a subtitle[/text]";
    const result = serializeRichText(text);
    expect(result).toBe("<p>This is a title</p><p>This is a subtitle</p>");
  });

  it("Should render markdown with image tag", () => {
    const text = "[image]https://www.google.com[/image]";
    const result = serializeRichText(text);
    expect(result).toBe('<img src="https://www.google.com" />');
  });

  it("Should render markdown with link tag", () => {
    const text = "[link]https://www.google.com[/link]";
    const result = serializeRichText(text);
    expect(result).toBe(
      '<a href="https://www.google.com">https://www.google.com</a>'
    );
  });

  it("Should render markdown with strong tag", () => {
    const text = "[strong]This is strong[/strong]";
    const result = serializeRichText(text);
    expect(result).toBe("<strong>This is strong</strong>");
  });

  it("Should render markdown with italic tag", () => {
    const text = "[italic]This is italic[/italic]";
    const result = serializeRichText(text);
    expect(result).toBe("<i>This is italic</i>");
  });

  it("Should render markdown with video tag", () => {
    const text = "[video]https://www.google.com[/video]";
    const result = serializeRichText(text);
    expect(result).toBe(
      '<video controls preload="auto"><source src="https://www.google.com">Your browser does not support the video tag.</video>'
    );
  });

  it("Should render markdown with code tag", () => {
    const text = "[code]This is code[/code]";
    const result = serializeRichText(text);
    expect(result).toBe("<code>This is code</code>");
  });

  it("Should render markdown with iframe tag", () => {
    const text = "[iframe]https://www.google.com[/iframe]";
    const result = serializeRichText(text);
    expect(result).toBe('<iframe src="https://www.google.com"></iframe>');
  });

  it("Should render markdown with caption tag", () => {
    const text =
      "[caption][image]https://example.com[/image]This is caption[/caption]";
    const result = serializeRichText(text);
    expect(result).toBe(
      '<figure><img src="https://example.com" /><figcaption>This is caption</figcaption></figure>'
    );
  });

  it("Should return error if dont contain a image in caption tag", () => {
    const text = "[caption]This is caption[/caption]";
    expect(() => serializeRichText(text)).toThrowError(
      "Invalid use of caption tag"
    );
  });

  it("Should render markdown with title tag", () => {
    const text = "[title]This is title[/title]";
    const result = serializeRichText(text);
    expect(result).toBe("<h1>This is title</h1>");
  });

  it("Should render markdown with subtitle tag", () => {
    const text = "[subtitle]This is subtitle[/subtitle]";
    const result = serializeRichText(text);
    expect(result).toBe("<h2>This is subtitle</h2>");
  });

  it("Should return error if tag is not closed", () => {
    const text = "[text]This is a title";
    expect(() => serializeRichText(text)).toThrowError(
      "Invalid tag count for text"
    );
  });

  it("Should return error if tag is not opened", () => {
    const text = "This is a title[/text]";
    expect(() => serializeRichText(text)).toThrowError(
      "Invalid tag count for text"
    );
  });

  it("Should return the complete text", () => {
    const text =
      "[title]This is a title[/title][subtitle]This is a subtitle[/subtitle][text]This is a text[/text][text]This is a text with a hyperlink [link]https://google.com[/link][/text][image]https://www.google.com[/image][link]https://www.google.com[/link][strong]This is strong[/strong][italic]This is italic[/italic][code]This is code[/code][video]https://www.google.com[/video][iframe]https://www.google.com[/iframe][caption][image]https://google.com[/image]HI[/caption]";

    const result = serializeRichText(text);

    const expected = `<h1>This is a title</h1><h2>This is a subtitle</h2><p>This is a text</p><p>This is a text with a hyperlink <a href="https://google.com">https://google.com</a></p><img src="https://www.google.com" /><a href="https://www.google.com">https://www.google.com</a><strong>This is strong</strong><i>This is italic</i><code>This is code</code><video controls preload="auto"><source src="https://www.google.com">Your browser does not support the video tag.</video><iframe src="https://www.google.com"></iframe><figure><img src="https://google.com" /><figcaption>HI</figcaption></figure>`;

    expect(result).toBe(expected);
  });
});
