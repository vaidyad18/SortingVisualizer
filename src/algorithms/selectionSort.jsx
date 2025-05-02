export const selectionSort = async (delay) => {
    function MakeDelay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    const arr = document.querySelectorAll(".bar");
  
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      arr[i].style.background = "blue";
  
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].style.background = "blue";
        await MakeDelay(delay);
  
        if (parseInt(arr[j].style.height) < parseInt(arr[minIdx].style.height)) {
          if (minIdx !== i) arr[minIdx].style.background = "black";
          minIdx = j;
        } else {
          arr[j].style.background = "black";
        }
      }
  
      if (minIdx !== i) {
        arr[minIdx].style.background = "yellow";
        arr[i].style.background = "yellow";
        await MakeDelay(delay);
  
        let temp = arr[i].style.height;
        arr[i].style.height = arr[minIdx].style.height;
        arr[minIdx].style.height = temp;
  
        await MakeDelay(delay);
        arr[minIdx].style.background = "black";
      }
  
      arr[i].style.background = "green";
    }
  
    for (let i = 0; i < arr.length; i++) {
      await MakeDelay(delay);
      arr[i].style.background = "red";
    }
  };
  