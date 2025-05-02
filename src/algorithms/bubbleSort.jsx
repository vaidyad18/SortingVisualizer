export const bubbleSort = async (delay) => {
    function MakeDelay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  
    const arr = document.querySelectorAll(".bar");
  
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].style.background = "blue";
        arr[j + 1].style.background = "blue";
  
        if (
          parseInt(arr[j].style.height) > parseInt(arr[j + 1].style.height)
        ) {
          await MakeDelay(delay);
          arr[j].style.background = "yellow";
          arr[j + 1].style.background = "yellow";
          let temp = arr[j].style.height;
          arr[j].style.height = arr[j + 1].style.height;
          arr[j + 1].style.height = temp;
        }
  
        await MakeDelay(delay);
        arr[j].style.background = "black";
        arr[j + 1].style.background = "black";
      }
      await MakeDelay(delay);
      arr[arr.length - i - 1].style.background = "green";
    }
  
    for (let i = 0; i < arr.length; i++) {
      await MakeDelay(delay);
      arr[i].style.background = "red";
    }
  };
  