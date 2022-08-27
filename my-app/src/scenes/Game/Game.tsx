import * as React from "react";

import { Box, Button, Typography } from "@mui/material";

import { CircleButton } from "components/CircleButton";

import { buildKey } from "./helpers/cell";
import { useGame } from "./hooks/useGame";

export const Game = () => {
  const rowNum = 6;
  const columnNum = 7;

  const { cellMap, isFinished, isReadyCellMap, onClick, resetGame } = useGame({
    rowNum,
    columnNum,
  });

  const rows = [...Array(rowNum)].map((_, i) => i);
  const columns = [...Array(columnNum)].map((_, i) => i);

  if (!isReadyCellMap) return null;

  return (
    <Box m={4}>
      <Typography>4つ並べたら勝ち</Typography>
      <Button variant="outlined" onClick={resetGame}>
        リセット
      </Button>
      {isFinished && <Typography>ゲーム終了です</Typography>}
      <Box display="flex" flexDirection="column" gap={1} mt={2}>
        {rows.map((rowIndex) => {
          return (
            <Box display="flex" key={rowIndex} gap={1}>
              {columns.map((columnIndex) => {
                const key = buildKey({ rowIndex, columnIndex });
                const cell = cellMap[key];
                return (
                  <div
                    key={cell.key}
                    onClick={() => onClick({ rowIndex, columnIndex })}
                  >
                    <CircleButton color={cell.state} />
                  </div>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
