const json = {
  type: "div",
  props: { id: "hello", class: "foo" },
  children: [
    { type: "h1", children: "HELLO" },
    {
      type: "p",
      children: [{ type: "span", props: { class: "bar" }, children: "World" }],
    },
  ],
};

function JSONtoHTML(json) {
  const fragment = document.createDocumentFragment();

  // ensure json is array
  const arr = Array.isArray(json) ? json : [json];

  for (let entry of arr) {
    const element = document.createElement(entry.type);

    // set props
    if (entry.props) {
      for (let key in entry.props) {
        element.setAttribute(key, entry.props[key]);
      }
    }

    // handle children
    if (Array.isArray(entry.children)) {
      for (let child of entry.children) {
        element.appendChild(JSONtoHTML(child));
      }
    } else if (
      typeof entry.children === "string" ||
      typeof entry.children === "number"
    ) {
      element.innerText = entry.children;
    }

    fragment.appendChild(element);
  }

  return fragment;
}

const html = JSONtoHTML(json);
document.body.appendChild(html);

{
  /* <div id="hello" class="foo">
  <h1>HELLO</h1>
  <p>
    <span class="bar">World</span>
  </p>
</div>; */
}
