const obj1 = {
  a: {
    b: 2,
    c: 4,
  },
};

const obj2 = {
  a: {
    b: 2,
    q: [0, 3, 4],
  },
  x: true,
  d: { f: null },
};

//   will return ["a.b", "a.c"]
//   will return ["a.b", "a.q.0", "a.q.1", "a.q.2", "x", "d.f"]
let result = [];

function getKeysArray(obj) {
  for (let key in obj) {
    let value = obj[key];
    if (typeof value !== 'object') {
      console.log(key);
    } else {
      console.log(key);
      getKeysArray(value);
    }
  }
}

getKeysArray(obj1);
// getKeysArray(obj2);

// console.log(obj1.a);
