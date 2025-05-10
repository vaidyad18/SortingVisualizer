export const selectionSort = async (delay, cancelCheck) => {
  function MakeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const arr = document.querySelectorAll(".bar");

  const resetBarsToBlack = () => {
    for (let bar of arr) {
      bar.style.background = "black";
    }
  };

  // Selection sort - find minimum in unsorted array and place at beginning
  for (let i = 0; i < arr.length - 1; i++) {
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    // Assume current index has minimum value
    let minIdx = i;
    
    // Highlight current position
    arr[i].style.background = "blue";
    await MakeDelay(delay);
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    // Find minimum element in remaining unsorted array
    for (let j = i + 1; j < arr.length; j++) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      // Highlight element being compared
      arr[j].style.background = "yellow";
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      
      const minHeight = parseInt(arr[minIdx].style.height);
      const compareHeight = parseInt(arr[j].style.height);
      
      if (compareHeight < minHeight) {
        // Reset previous minimum if not the initial position
        if (minIdx !== i) {
          arr[minIdx].style.background = "black";
        }
        // Update minimum index
        minIdx = j;
        // Keep minimum highlighted
        arr[minIdx].style.background = "purple";
      } else {
        // Reset non-minimum element
        arr[j].style.background = "black";
      }
    }

    // Swap if minimum element is not at current position
    if (minIdx !== i) {
      // Highlight the swap
      arr[i].style.background = "purple";
      await MakeDelay(delay);
      
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      // Perform the swap with proper height extraction
      const currentHeight = parseInt(arr[i].style.height);
      const minHeight = parseInt(arr[minIdx].style.height);
      
      // Explicit pixel conversion for heights
      arr[i].style.height = `${minHeight}px`;
      arr[minIdx].style.height = `${currentHeight}px`;

      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      
      // Clear the highlight on the old minimum
      arr[minIdx].style.background = "black";
    }

    // Mark current position as sorted
    arr[i].style.background = "green";
    await MakeDelay(delay/2);
  }

  // Mark last element as sorted
  arr[arr.length - 1].style.background = "green";

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
