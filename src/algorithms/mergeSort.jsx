export const mergeSort = async (delay, cancelCheck) => {
  function MakeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const bars = document.querySelectorAll(".bar");

  const resetBarsToBlack = () => {
    for (let bar of bars) {
      bar.style.background = "black";
    }
  };

  const merge = async (arr, l, m, r) => {
    if (cancelCheck()) return resetBarsToBlack();

    const left = [], right = [];
    const n1 = m - l + 1;
    const n2 = r - m;

    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
      left.push(parseInt(arr[l + i].style.height));
      arr[l + i].style.background = "blue";
    }

    for (let i = 0; i < n2; i++) {
      right.push(parseInt(arr[m + 1 + i].style.height));
      arr[m + 1 + i].style.background = "yellow";
    }

    await MakeDelay(delay);
    if (cancelCheck()) return resetBarsToBlack();

    // Merge the temporary arrays back
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (cancelCheck()) return resetBarsToBlack();

      if (left[i] <= right[j]) {
        arr[k].style.height = `${left[i]}px`;
        i++;
      } else {
        arr[k].style.height = `${right[j]}px`;
        j++;
      }
      arr[k].style.background = "green";
      await MakeDelay(delay);
      k++;
    }

    // Copy remaining elements of left array
    while (i < n1) {
      if (cancelCheck()) return resetBarsToBlack();

      arr[k].style.height = `${left[i]}px`;
      arr[k].style.background = "green";
      i++;
      k++;
      await MakeDelay(delay);
    }

    // Copy remaining elements of right array
    while (j < n2) {
      if (cancelCheck()) return resetBarsToBlack();

      arr[k].style.height = `${right[j]}px`;
      arr[k].style.background = "green";
      j++;
      k++;
      await MakeDelay(delay);
    }
  };

  const mergeSortRecursive = async (arr, l, r) => {
    if (l >= r || cancelCheck()) return;

    const m = l + Math.floor((r - l) / 2);
    
    // Sort first and second halves
    await mergeSortRecursive(arr, l, m);
    if (cancelCheck()) return;

    await mergeSortRecursive(arr, m + 1, r);
    if (cancelCheck()) return;

    // Merge the sorted halves
    await merge(arr, l, m, r);
  };

  await mergeSortRecursive(bars, 0, bars.length - 1);

  // Final coloring
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
