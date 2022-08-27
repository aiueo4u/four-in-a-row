import { CellMap } from "types/game";

import { buildKey } from "./cell";

const winNum = 4;

const isSameState = (cellMap: CellMap, key1: string, key2: string): boolean => {
  const cell1 = cellMap[key1];
  const cell2 = cellMap[key2];
  return (
    cell1 &&
    cell2 &&
    cell1.state !== "hole" &&
    cell2.state !== "hole" &&
    cell1.state === cell2.state
  );
};

const judgeWinNum = (
  cellMap: CellMap,
  rowIndex: number,
  columnIndex: number,
  diff: [number, number]
) => {
  const targetKey = buildKey({ rowIndex, columnIndex });

  let nextRowIndex = rowIndex;
  let nextColumnIndex = columnIndex;

  for (let count = 0; count < winNum - 1; count++) {
    nextRowIndex += diff[0];
    nextColumnIndex += diff[1];

    const nextKey = buildKey({
      rowIndex: nextRowIndex,
      columnIndex: nextColumnIndex,
    });
    if (!isSameState(cellMap, targetKey, nextKey)) {
      return false;
    }
  }
  return true;
};

export const judgeAround = ({
  cellMap,
  rowIndex,
  columnIndex,
}: {
  cellMap: CellMap;
  rowIndex: number;
  columnIndex: number;
}) => {
  // 縦
  if (judgeWinNum(cellMap, rowIndex, columnIndex, [1, 0])) return true;

  // 横
  if (judgeWinNum(cellMap, rowIndex, columnIndex, [0, 1])) return true;

  // 右斜
  if (judgeWinNum(cellMap, rowIndex, columnIndex, [-1, 1])) return true;

  // 左斜
  if (judgeWinNum(cellMap, rowIndex, columnIndex, [-1, -1])) return true;

  return false;
};
