import { restore } from "../data/restore";
import {
  convertToExcalidrawElements,
  ExcalidrawElementSkeleton,
} from "../data/transform";
import { AppState, ExcalidrawImperativeAPI } from "../types";
import { ExcalidrawElement } from "./types";

const frameElement = {
  type: "frame",
  id: "CtfrFGQ6SOW14GOkSqQFq",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  locked: true,
};

const backgroundElement = {
  type: "image",
  id: "moDgKT4MmX_QRzzgTlcVC",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  frameId: "CtfrFGQ6SOW14GOkSqQFq",
  locked: true,
  fileId: "b12919d6-f7a7-c543-cd6d-585552719f67",
  scale: [1, 1],
};

const base64BackgroundImage = {
  mimeType: "image/jpeg",
  id: "b12919d6-f7a7-c543-cd6d-585552719f67",
  dataURL: "",
};

const noteSnapshot = {
  elements: [] as ExcalidrawElement[],
  appState: {} as Readonly<AppState>,
  files: {
    "b12919d6-f7a7-c543-cd6d-585552719f67": base64BackgroundImage,
  },
};

export const fixCanvasSize = (
  excalidrawAPI: ExcalidrawImperativeAPI,
  localDataState: any,
  backgroundImage: string,
) => {
  const appState = excalidrawAPI.getAppState();

  if (
    localDataState.elements?.length > 0 ||
    appState.canvasSize.mode !== "fixed"
  ) {
    localDataState.files = {
      "b12919d6-f7a7-c543-cd6d-585552719f67": {
        dataURL: backgroundImage,
        id: "b12919d6-f7a7-c543-cd6d-585552719f67",
        mimeType: "image/jpeg",
      },
    };

    return localDataState;
  }

  base64BackgroundImage.dataURL = backgroundImage;
  noteSnapshot.appState = appState;

  const canvasWidth = appState.canvasSize.width;
  const canvasHeight = appState.canvasSize.height;

  frameElement.height = canvasHeight;
  frameElement.width = canvasWidth;

  backgroundElement.height = canvasHeight;
  backgroundElement.width = canvasWidth;

  const elements = [];
  elements.push(backgroundElement);
  elements.push(frameElement);

  noteSnapshot.elements = convertToExcalidrawElements(
    elements as ExcalidrawElementSkeleton[],
  );

  // Fix wrong x,y for the frame element after call convertToExcalidrawElements
  const x = 0;
  const y = 0;
  noteSnapshot.elements[1] = { ...noteSnapshot.elements[1], x };
  noteSnapshot.elements[1] = { ...noteSnapshot.elements[1], y };

  return noteSnapshot;
};
