export const buildKey = ({
  rowIndex,
  columnIndex,
}: {
  rowIndex: number;
  columnIndex: number;
}) => `${rowIndex}-${columnIndex}`;
