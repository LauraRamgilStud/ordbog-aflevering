"use-strict";
let globalArrayOfWords = [];

window.addEventListener("load", initialize);

document.getElementById("search-btn").addEventListener("click", search);

function search() {
  const searchWord = document.getElementById("search-word").value;
  const obj = binarySearch(globalArrayOfWords, searchWord, compare);

  if (obj !== -1) {
    const string = `<p>Variant: ${obj.variant}, Headword: ${obj.headword}, Homograph: ${obj.homograph}, Partospeech: ${obj.partofspeech}, id: ${obj.id}</p>`;
    document
      .getElementById("searchResult")
      .insertAdjacentHTML("beforeend", string);
  } else {
    const string = `<p>No result found for ${searchWord}</p>`;
    document
      .getElementById("searchResult")
      .insertAdjacentHTML("beforeend", string);
  }
}

function compare(word, look) {
  const wordVariant = word;
  const lookVariant = look.variant;
  if (wordVariant < lookVariant) {
    return -1;
  } else if (wordVariant > lookVariant) {
    return 1;
  } else {
    return 0;
  }
}

function binarySearch(book, word, compareFunc) {
  let start = 0;
  let end = book.length - 1;
  let iterations = 0;

  while (start <= end) {
    iterations++;
    const middle = Math.floor((start + end) / 2);
    const compare = compareFunc(word, book[middle]);
    if (compare === 0) {
      console.log("Found: ", book[middle]);
      console.log("Iterations: ", iterations);
      return book[middle];
    } else if (compare < 0) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  console.log("Not found");
  console.log("Iterations: ", iterations);
  return -1;
}

async function loadData() {
  const response = await fetch("data/ddo_fullforms_2023-10-11.csv");
  const rawText = await response.text();
  globalArrayOfWords = rawText.split("\n").map((line) => {
    const parts = line.split("\t");
    return {
      variant: parts[0],
      headword: parts[1],
      homograph: parts[2],
      partofspeech: parts[3],
      id: parts[4],
    };
  });

  return globalArrayOfWords;
}

async function initialize() {
  await loadData();
  const searchWord = "hestevogn";
  binarySearch(globalArrayOfWords, searchWord, compare);
}

function findFunction() {
  return globalArrayOfWords.findIndex(
    (wordObject) => wordObject.variant === "hestevogn"
  );
}
