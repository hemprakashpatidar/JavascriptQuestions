/**
 * mapLimit: executes async callback with limited parallelism
 * @param {Array} arr
 * @param {number} limit
 * @param {Function} callback
 */

/*** Cleaner & more readable code */

// PATTERN 1

async function mapLimit(arr, limit, callback) {
  const results = [];

  for (let i = 0; i < arr.length; i += limit) {
    const batch = arr.slice(i, i + limit);

    const batchResults = await Promise.all(batch.map(callback));

    results.push(...batchResults);

    console.log(`/// batch ${i / limit + 1}`);
    batchResults.forEach(console.log);
  }

  return results;
}

// PATTERN 2
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function mapLimit2(arr, limit, callback) {
  const results = [];
  let batchNumber = 1;

  for (let i = 0; i < arr.length; i += limit) {
    const delay = batchNumber * 1000;

    console.log(`\nWaiting ${delay}ms before batch ${batchNumber}`);
    await sleep(delay);

    const batch = arr.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map(callback));

    console.log(`/// batch ${batchNumber} completed`);
    results.push(...batchResults);

    batchNumber++;
  }

  return results;
}

const sleep2 = (ms) =>
  new Promise((resolve, rej) =>
    setTimeout(() => {
      resolve("delayed");
    }, ms)
  );

async function mapLimit3(arr, limit, callback) {
  for (let item = 0; item < arr.length; item++) {
    await sleep(1000);
    const batch = arr.slice(item, item + limit);
    const batchResults = await Promise.all(batch.map(callback));

    results.push(...batchResults);
  }
}

const task = async (value) => {
  console.log(`Start task ${value} at ${new Date().toLocaleTimeString()}`);
  await new Promise((r) => setTimeout(r, 500));
  console.log(`End task ${value} at ${new Date().toLocaleTimeString()}`);
  return value * 2;
};

//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
// Helper to chop array into chunks of size limit
function chopArray(arr, limit) {
  const temp = [];
  let i = 0;
  while (i < arr.length) {
    temp.push(arr.slice(i, i + limit));
    i += limit;
  }
  return temp;
}

/**
 * mapLimit: sequentially executes async callback on chunks of the array
 * @param {Array} arr - input array
 * @param {number} limit - chunk size
 * @param {Function} callback - async function for each chunk
 */
async function mapLimit(arr, limit, callback) {
  const chunks = chopArray(arr, limit);
  const finalResult = [];

  for (let i = 0; i < chunks.length; i++) {
    const batch = await Promise.all(
      chunks[i].map(async (item) => {
        return await callback(item);
      })
    );

    batch.forEach((val) => finalResult.push(val));
    console.log(`/// batch ${i + 1}`);
    batch.forEach((val) => console.log(val));
  }

  return finalResult;
}
