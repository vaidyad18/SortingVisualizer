export const bubbleSort = async (delay, cancelCheck) => {
  function MakeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const arr = document.querySelectorAll(".bar");
  const resetBarsToBlack = () => {
    for (let bar of arr) {
      bar.style.background = "black";
    }
  };

  // Careful boundary handling
  for (let i = 0; i < arr.length - 1; i++) {
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      // Highlight current pair being compared
      arr[j].style.background = "blue";
      arr[j + 1].style.background = "blue";
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      // Extract heights and properly compare as integers
      const height1 = parseInt(arr[j].style.height);
      const height2 = parseInt(arr[j + 1].style.height);
      
      if (height1 > height2) {
        // Highlight elements being swapped
        arr[j].style.background = "yellow";
        arr[j + 1].style.background = "yellow";
        await MakeDelay(delay);
        if (cancelCheck()) {
          resetBarsToBlack();
          return;
        }

        // Perform the swap
        arr[j].style.height = `${height2}px`;
        arr[j + 1].style.height = `${height1}px`;
        swapped = true;
      }

      // Reset colors for elements just compared
      arr[j].style.background = "black";
      arr[j + 1].style.background = "black";
      await MakeDelay(delay/2);
    }

    // Mark the last element as sorted
    arr[arr.length - i - 1].style.background = "green";

    // If no swapping occurred, array is sorted
    if (!swapped) {
      // Mark remaining elements as sorted
      for (let k = 0; k <= arr.length - i - 2; k++) {
        arr[k].style.background = "green";
      }
      break;
    }
  }

  // Final coloring
  if (!cancelCheck()) {
    for (let i = 0; i < arr.length; i++) {
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      arr[i].style.background = "red";
    }
  }
};
