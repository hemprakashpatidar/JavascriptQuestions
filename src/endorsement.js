const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];

console.log(aggregate(endorsements, "user", "skill"));

function aggregate(obj, on, who) {
  const userObj = obj.reduce((acc, curr) => {
    if (acc[curr[on]]) {
      acc[curr[on]] = [...acc[curr[on]], curr[who]];
    } else {
      acc[curr[on]] = [curr[who]];
    }
    return acc;
  }, {});

  console.log(userObj);

  const response = []
  Object.keys(userObj).forEach(key=>{
    response.push({[on]: key, [who]: userObj[key]})
  })

  return response
}


Object.keys(obj)

[
  {
    user: "Bill",
    skill: ["css", "javascript"],
  },
  {
    user: "Chad",
    skill: ["javascript"],
  },
  {
    user: "Sue",
    skill: ["css", "javascript", "html"],
  },
];
