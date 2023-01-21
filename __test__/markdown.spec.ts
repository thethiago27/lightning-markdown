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
    expect(result).toBe("<italic>This is italic</italic>");
  });

  it("Should render markdown with video tag", () => {
    const text = "[video]https://www.google.com[/video]";
    const result = serializeRichText(text);
    expect(result).toBe(
      '<video controls preload="auto"><source src="https://www.google.com">Your browser does not support the video tag.</video>'
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
      "[title]This is a title[/title][subtitle]This is a subtitle[/subtitle][text]This is a text[/text][text]This is a text with a hyperlink [link]https://google.com[/link][/text][image]https://www.google.com[/image][link]https://www.google.com[/link][strong]This is strong[/strong][italic]This is italic[/italic]";

    const result = serializeRichText(text);

    expect(result).toBe(
      '<h1>This is a title</h1><h2>This is a subtitle</h2><p>This is a text</p><p>This is a text with a hyperlink <a href="https://google.com">https://google.com</a></p><img src="https://www.google.com" /><a href="https://www.google.com">https://www.google.com</a><strong>This is strong</strong><italic>This is italic</italic>'
    );
  });
});
