interface MoveProps {
  x?: number;
  y?: number;
}

export type Move = (p: MoveProps) => void;
