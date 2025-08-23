import '../styles/mission.css';
import { useState, useEffect } from "react";

type CellType = "grass" | "block" | "interact" |
                "player" | "nun" | "mage" | "kepam" | "merchant" |
                "street";

const GRID_ROWS = 16;
const GRID_COLS = 16;

export default function Mission() {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [modalText, setModalText] = useState<string | null>(null);
  const [prevCell, setPrevCell] = useState<CellType>("grass");

  // Grid
  useEffect(() => {
    const newGrid: CellType[][] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
      const row: CellType[] = [];
      for (let c = 0; c < GRID_COLS; c++) {
        if ((r === 3 && c >= 3 && c <= 5) ||
            (c >= 5 && c <= 6 && r >= 9 && r <= 10) ||
            (c >= 4 && c <= 6 && r >= 0 && r <= 3) ||
            (c >= 0 && c <= 6 && r >= 7 && r <= 8) ||
            (c >= 10 && c <= 12 && r >= 0 && r <= 4) ||
            (c >= 11 && c <= 15 && r >= 7 && r <= 9) ||
            (c >= 9 && c <= 12 && r >= 12 && r <= 15)) {
          row.push("block");
        } else if ((r === 3 && c === 1) ||
                    (r === 3 && c === 8) ||
                    (r === 5 && c === 14) ||
                    (r === 13 && c === 14) ||
                    (r === 4 && c === 1) ||
                    (r === 4 && c === 8) ||
                    (r === 5 && c === 1) ||
                    (r === 5 && c >= 2 && c <= 7) ||
                    (r === 5 && c === 8) ||
                    (r === 6 && c === 8)) {
          row.push("street");
        }
        else if (r === 4 && c === 14) {
          row.push("nun");
        } else if (r === 14 && c === 14) {
          row.push("mage");
        } else if (r === 2 && c === 8) {
          row.push("kepam");
        } else if (r === 12 && c === 2) {
          row.push("merchant");
        } else {
          row.push("grass");
        }
      }
      newGrid.push(row);
    }
    newGrid[playerPos.row][playerPos.col] = "player";
    setGrid(newGrid);
  }, []);

  // Mover jogador
  const movePlayer = (newRow: number, newCol: number) => {
    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= GRID_ROWS ||
      newCol >= GRID_COLS
    )
      return;

    if (grid[newRow][newCol] === ("interact" as CellType) ||
        grid[newRow][newCol] === ("nun" as CellType) ||
        grid[newRow][newCol] === ("mage" as CellType) ||
        grid[newRow][newCol] === ("kepam" as CellType) ||
        grid[newRow][newCol] === ("merchant" as CellType)) {
      setModalText(`Você interagiu com o objeto em (${newRow}, ${newCol})`);
      return;
    }

    if (grid[newRow][newCol] === "grass" ||
        grid.flat().some(cell => cell.includes("street"))) {
      const updatedGrid = grid.map((row) => [...row]);
      updatedGrid[playerPos.row][playerPos.col] = prevCell;
      setPrevCell(updatedGrid[newRow][newCol]);
      updatedGrid[newRow][newCol] = "player";
      setGrid(updatedGrid);
      setPlayerPos({ row: newRow, col: newCol });
    }

    else
      return;
  };

  // Controles do teclado
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") movePlayer(playerPos.row - 1, playerPos.col);
      if (e.key === "ArrowDown") movePlayer(playerPos.row + 1, playerPos.col);
      if (e.key === "ArrowLeft") movePlayer(playerPos.row, playerPos.col - 1);
      if (e.key === "ArrowRight") movePlayer(playerPos.row, playerPos.col + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos, grid]);

  // Clique do mouse
  const handleCellClick = (r: number, c: number) => {
    const isAdjacent =
      Math.abs(r - playerPos.row) + Math.abs(c - playerPos.col) === 1;
    
      if (isAdjacent && grid[r][c] !== "block" && grid[r][c] !== "interact") {
        movePlayer(r, c);
      } else if (grid[r][c] === "interact") {
        setModalText(`Você interagiu com o objeto em (${r}, ${c})`);
      }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">Cidade da folha</h1>
      <p className="pb-[20px] text-base md:text-lg">
        Você chega à Cidade da Folha, um lugar tranquilo e encantador. As ruas são calmas, e ao caminhar 
        em direção ao centro, você nota algumas pessoas interessantes, cada uma com sua própria história 
        para contar. O aroma das flores e o som suave das folhas ao vento tornam a caminhada ainda mais agradável.
      </p>
      <div
        className="grid"
        style={{
          gridTemplateRows: `repeat(${GRID_ROWS}, 25px)`,
          gridTemplateColumns: `repeat(${GRID_COLS}, 25px)`,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className={`border border-gray-700 ${
                cell === "grass"
                  ? "bg-green-200"
                  : cell === "block"
                  ? "bg-gray-600 cursor-not-allowed"
                  : cell === "interact"
                  ? "bg-yellow-400"
                  : cell === "street"
                  ? "bg-gray-400"
                  : cell === "player"
                  ? "bg-blue-500"
                  : cell === "nun"
                  ? "bg-red-500"
                  : cell === "mage"
                  ? "bg-green-500"
                  : cell === "merchant"
                  ? "bg-yellow-500"
                  : cell === "kepam"
                  ? "bg-purple-400"
                  : ""
              }`}
            ></div>
          ))
        )}
      </div>

      {modalText && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm">
            <p className="mb-4">{modalText}</p>
            <button
              onClick={() => setModalText(null)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
