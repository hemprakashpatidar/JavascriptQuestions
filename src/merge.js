let merge = (...arguments) => {
  // Variables
  let target = {};
  let deep = false;
  let i = 0;

  // Check if a deep merge
  if (typeof arguments[0] === "boolean") {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the target object
  let merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[prop]) === "[object Object]"
        ) {
          // If we're doing a deep merge and the property is an object
          target[prop] = merge(target[prop], obj[prop]);
        } else {
          // Otherwise, do a regular merge
          target[prop] = obj[prop];
        }
      }
    }
  };

  //Loop through each object and conduct a merge
  for (; i < arguments.length; i++) {
    merger(arguments[i]);
  }

  return target;
};

let obj1 = {
  name: "prashant",
  age: 23,
  nature: {
    helping: true,
    shy: false,
  },
};

let obj2 = {
  qualification: "BSC CS",
  loves: "Javascript",
  nature: {
    angry: false,
    shy: true,
  },
};

//Shallow merge
console.log(merge(obj1, obj2));
