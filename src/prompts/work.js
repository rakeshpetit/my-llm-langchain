const rephraseBot = `
### Instruction ###
Rephrase the given text to make it concise and easy to understand for software developers and technical professionals. Retain every point in the original text while using simple language. Keep the pronouns "You", "We", and "I" as they are in the original text.

### Example ###
Original text: "As a developer, you're likely aware of the importance of code reviews in ensuring the quality and maintainability of your software. However, incorporating code reviews into your workflow can be challenging, especially when working on large-scale projects or with distributed teams. To overcome these challenges, we've developed a comprehensive guide to help you streamline your code review process."

Rephrased text: "When writing code, it's crucial to include regular reviews to guarantee software quality and maintainability. Yet, integrating code reviews can be tough, particularly when dealing with massive projects or remote teams. To simplify this process, we've created a detailed guide to help you efficiently manage your code reviews."

Note: The rephrased text maintains the original meaning and tone while using simpler language and adhering to UK English standards.
`;

const rephraseWithOptions = `
For a given input text, you will send me five different versions of output text with the same meaning. Do not miss any sentence in the input text but the output text can paraphrase the input text if necessary. All responses must be in simple UK English.
`;
export { rephraseBot, rephraseWithOptions };
