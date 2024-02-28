import { MIME_TYPES } from "../../constants";
import { Bounds, getElementAbsoluteCoords } from "../../element/bounds";
import { isPointHittingElementBoundingBox } from "../../element/collision";
import { ElementsMap, NonDeletedExcalidrawElement } from "../../element/types";
import { rotate } from "../../math";
import { DEFAULT_LINK_SIZE } from "../../renderer/renderElement";
import { AppState, Point, UIAppState } from "../../types";

export const EXTERNAL_LINK_IMG = document.createElement("img");
EXTERNAL_LINK_IMG.src = `data:${MIME_TYPES.svg}, ${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1971c2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
)}`;

export const getLinkHandleFromCoords = (
  [x1, y1, x2, y2]: Bounds,
  angle: number,
  appState: Pick<UIAppState, "zoom">,
): Bounds => {
  const size = DEFAULT_LINK_SIZE;
  const linkWidth = size / appState.zoom.value;
  const linkHeight = size / appState.zoom.value;
  const linkMarginY = size / appState.zoom.value;
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;
  const centeringOffset = (size - 8) / (2 * appState.zoom.value);
  const dashedLineMargin = 4 / appState.zoom.value;

  // Same as `ne` resize handle
  const x = x2 + dashedLineMargin - centeringOffset;
  const y = y1 - dashedLineMargin - linkMarginY + centeringOffset;

  const [rotatedX, rotatedY] = rotate(
    x + linkWidth / 2,
    y + linkHeight / 2,
    centerX,
    centerY,
    angle,
  );
  return [
    rotatedX - linkWidth / 2,
    rotatedY - linkHeight / 2,
    linkWidth,
    linkHeight,
  ];
};

export const isPointHittingLinkIcon = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: Point,
) => {
  const threshold = 4 / appState.zoom.value;
  const [x1, y1, x2, y2] = getElementAbsoluteCoords(element, elementsMap);
  const [linkX, linkY, linkWidth, linkHeight] = getLinkHandleFromCoords(
    [x1, y1, x2, y2],
    element.angle,
    appState,
  );
  const hitLink =
    x > linkX - threshold &&
    x < linkX + threshold + linkWidth &&
    y > linkY - threshold &&
    y < linkY + linkHeight + threshold;
  return hitLink;
};

export const isPointHittingLink = (
  element: NonDeletedExcalidrawElement,
  elementsMap: ElementsMap,
  appState: AppState,
  [x, y]: Point,
  isMobile: boolean,
) => {
  if (!element.link || appState.selectedElementIds[element.id]) {
    return false;
  }
  const threshold = 4 / appState.zoom.value;
  if (
    !isMobile &&
    appState.viewModeEnabled &&
    isPointHittingElementBoundingBox(
      element,
      elementsMap,
      [x, y],
      threshold,
      null,
    )
  ) {
    return true;
  }
  return isPointHittingLinkIcon(element, elementsMap, appState, [x, y]);
};
