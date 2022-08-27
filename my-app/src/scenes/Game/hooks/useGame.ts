import * as React from "react";

import { Cell } from "types/game";

import { buildKey } from "../helpers/cell";
import { judgeAround } from "../helpers/judge";

type IndexProps = { rowIndex: number; columnIndex: number };

export const useGame = ({
  rowNum,
  columnNum,
}: {
  rowNum: number;
  columnNum: number;
}) => {
  const [cellMap, setCellMap] = React.useState<Record<string, Cell>>({});
  const [isReadyCellMap, setIsReadyCellMap] = React.useState<boolean>(false);
  const [currentTurn, setCurrentTurn] = React.useState<"red" | "green">("red");
  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  const resetGame = () => {
    initializeCellMap();
    setCurrentTurn("red");
    setIsFinished(false);
  };

  const judgeFinished = (cellMap: Record<string, Cell>) => {
    for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnNum; columnIndex++) {
        if (judgeAround({ cellMap, rowIndex, columnIndex })) {
          setIsFinished(true);
          return;
        }
      }
    }
  };

  const canPlaceChip = ({ rowIndex, columnIndex }: IndexProps): boolean => {
    // 配置済みチェック
    const cell = cellMap[buildKey({ rowIndex, columnIndex })];
    if (cell.state !== "hole") return false;

    // 積み上げチェック
    const underKey = buildKey({ rowIndex: rowIndex + 1, columnIndex });
    const underCell = cellMap[underKey];
    if (!underCell || underCell.state !== "hole") return true;

    return false;
  };

  const onClick = ({ rowIndex, columnIndex }: IndexProps) => {
    if (isFinished) return;

    // 重力対応
    if (!canPlaceChip({ rowIndex, columnIndex })) return;

    const key = buildKey({ rowIndex, columnIndex });
    const state = currentTurn;
    setCellMap((cellMap) => ({
      ...cellMap,
      [key]: { ...cellMap[key], state },
    }));
    setCurrentTurn((currentTurn) => (currentTurn === "red" ? "green" : "red"));
  };

  // 勝敗判定
  React.useEffect(() => {
    judgeFinished(cellMap);
  }, [cellMap]);

  const initializeCellMap = () => {
    const initialCellMap: Record<string, Cell> = {};
    for (let rowIndex = 0; rowIndex < rowNum; rowIndex++) {
      for (let columnIndex = 0; columnIndex < columnNum; columnIndex++) {
        const key = buildKey({ rowIndex, columnIndex });
        const cell: Cell = { key, rowIndex, columnIndex, state: "hole" };
        initialCellMap[key] = cell;
      }
    }
    setCellMap(initialCellMap);
    setIsReadyCellMap(true);
  };

  // 初期化処理
  React.useEffect(() => {
    initializeCellMap();
  }, []);

  return {
    cellMap,
    isFinished,
    isReadyCellMap,
    onClick,
    resetGame,
  };
};
