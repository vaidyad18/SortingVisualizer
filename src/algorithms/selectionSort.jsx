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

  for (let i = 0; i < arr.length - 1; i++) {
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    let minIdx = i;
    
    arr[i].style.background = "blue";
    await MakeDelay(delay);
    if (cancelCheck()) {
      resetBarsToBlack();
      return;
    }

    for (let j = i + 1; j < arr.length; j++) {
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      arr[j].style.background = "yellow";
      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      
      const minHeight = parseInt(arr[minIdx].style.height);
      const compareHeight = parseInt(arr[j].style.height);
      
      if (compareHeight < minHeight) {
        if (minIdx !== i) {
          arr[minIdx].style.background = "black";
        }
        minIdx = j;
        arr[minIdx].style.background = "purple";
      } else {
        arr[j].style.background = "black";
      }
    }

    if (minIdx !== i) {
      arr[i].style.background = "purple";
      await MakeDelay(delay);
      
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }

      const currentHeight = parseInt(arr[i].style.height);
      const minHeight = parseInt(arr[minIdx].style.height);
      
      arr[i].style.height = `${minHeight}px`;
      arr[minIdx].style.height = `${currentHeight}px`;

      await MakeDelay(delay);
      if (cancelCheck()) {
        resetBarsToBlack();
        return;
      }
      
      arr[minIdx].style.background = "black";
    }

    arr[i].style.background = "green";
    await MakeDelay(delay/2);
  }

  arr[arr.length - 1].style.background = "green";

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
