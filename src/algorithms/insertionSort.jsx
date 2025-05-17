export const insertionSort = async (delay, cancelCheck) => {
  function MakeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const arr = document.querySelectorAll(".bar");

  for (let i = 1; i < arr.length; i++) {
    if (cancelCheck()) return resetBarsToBlack(arr);

    let keyHeight = arr[i].style.height;
    let j = i - 1;

    arr[i].style.background = "blue";
    await MakeDelay(delay);
    if (cancelCheck()) return resetBarsToBlack(arr);

    while (j >= 0 && parseInt(arr[j].style.height) > parseInt(keyHeight)) {
      if (cancelCheck()) return resetBarsToBlack(arr);

      arr[j].style.background = "yellow";
      arr[j + 1].style.height = arr[j].style.height;
      await MakeDelay(delay);
      if (cancelCheck()) return resetBarsToBlack(arr);

      arr[j].style.background = "black";
      j--;
    }

    arr[j + 1].style.height = keyHeight;

    for (let k = 0; k <= i; k++) {
      arr[k].style.background = "green";
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (cancelCheck()) return resetBarsToBlack(arr);

    await MakeDelay(delay);
    arr[i].style.background = "red";
  }
};

function resetBarsToBlack(bars) {
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.background = "black";
  }
}
