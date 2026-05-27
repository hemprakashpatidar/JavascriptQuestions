const arr = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];

const ancestry = (arr) => {
  // aggregate parent / child relation
  const aggregate = (arr) => {
    // aggregate the values for easier processing
    return arr.reduce((a, b) => {
      const [child, parent] = b;

      // aggregating on child
      a[child] = parent;

      return a;
    }, {});
  };

  /**
   * {lion: "cat", cat: "mammal", dog: "mammal", mammal: "animal", fish: "animal", shark: "fish"}
   *
   *
   */

  // for a relationship from the aggregated value
  const convert = (obj) => {
    return Object.keys(obj).reduce((a, b) => {
      a.push(getKey(obj, b));
      return a;
    }, []);
  };

  // helper function to form the string
  // till the last hierarchy
  const getKey = (obj, key) => {
    // access the
    const val = obj[key];

    // the formation can be reversed by chaning the order of the keys
    // child -> parent | parent -> child
    if (val in obj) {
      return getKey(obj, val) + " -> " + key;
    } else {
      return val + " -> " + key;
    }
  };

  // get the aggregated map
  const aggregatedMap = aggregate(arr);

  // return the ancestory
  return convert(aggregatedMap);
};

const res = [
  "animal -> mammal -> cat -> lion",
  "animal -> mammal -> cat",
  "animal -> mammal -> dog",
  "animal -> mammal",
  "animal -> fish",
  "animal -> fish -> shark",
];

console.log(ancestry(arr));
