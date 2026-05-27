const user = {
  name: "Rowdy Coders",
  address: {
    primary: {
      house: "109",
      street: {
        main: 21,
        cross: ["32", "1"],
      },
    },
  },
};

// {
//     user_name: "Rowdy Coders",
//     user_address_primary_house: "109",
//     user_address_primary_street_main:21,
//     user_address_primary_street_cross: ["32", "1"],
//   }

function flattedNestedObj(obj, parentId = "user", res = {}) {
  for (let formKey in obj) {
    const searchKey = parentId + "_" + formKey;

    if (
      typeof obj[formKey] === "object" &&
      obj[formKey] !== null &&
      !Array.isArray(obj[formKey])
    ) {
      flattedNestedObj(obj[formKey], searchKey, res);
    } else {
      res[searchKey] = obj[formKey];
    }
  }
  return res;
}

console.log(flattedNestedObj(user, "user"));
