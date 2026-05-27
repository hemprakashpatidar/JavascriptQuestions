function getElementsByStyle(root, styleProp, value) {
  // This will select all children at nested level also.
  const elements = [root, ...root.querySelectorAll("*")];
  const result = [];

  elements.forEach((el) => {
    const computedStyles = window.getComputedStyle(el);
    if (computedStyles[styleProp] === value) {
      result.push(el);
    }
  });

  return result;
}

console.log(
  getElementsByStyle(document.getElementById("root"), "paddingTop", "10px")
);
