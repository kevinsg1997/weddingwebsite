import '../styles/mission.css';
import { useState, useEffect } from "react";

type CellType = "grass" | "block" | "interact" |
                "player" | "nun" | "charioteer" | "kepam" | "merchant";

const GRID_ROWS = 16;
const GRID_COLS = 16;

const activeAudios: HTMLAudioElement[] = [];

export default function Mission() {
  const [grid, setGrid] = useState<CellType[][]>([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [modalText, setModalText] = useState<string | null>(null);
  const [modalType, setModalType] = useState<string | null>(null);
  const [prevCell, setPrevCell] = useState<CellType>("grass");

  const [cellSize, setCellSize] = useState(25);

  useEffect(() => {
    const updateCellSize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setCellSize(40);
      } else {
        setCellSize(25);
      }
    };

    updateCellSize(); // define no carregamento
    window.addEventListener("resize", updateCellSize);

    return () => window.removeEventListener("resize", updateCellSize);
  }, []);

  // Criação do grid
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
            (c >= 0 && c <= 1 && r >= 9 && r <= 12) ||
            (r === 11 && c === 2) ||
            (r === 2 && c === 7) ||
            (r === 2 && c === 9) ||
            (r === 4 && c === 15) ||
            (r === 4 && c === 13) ||
            (r === 14 && c === 15) ||
            (r === 14 && c === 13) ||
            (c >= 9 && c <= 12 && r >= 12 && r <= 15)) {
          row.push("block");
        } else if (r === 4 && c === 14) {
          row.push("nun");
        } else if (r === 14 && c === 14) {
          row.push("charioteer");
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
  }, [playerPos]);

  // Movimentação do jogador
  const movePlayer = (newRow: number, newCol: number) => {
    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= GRID_ROWS ||
      newCol >= GRID_COLS
    )
      return;

    if (grid[newRow][newCol] === "grass") {
      const updatedGrid = grid.map((row) => [...row]);
      updatedGrid[playerPos.row][playerPos.col] = prevCell;
      setPrevCell(updatedGrid[newRow][newCol]);
      updatedGrid[newRow][newCol] = "player";
      setGrid(updatedGrid);
      setPlayerPos({ row: newRow, col: newCol });
    } else return;
  };

  const stepingAudio = [
  "/sounds/step1.mp3",
  "/sounds/step2.mp3",
  "/sounds/step3.mp3"
  ];

  const playStepAudio = () => {
  const miscAudio = stepingAudio[Math.floor(Math.random() * stepingAudio.length)];
  const audio = new Audio(miscAudio);
  audio.play();
  };

  const handleCellClick = (r: number, c: number) => {
    const isAdjacent =
      Math.abs(r - playerPos.row) + Math.abs(c - playerPos.col) === 1;

    if (isAdjacent && grid[r][c] !== "block" && grid[r][c] !== "interact") {
      movePlayer(r, c);
      playStepAudio();
    } else if (grid[r][c] === "interact") {
      setModalText(`Você interagiu com o objeto em (${r}, ${c})`);
    }

    if (grid[r][c] === "merchant") {
      playSound("/sounds/Merchant.mp3");
      setModalText("Venha e veja os itens que você pode comprar para ajudar na aventura do casal!");
      setModalType("merchant");
    } else if (grid[r][c] === "nun") {
      playSound("/sounds/Nun.mp3");
      setModalText("Olá, que bom ver você por aqui! O casal aparentou muito feliz com sua presença. Indico falar com o mercador e com o coucheiro assim que puder! Agora venha aqui, deixe-me abençoar sua jornada.");
      setModalType("nun");
    } else if (grid[r][c] === "kepam") {
      playSound("/sounds/Kevin.mp3", () => {
        playSound("/sounds/Pamela.mp3");
      });
      setModalText("Não acredito que está por aqui! Ficamos tão felizes que tenha realmente vindo nos visitar, temos uma aventura muito importante pela frente e sua ajuda será essencial. Por favor, fale com a freira para poder receber uma benção e ter mais segurança no caminho.");
      setModalType("kepam");
    } else if (grid[r][c] === "charioteer") {
      playSound("/sounds/Courier.mp3");
      setModalText("Olá, aventureiro! Sou o cocheiro desta cidade. Ouvi dizer que você está ajudando o Kevin e a Pâmela em uma aventura importante. Se precisar de transporte ou informações sobre a região, estou à disposição. Gostaria de saber mais sobre a missão?");
      setModalType("charioteer");
    }
  };

  const closeModal = () => {
    setModalText(null);
    setModalType(null);
  };

  const handleMerchantResponse = (response: "yes" | "no") => {
    if (response === "yes") {
      window.open("/merchant", "_blank");
    }
    closeModal();
  };

  const handleCharioteerResponse = (response: "yes" | "no") => {
    if (response === "yes") {
      window.open("/informations", "_blank");
    }
    closeModal();
  };

  const getCharacterImage = () => {
    switch (modalType) {
      case "merchant":
        return "/imgs/adventure/merchant.png";
      case "nun":
        return "/imgs/adventure/nun.png";
      case "kepam":
        return "/imgs/adventure/kepam.png";
      case "charioteer":
        return "/imgs/adventure/charioteer.png";
      default:
        return "";
    }
  };

  const renderModalButtons = () => {
    switch (modalType) {
      case "merchant":
        return (
          <>
            <button
              onClick={() => handleMerchantResponse("yes")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sim
            </button>
            <button
              onClick={() => handleMerchantResponse("no")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Não
            </button>
          </>
        );
      case "nun":
      case "kepam":
        return (
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Ok
          </button>
        );
      case "charioteer":
        return (
          <>
            <button
              onClick={() => handleCharioteerResponse("yes")}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sim
            </button>
            <button
              onClick={() => handleCharioteerResponse("no")}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Não
            </button>
          </>
        );
      default:
        return (
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Fechar
          </button>
        );
    }
  };

  const stopAllSoundsExceptBackground = () => {
    activeAudios.forEach((audio) => {
      if (!audio.src.includes("background.mp3")) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    for (let i = activeAudios.length - 1; i >= 0; i--) {
      if (!activeAudios[i].src.includes("background.mp3")) {
        activeAudios.splice(i, 1);
      }
    }
  };

  const playSound = (src: string, onEndedCallback?: () => void) => {
    stopAllSoundsExceptBackground();

    const sound = new Audio(src);
    sound.play();
    activeAudios.push(sound);

    sound.onended = () => {
      const index = activeAudios.indexOf(sound);
      if (index > -1) {
        activeAudios.splice(index, 1);
      }

      if (onEndedCallback) onEndedCallback();
    };
  };

  const isAdjacentToPlayer = (r: number, c: number) => {
    return Math.abs(r - playerPos.row) + Math.abs(c - playerPos.col) === 1;
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">Cidade da folha</h1>
      
      <p className="pb-[20px] text-base md:text-lg text-center">
        Você chega à Cidade da Folha, um lugar tranquilo e encantador. As ruas são calmas, e ao caminhar 
        em direção ao centro, você nota algumas pessoas interessantes, cada uma com sua própria história 
        para contar. O aroma das flores e o som suave das folhas ao vento tornam a caminhada ainda mais agradável.
      </p>

      <p className="pb-[20px] text-base md:text-sm">
        *Para andar clique ou toque nos quadrados adjacentes ao seu personagem que estão destacados com uma luz amarela.
      </p>

      <p className="text-sm">Aperte o play e entre no clima! ^^</p>
      <audio
        src="/sounds/background.mp3"
        loop
        controls
        className="h-6 mb-4"
      />

      <div
        className="grid border-4 border-[rgba(105,79,0,1)]"
        style={{
          gridTemplateRows: `repeat(${GRID_ROWS}, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${GRID_COLS}, ${cellSize}px)`,
          backgroundImage: 'url("/imgs/adventure/fundogame.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              style={{
                backgroundImage: cell === "player" 
                  ? 'url("/imgs/adventure/aventureiro.png")'
                  : isAdjacentToPlayer(r, c) && cell !== "block"
                  ? 'url("/imgs/adventure/click.gif")' 
                  : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))
        )}
      </div>

      {modalText && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="border-2 border-[rgba(105,79,0,1)] bg-[rgba(255,247,224,1)] bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={getCharacterImage()} 
                alt={modalType || 'Imagem do personagem'}
                className="w-40 h-40 rounded-full object-cover border-2 border-[rgba(105,79,0,1)]"
              />
              <p className="text-sm text-justify">{modalText}</p>
            </div>
            <div className="flex gap-4 justify-end">{renderModalButtons()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
