import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">
          Bem-vindo à Aventura de
        </h1>
        <h1 className="kep text-[100px] quest-title mb-4">
          Kevin e Pâmela
        </h1>
        <h2>Você se aproxima de um senhor com uma aparência amigável, está utilizando uma bengala e um chapéu um tanto diferente.<br/>
          Ao notar sua presença, ele sorri e diz:<br/>
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start p-4 gap-4">
        <img
          className="w-1/2 h-1/2 md:w-1/5 md:h-1/5 rounded-full object-cover"
          src="/imgs/mage.png"
          alt="Mago"
        />
        <div className="flex-1 md:text-left flex flex-col">
  <h1 className="sm:pt-[20px] text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">
    Merlin, o mago:
  </h1>
  <p className="pb-[20px] text-base md:text-lg text-justify">
    Eu costumava ser um aventureiro como você, até que tomei uma flechada no joelho.<br/>
    Em meus sonhos, vi você chegando a um lugar especial, onde um casal cheio de amor parecia precisar da sua ajuda.  
    Eles sorriram ao te ver, e algo me diz que sua presença fará toda a diferença.<br/>
    Tenho quase certeza de que vi esse casal subindo a rua mais cedo, ouvi dizer que são novos aqui na cidade.
  </p>
  <button
    onClick={() => navigate('/mission')}
    className="self-end group relative inline-flex h-14 items-center justify-center rounded-full bg-neutral-950 py-1 pl-6 pr-14 font-medium text-neutral-50 overflow-hidden"
  >
    <span className="z-10 pr-2">Seguir o caminho que o mago indicou</span>

    <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-neutral-700 transition-[width] group-hover:w-[calc(100%-8px)]">
      <div className="mr-3.5 flex items-center justify-center">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-neutral-50"
        >
          <path
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  </button>
</div>
      </div>
    </div>
  );
}