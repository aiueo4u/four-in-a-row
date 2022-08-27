export type Cell = {
  key: string;
  rowIndex: number;
  columnIndex: number;
  state: "hole" | "red" | "green";
};

export type CellMap = Record<string, Cell>;
