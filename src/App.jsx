import { useState, useEffect } from "react";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import { Switch } from "@/components/ui/switch"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function App() {
  const [arr, setArr] = useState([]);
  const [arrSize, setArrSize] = useState(20);
  const [width, setWidth] = useState(33);
  const [delay, setDelay] = useState(500);
  const [selectedSort, setSelectedSort] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [sortingInProgress, setSortingInProgress] = useState(false);

  const resetArray = () => {
    var arr = [];
    for (let i = 0; i < arrSize; i++) {
      arr.push(Math.floor(Math.random() * 41) + 10);
    }
    setArr(arr);
    var bar = document.querySelectorAll(".bar");
    for (let i = 0; i < bar.length; i++) {
      bar[i].style.background = "black";
    }
  };

  const changeDelay = (val) => {
    setDelay(Number(val));
  };

  useEffect(() => {
    setDelay(delay);
  }, [delay]);

  const handleArraySize = (val) => {
    if (val > 90) {
      setWidth(7);
    } else if (val > 80) {
      setWidth(8);
    } else if (val > 70) {
      setWidth(11);
    } else if (val > 60) {
      setWidth(13);
    } else if (val > 50) {
      setWidth(15);
    } else if (val > 40) {
      setWidth(19);
    } else if (val > 30) {
      setWidth(25);
    } else if (val > 20) {
      setWidth(33);
    } else if (val > 10) {
      setWidth(40);
    } else {
      setWidth(60);
    }
    setArrSize(val);
    resetArray();
  };

  useEffect(() => {
    resetArray();
  }, []);

  const runSort = async () => {
    setSortingInProgress(true);
    switch (selectedSort) {
      case "bubble":
        await bubbleSort(delay);
        break;
      case "insertion":
        await insertionSort(delay);
        break;
      case "selection":
        await selectionSort(delay);
        break;
      case "merge":
        await mergeSort(delay);
        break;
      case "quick":
        await quickSort(delay);
        break;
      case "heap":
        await heapSort(delay);
        break;
      default:
        setShowAlert(true);
        break;
    }
    setSortingInProgress(false);
  };

  const showCar = () => {
    setShowCarousel((prev) => !prev);
  };

  return (
    <div className="">
      <div className="bg-black flex py-6 justify-around items-center text-white">
        <div className="text-3xl font-bold">Sortify</div>
        <div className="flex justify-center items-center gap-10">
          <div className="">
            <p className="text-center font-semibold text-md">Array Size</p>
            <div className="flex justify-center items-center gap-3">
              <input
                type="range"
                value={arrSize}
                onChange={(e) => handleArraySize(e.target.value)}
                min="8"
                max="100"
                className="cursor-pointer"
                disabled={sortingInProgress}
              />
              <p className="bg-white w-[2.5rem] text-center text-black font-semibold px-2 rounded-full">
                {arrSize}
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-center font-semibold text-md">Speed</p>
            <div className="flex justify-center items-center gap-3">
              <input
                type="range"
                min="100"
                max="2000"
                value={delay}
                className="cursor-pointer"
                onChange={(e) => changeDelay(e.target.value)}
                disabled={sortingInProgress}
              />
              <p className="bg-white w-[3.3rem] text-center text-black font-semibold px-2 rounded-full">
                {(delay / 1000).toFixed(1)} s
              </p>
            </div>
          </div>
        </div>
        <button
          className={`bg-blue-600 px-4 py-2 rounded-md font-semibold ${sortingInProgress ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={resetArray}
          disabled={sortingInProgress}
        >
          Generate Array
        </button>
        <AlertDialog open={showAlert}>
          <AlertDialogContent className="">
            <AlertDialogHeader className="-mt-2">
              <AlertDialogTitle className="text-center">
                No sorting algorithm selected
              </AlertDialogTitle>
              <AlertDialogDescription className="-mt-2 text-center">
                Please choose a sorting method to begin visualization.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                className="cursor-pointer text-center -mb-2 p-4 mx-auto"
                onClick={() => setShowAlert(false)}
              >
                Got It
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex items-center justify-center gap-5">
          <Select onValueChange={(value) => setSelectedSort(value)} disabled={sortingInProgress}>
            <SelectTrigger className={`w-52 font-semibold ${sortingInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <SelectValue placeholder="Choose Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="font-semibold" value="bubble">
                Bubble Sort
              </SelectItem>
              <SelectItem className="font-semibold" value="insertion">
                Insertion Sort
              </SelectItem>
              <SelectItem className="font-semibold" value="selection">
                Selection Sort
              </SelectItem>
              <SelectItem className="font-semibold" value="merge">
                Merge Sort
              </SelectItem>
              <SelectItem className="font-semibold" value="quick">
                Quick Sort
              </SelectItem>
              <SelectItem className="font-semibold" value="heap">
                Heap Sort
              </SelectItem>
            </SelectContent>
          </Select>
          <button
            onClick={runSort}
            className={`bg-green-700 flex justify-center items-center gap-1 px-3 py-2 font-semibold rounded-md ${sortingInProgress ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            disabled={sortingInProgress}
          >
            Run <Play className="w-4" />
          </button>
        </div>
        <button 
          onClick={showCar}
          disabled={sortingInProgress}
          className={sortingInProgress ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        >
          Cariusel
        </button>
        <Switch className="" disabled={sortingInProgress}/>

      </div>
      {showCarousel && (
        <Carousel className="absolute  text-center ml-72 h-40 ">
          <CarouselContent>
            <CarouselItem className="bg-amber-200">
              Time Complexity
            </CarouselItem>
            <CarouselItem className="bg-amber-500">
              Space Complexity
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
      <div className="array  flex justify-center w-full items-end h-[563px]">
        {arr.map((val, i) => (
          <div
            key={i}
            className="bar bg-black mx-[2px]"
            style={{
              height: `${val * 10}px`,
              width: `${width}px`,
              WebkitTransition: `background-color ${delay}ms linear`,
              msTransition: `background-color ${delay}ms linear`,
              transition: `height ${delay / 2}ms linear, background-color ${
                delay / 5
              }ms linear`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
