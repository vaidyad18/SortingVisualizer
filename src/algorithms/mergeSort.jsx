export const mergeSort = async (delay) => {
    function MakeDelay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    const bars = document.querySelectorAll(".bar");
  
    const merge = async (arr, l, m, r) => {
      const left = [], right = [];
      for (let i = l; i <= m; i++) {
        left.push(parseInt(arr[i].style.height));
        arr[i].style.background = "blue";
      }
      for (let i = m + 1; i <= r; i++) {
        right.push(parseInt(arr[i].style.height));
        arr[i].style.background = "yellow";
      }
  
      await MakeDelay(delay);
  
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
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
  
      while (i < left.length) {
        arr[k].style.height = `${left[i]}px`;
        arr[k].style.background = "green";
        i++;
        k++;
        await MakeDelay(delay);
      }
  
      while (j < right.length) {
        arr[k].style.height = `${right[j]}px`;
        arr[k].style.background = "green";
        j++;
        k++;
        await MakeDelay(delay);
      }
    };
  
    const mergeSortRecursive = async (arr, l, r) => {
      if (l >= r) return;
  
      const m = l + Math.floor((r - l) / 2);
      await mergeSortRecursive(arr, l, m);
      await mergeSortRecursive(arr, m + 1, r);
      await merge(arr, l, m, r);
    };
  
    await mergeSortRecursive(bars, 0, bars.length - 1);
  
    for (let i = 0; i < bars.length; i++) {
      await MakeDelay(delay);
      bars[i].style.background = "red";
    }
  };
  