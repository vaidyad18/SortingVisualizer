export const quickSort = async (delay) => {
    function MakeDelay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    const bars = document.querySelectorAll(".bar");
  
    const swap = (i, j) => {
      let temp = bars[i].style.height;
      bars[i].style.height = bars[j].style.height;
      bars[j].style.height = temp;
    };
  
    const partition = async (low, high) => {
      let pivot = parseInt(bars[high].style.height);
      bars[high].style.background = "blue";
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        bars[j].style.background = "yellow";
        await MakeDelay(delay);
  
        if (parseInt(bars[j].style.height) < pivot) {
          i++;
          swap(i, j);
          bars[i].style.background = "orange";
          if (i !== j) bars[j].style.background = "orange";
          await MakeDelay(delay);
        } else {
          bars[j].style.background = "pink";
        }
      }
  
      swap(i + 1, high);
      bars[high].style.background = "pink";
      bars[i + 1].style.background = "green";
      await MakeDelay(delay);
  
      for (let k = low; k <= high; k++) {
        if (bars[k].style.background !== "green") {
          bars[k].style.background = "black";
        }
      }
  
      return i + 1;
    };
  
    const quickSortRecursive = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await quickSortRecursive(low, pi - 1);
        await quickSortRecursive(pi + 1, high);
      } else if (low === high) {
        bars[low].style.background = "green";
      }
    };
  
    await quickSortRecursive(0, bars.length - 1);
  
    for (let i = 0; i < bars.length; i++) {
      await MakeDelay(delay);
      bars[i].style.background = "red";
    }
  };
  