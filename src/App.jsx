import { useState, useEffect, useRef } from "react";
import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";
import { heapSort } from "./algorithms/heapSort";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pause, Play, Square, StopCircle, StopCircleIcon } from "lucide-react";
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
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const cancelledRef = useRef(false);

  const [isSorting, setIsSorting] = useState(false);
  const [sortingDone, setSortingDone] = useState(false);

  const [open, setOpen] = useState(false);
  const [spaceDialogOpen, setSpaceDialogOpen] = useState(false);

  const [bestCaseTimeComplexity, setBestCaseTimeComplexity] = useState("");
  const [avgCaseTimeComplexity, setAvgCaseTimeComplexity] = useState("");
  const [worstCaseTimeComplexity, setWorstCaseTimeComplexity] = useState("");
  const [spaceComplexity, setSpaceComplexity] = useState("");
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  const startSorting = async () => {
    setIsSorting(true);
    setSortingDone(false);

    resetBarColors();
    await runSort();

    setIsSorting(false);
    setSortingDone(true);
  };

  const complexityInfo = {
    bubble: {
      title: "Bubble Sort",
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
      chartData: [100, 10000, 10000], 
      spaceData: [1, 1, 1],
    },
    insertion: {
      title: "Insertion Sort",
      time: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
      chartData: [100, 10000, 10000],
      spaceData: [1, 1, 1],
    },
    selection: {
      title: "Selection Sort",
      time: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      space: "O(1)",
      chartData: [10000, 10000, 10000],
      spaceData: [1, 1, 1],
    },
    merge: {
      title: "Merge Sort",
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      space: "O(n)",
      chartData: [1000, 1000, 1000], 
      spaceData: [100, 100, 100],
    },
    quick: {
      title: "Quick Sort",
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      space: "O(log n)",
      chartData: [1000, 1000, 10000],
      spaceData: [10, 10, 100],
    },
    heap: {
      title: "Heap Sort",
      time: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      space: "O(1)",
      chartData: [1000, 1000, 1000],
      spaceData: [1, 1, 1],
    },
  };

  useEffect(() => {
    if (!selectedSort) return;
    const selected = complexityInfo[selectedSort];

    setBestCaseTimeComplexity(selected.time.best);
    setAvgCaseTimeComplexity(selected.time.average);
    setWorstCaseTimeComplexity(selected.time.worst);
    setSpaceComplexity(selected.space);

    setData({
      labels: ["Best Case", "Average Case", "Worst Case"],
      datasets: [
        {
          label: "Time Complexity",
          data: selected.chartData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          yAxisID: "y",
          tension: 0.4,
        },
        {
          label: "Space Complexity",
          data: selected.spaceData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          yAxisID: "y1",
          tension: 0.4,
        },
      ],
    });

    setOptions({
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: {
          display: true,
          text: `${selected.title} Time & Space Complexity`,
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: { display: true, text: "Time Complexity" },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          grid: { drawOnChartArea: false },
          title: { display: true, text: "Space Complexity" },
        },
      },
    });
  }, [selectedSort]);

  const handleArraySize = (val) => {
    const validVal = Math.max(8, Math.min(val, 100));
    setArrSize(validVal);

    let newWidth;
    if (validVal <= 10) newWidth = 60;
    else if (validVal <= 20) newWidth = 40;
    else if (validVal <= 30) newWidth = 33;
    else if (validVal <= 40) newWidth = 25;
    else if (validVal <= 50) newWidth = 19;
    else if (validVal <= 60) newWidth = 15;
    else if (validVal <= 70) newWidth = 13;
    else if (validVal <= 80) newWidth = 11;
    else if (validVal <= 90) newWidth = 8;
    else newWidth = 7;

    setWidth(newWidth);

    resetArray(validVal);
  };

  const resetArray = (size) => {
    var newArr = [];
    const arraySize = size !== undefined ? size : arrSize; 

    newArr.length = 0; 
    for (let i = 0; i < arraySize; i++) {
      newArr.push(Math.floor(Math.random() * 41) + 10);
    }

    if (newArr.length !== arraySize) {
      console.error(
        `Array size mismatch: ${newArr.length} vs expected ${arraySize}`
      );
      while (newArr.length < arraySize) {
        newArr.push(Math.floor(Math.random() * 41) + 10);
      }
      if (newArr.length > arraySize) {
        newArr = newArr.slice(0, arraySize);
      }
    }

    setArr(newArr);

    setTimeout(() => {
      const bars = document.querySelectorAll(".bar");
      bars.forEach((bar) => {
        bar.style.background = "black";
      });
    }, 50);

    setSortingDone(false);
  };

  const changeDelay = (val) => {
    setDelay(Number(val));
  };

  useEffect(() => {
    setDelay(delay);
  }, [delay]);

  useEffect(() => {
    resetArray();
  }, []);

  const runSort = async () => {
    if (!selectedSort) {
      setShowAlert(true);
      return;
    }

    setCancelled(false);
    cancelledRef.current = false;
    setSortingInProgress(true);
    resetBarColors();

    const cancelCheck = () => cancelledRef.current;

    const safeDelay = Math.max(10, Math.min(delay, 2000));

    try {
      switch (selectedSort) {
        case "bubble":
          await bubbleSort(safeDelay, cancelCheck);
          break;
        case "insertion":
          await insertionSort(safeDelay, cancelCheck);
          break;
        case "selection":
          await selectionSort(safeDelay, cancelCheck);
          break;
        case "merge":
          await mergeSort(safeDelay, cancelCheck);
          break;
        case "quick":
          await quickSort(safeDelay, cancelCheck);
          break;
        case "heap":
          await heapSort(safeDelay, cancelCheck);
          break;
      }
    } catch (error) {
      console.error("Error during sorting:", error);
      resetBarColors();
    }

    if (cancelledRef.current) {
      resetBarColors();
    }

    setSortingInProgress(false);
  };

  const resetBarColors = () => {
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.background = "black";
    });
  };

  return (
    <div className="">
      <div className="bg-black sticky top-0 flex py-6 justify-around items-center text-white">
        <div className="text-3xl font-bold">Sortify</div>
        <div className="flex justify-center items-center gap-10">
          <div className="">
            <p className="text-center font-semibold text-md">Array Size</p>
            <div className="flex justify-center items-center gap-3">
              <input
                type="range"
                value={arrSize}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 8 && val <= 100) {
                    handleArraySize(val);
                  }
                }}
                min="8"
                max="100"
                step="1"
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
          className={`bg-blue-600 px-4 py-2 rounded-md font-semibold ${
            sortingInProgress
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={() => resetArray(arrSize)}
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
          <Select
            onValueChange={(value) => setSelectedSort(value)}
            disabled={sortingInProgress}
          >
            <SelectTrigger
              className={`w-52 font-semibold ${
                sortingInProgress ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
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
            onClick={() => {
              if (sortingInProgress) {
                setCancelled(true);
                cancelledRef.current = true;
                resetBarColors();
              } else {
                startSorting();
              }
            }}
            className={`flex justify-center items-center gap-1 px-3 py-2 font-semibold rounded-md ${
              sortingInProgress
                ? "cursor-pointer bg-red-500"
                : "cursor-pointer bg-green-700"
            }`}
          >
            {sortingInProgress ? (
              <div className="flex gap-1">
                Stop <Pause className="w-4" />
              </div>
            ) : (
              <div className="flex gap-1">
                Sort <Play className="w-4" />
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="array flex justify-center w-full items-end h-[553px]">
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
      
      {sortingDone && (
        <div className="flex gap-3 justify-center items-center my-6">
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <button className="bg-black text-white px-4 py-2 rounded-md font-semibold">
                Time Complexity
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {selectedSort && complexityInfo[selectedSort].title} - Time
                  Complexity
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  <strong>Best Case:</strong> {bestCaseTimeComplexity} <br />
                  <strong>Average Case:</strong> {avgCaseTimeComplexity} <br />
                  <strong>Worst Case:</strong> {worstCaseTimeComplexity}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div style={{ height: "220px" }}>
                <Line
                  data={{
                    labels: ["Best Case", "Average Case", "Worst Case"],
                    datasets: [
                      {
                        label: "Time Complexity",
                        data:
                          selectedSort &&
                          complexityInfo[selectedSort].chartData,
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: {
                        display: true,
                        text: "Time Complexity Chart",
                      },
                    },
                  }}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={spaceDialogOpen} onOpenChange={setSpaceDialogOpen}>
            <AlertDialogTrigger asChild>
              <button className="bg-black text-white px-4 py-2 rounded-md font-semibold">
                Space Complexity
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {selectedSort && complexityInfo[selectedSort].title} - Space
                  Complexity
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  <strong>Space:</strong> {spaceComplexity}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div style={{ height: "220px" }}>
                <Line
                  data={{
                    labels: ["Best Case", "Average Case", "Worst Case"],
                    datasets: [
                      {
                        label: "Space Complexity",
                        data:
                          selectedSort &&
                          complexityInfo[selectedSort].spaceData,
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      title: {
                        display: true,
                        text: "Space Complexity Chart",
                      },
                    },
                  }}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogAction>Close</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <div className="my-6 flex-col w-full text-center">
        <div className="text-2xl font-semibold mb-2">How it works</div>
        <div className="text-muted-foreground text-center mx-[450px]">
          This visualizer demonstrates various sorting algorithms in action.
          Generate a new array, select an algorithm, adjust the size and speed,
          then click "Sort!" to see the algorithm work through the array in
          real-time.
        </div>
      </div>
    </div>
  );
}

export default App;
