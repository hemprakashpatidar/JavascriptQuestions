// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

class SingeltonClass {
  constructor() {
    if (SingeltonClass.instance) {
      return SingeltonClass.instance;
    }
    SingeltonClass.instance = this;
    this.data = {};
    return this;
  }

  setData(key, value) {
    this.data[key] = value;
  }

  getData(key) {
    return this.data[key];
  }
}

const obj1 = new SingeltonClass();
const obj2 = new SingeltonClass();

obj1.setData("name", "ps");
obj2.setData("age", "28");

console.log("test");
console.log(
  "My name is",
  obj2.getData("name"),
  "and age is",
  obj2.getData("age")
);
