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

  const swap = (i, j) => {
    if (i === j) return; 
    
    const heightI = parseInt(bars[i].style.height);
    const heightJ = parseInt(bars[j].style.height);
    
    bars[i].style.height = `${heightJ}px`;
    bars[j].style.height = `${heightI}px`;
  };

  const partition = async (low, high) => {
    if (cancelCheck()) {
      resetBarsToBlack();
      return -1;
    }

    const pivotIndex = high;
    const pivot = parseInt(bars[pivotIndex].style.height);
    
    bars[high].style.background = "blue";
    await MakeDelay(delay);
    
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return -1;
      }

      bars[j].style.background = "yellow";
      await MakeDelay(delay);
      
      const currentHeight = parseInt(bars[j].style.height);
      
      if (currentHeight <= pivot) {
        i++;
        
        bars[i].style.background = "orange";
        bars[j].style.background = "orange";
        await MakeDelay(delay);
        
        swap(i, j);
        await MakeDelay(delay);
      }
      
      if (bars[j].style.background !== "orange") {
        bars[j].style.background = "pink";
      }
    }

    const pivotFinalPos = i + 1;
    
    bars[pivotFinalPos].style.background = "purple";
    bars[high].style.background = "purple";
    await MakeDelay(delay);
    
    swap(pivotFinalPos, high);
    await MakeDelay(delay);
    
    bars[pivotFinalPos].style.background = "green";
    
    for (let k = low; k <= high; k++) {
      if (k !== pivotFinalPos && bars[k].style.background !== "green") {
        bars[k].style.background = "black";
      }
    }
    
    return pivotFinalPos;
  };

  const quickSortRecursive = async (low, high) => {
    if (low >= high || cancelCheck()) return;

    const pivotIndex = await partition(low, high);
    if (pivotIndex === -1 || cancelCheck()) return;
    
    await quickSortRecursive(low, pivotIndex - 1);
    if (cancelCheck()) return;
    
    await quickSortRecursive(pivotIndex + 1, high);
  };

  await quickSortRecursive(0, bars.length - 1);

  let allSorted = true;
  for (let i = 0; i < bars.length; i++) {
    if (bars[i].style.background !== "green") {
      allSorted = false;
      break;
    }
  }
  
  if (!allSorted) {
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].style.background !== "green") {
        bars[i].style.background = "green";
        await MakeDelay(delay/2);
      }
    }
  }

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
