let canvasElement: HTMLCanvasElement;
let testObj = {};
const workerFunction = function () {
  self.onmessage = (event: MessageEvent) => {
    switch (event.data.msg) {
      case "init":
        canvasElement = event.data.canvasElement;
        testObj = event.data.testObj;

        console.log("canvasElement", canvasElement);
        console.log("testObj", testObj);

        postMessage({ msg: "init-finished" });
        break;
      case "start":
        break;
      default:
        return;
    }
  };
};

//This stringifies the whole function
let codeToString = workerFunction.toString();

//This brings out the code in the bracket in string
let mainCode = codeToString.substring(
  codeToString.indexOf("{") + 1,
  codeToString.lastIndexOf("}"),
);

//convert the code into a raw data
let blob = new Blob([mainCode], { type: "application/javascript" });

//A url is made out of the blob object and we're good to go
let renderElementWorker = URL.createObjectURL(blob);

export default renderElementWorker;
