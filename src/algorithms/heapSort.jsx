export const heapSort = async (delay, cancelCheck) => {
  function MakeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const bars = document.querySelectorAll(".bar");

  const resetBarsToBlack = () => {
    for (let bar of bars) {
      bar.style.background = "black";
    }
  };

  const swap = (i, j) => {
    let temp = bars[i].style.height;
    bars[i].style.height = bars[j].style.height;
    bars[j].style.height = temp;
  };

  const heapify = async (n, i) => {
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    bars[i].style.background = "yellow";
    if (left < n) bars[left].style.background = "blue";
    if (right < n) bars[right].style.background = "blue";

    await MakeDelay(delay);
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    if (left < n && parseInt(bars[left].style.height) > parseInt(bars[largest].style.height)) {
      largest = left;
    }

    if (right < n && parseInt(bars[right].style.height) > parseInt(bars[largest].style.height)) {
      largest = right;
    }

    if (largest !== i) {
      bars[i].style.background = "purple";
      bars[largest].style.background = "purple";
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      swap(i, largest);
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      await heapify(n, largest);
    }

    bars[i].style.background = "black";
    if (left < n) bars[left].style.background = "black";
    if (right < n) bars[right].style.background = "black";
  };

  const heapSortVisual = async () => {
    let n = bars.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      bars[0].style.background = "purple";
      bars[i].style.background = "purple";
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      swap(0, i);
      bars[i].style.background = "green";

      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      await heapify(i, 0);
    }

    if (!cancelCheck()) {
      bars[0].style.background = "green";
    }
  };

  await heapSortVisual();
 
  if (!cancelCheck()) {
    for (let i = 0; i < bars.length; i++) {
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      bars[i].style.background = "red";
    }
  }
};
