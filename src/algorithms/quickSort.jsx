export const quickSort = async (delay, cancelCheck) => {
  function MakeDelay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const bars = document.querySelectorAll(".bar");

  const resetBarsToBlack = () => {
    for (let bar of bars) {
      bar.style.background = "black";
    }
  };

  // Simplified and reliable swap function
  const swap = (i, j) => {
    if (i === j) return; // No need to swap same element
    
    // Get integer heights
    const heightI = parseInt(bars[i].style.height);
    const heightJ = parseInt(bars[j].style.height);
    
    // Swap with explicit pixel values
    bars[i].style.height = `${heightJ}px`;
    bars[j].style.height = `${heightI}px`;
  };

  const partition = async (low, high) => {
    if (cancelCheck()) {
      resetBarsToBlack();
      return -1;
    }

    // Always use rightmost element as pivot for simplicity and reliability
    const pivotIndex = high;
    const pivot = parseInt(bars[pivotIndex].style.height);
    
    // Highlight pivot
    bars[high].style.background = "blue";
    await MakeDelay(delay);
    
    // Initialize partition index
    let i = low - 1;

    // Process all elements except pivot
    for (let j = low; j < high; j++) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return -1;
      }

      // Highlight current element
      bars[j].style.background = "yellow";
      await MakeDelay(delay);
      
      const currentHeight = parseInt(bars[j].style.height);
      
      // If current element is smaller than pivot
      if (currentHeight <= pivot) {
        // Move smaller element to left side
        i++;
        
        // Highlight elements being swapped
        bars[i].style.background = "orange";
        bars[j].style.background = "orange";
        await MakeDelay(delay);
        
        // Perform swap
        swap(i, j);
        await MakeDelay(delay);
      }
      
      // Reset color of compared element
      if (bars[j].style.background !== "orange") {
        bars[j].style.background = "pink";
      }
    }

    // Final position for pivot
    const pivotFinalPos = i + 1;
    
    // Highlight pivot swap
    bars[pivotFinalPos].style.background = "purple";
    bars[high].style.background = "purple";
    await MakeDelay(delay);
    
    // Place pivot in its correct position
    swap(pivotFinalPos, high);
    await MakeDelay(delay);
    
    // Mark pivot as sorted
    bars[pivotFinalPos].style.background = "green";
    
    // Reset colors of other elements
    for (let k = low; k <= high; k++) {
      if (k !== pivotFinalPos && bars[k].style.background !== "green") {
        bars[k].style.background = "black";
      }
    }
    
    return pivotFinalPos;
  };

  const quickSortRecursive = async (low, high) => {
    // Base case
    if (low >= high || cancelCheck()) return;

    // Get partition index
    const pivotIndex = await partition(low, high);
    if (pivotIndex === -1 || cancelCheck()) return;
    
    // Sort elements before partition
    await quickSortRecursive(low, pivotIndex - 1);
    if (cancelCheck()) return;
    
    // Sort elements after partition
    await quickSortRecursive(pivotIndex + 1, high);
  };

  // Start quick sort on entire array
  await quickSortRecursive(0, bars.length - 1);

  // Check if all elements are sorted
  let allSorted = true;
  for (let i = 0; i < bars.length; i++) {
    if (bars[i].style.background !== "green") {
      allSorted = false;
      break;
    }
  }
  
  // If not all sorted, mark remaining elements
  if (!allSorted) {
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].style.background !== "green") {
        bars[i].style.background = "green";
        await MakeDelay(delay/2);
      }
    }
  }

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
