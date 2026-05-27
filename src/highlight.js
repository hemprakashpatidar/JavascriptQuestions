//https://alpha.learnersbucket.com/course-item?item-id=67f642d3c6afaa5eca7aeae7
function highlight(str, keywords) {
  // unique set of keywords
  const uniqueKeywords = new Set(keywords);

  // split the str into words
  let words = str.split(" ");

  const result = words.map((word) => {
    let output = "";

    if (uniqueKeywords.has(word)) {
      output = output + `<strong>${word}</strong>`;
    } else {
      for (let i = 0; i < word.length; i++) {
        const prefix = word.slice(0, i + 1);
        const suffix = word.slice(i + 1);

        if (uniqueKeywords.has(prefix) && uniqueKeywords.has(suffix)) {
          output = `<strong>${prefix}${suffix}</strong>`;
          break;
        } else if (uniqueKeywords.has(prefix) && !uniqueKeywords.has(suffix)) {
          output = `<strong>${prefix}</strong>${suffix}`;
        } else if (!uniqueKeywords.has(prefix) && uniqueKeywords.has(suffix)) {
          output = `${prefix}<strong>${suffix}</strong>`;
        }
      }
    }
    return output !== "" ? output : word;
  });

  return result.join(" ");
}

const str = "Ultimate JavaScript / FrontEnd Guide";
const words = ["Front", "End", "JavaScript"];

console.log(highlight(str, words));
