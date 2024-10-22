const fs = require("fs").promises;
//read the content from file and convert to jsonobject
const testno = 3;
async function readFile() {
  try {
    const data = await fs.readFile(`sample_input-${testno}.txt`, "utf8");
    let M;
    const prices = [];
    data.split(/\r?\n/).forEach((line, i) => {
      const lineArray = line.split(":");
      if (i == 0) {
        M = parseInt(lineArray[1]);
      } else {
        prices.push({
          goodies: lineArray[0],
          price: lineArray[1],
        });
      }
    });
    minPriceDifference(prices, M);
  } catch (err) {
    console.error(err);
  }
}

readFile();

function minPriceDifference(prices, M) {
  // Sort the prices in ascending order
  prices.sort((a, b) => a.price - b.price);

  // Initialize the minimum difference to a large value
  let minDiff = Infinity;
  let subsettArray = [];
  // Iterate over the possible subsets of size M

  for (let i = 0; i <= prices.length - M; i++) {
    // Calculate the difference between the highest and lowest price in the current subset
    let diff = prices[i + M - 1].price - prices[i].price;

    // Update the minimum difference if a smaller one is found
    if (diff < minDiff) {
      minDiff = diff;
      subsettArray = prices.slice(i, i + M);
    }
  }
  //   console.log(subsettArray);
  writeOutputToFile(minDiff, subsettArray);
  return minDiff;
}

async function writeOutputToFile(min, subsettArray) {
  try {
    let content = `The goodies selected for distribution are:\n`;
    subsettArray.forEach((g) => {
      content = `${content}${g.goodies}: ${g.price} \n`;
    });
    content =
      content +
      `And the difference between the chosen goodie with highest price and the lowest price is:${min}`;
    await fs.writeFile(`sample_output-${testno}.txt`, content);
  } catch (err) {
    console.log(err);
  }
}
