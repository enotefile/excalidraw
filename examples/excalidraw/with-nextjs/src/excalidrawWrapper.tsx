"use client";
import * as excalidrawLib from "@notud/excalidraw";
import { Excalidraw } from "@notud/excalidraw";
import App from "../../components/App";

import "@notud/excalidraw/index.css";

const ExcalidrawWrapper: React.FC = () => {
  return (
    <>
      <App
        appTitle={"Excalidraw with Nextjs Example"}
        useCustom={(api: any, args?: any[]) => {}}
        excalidrawLib={excalidrawLib}
      >
        <Excalidraw />
      </App>
    </>
  );
};

export default ExcalidrawWrapper;
