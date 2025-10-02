import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/home.css';

export default function Home() {
  const navigate = useNavigate();

  const imageList = [
    '/imgs/foto1.jpg',
    '/imgs/foto2.jpg',
    '/imgs/foto3.jpg',
    '/imgs/foto4.jpg',
    '/imgs/foto5.jpg',
    '/imgs/foto6.jpg',
    '/imgs/foto7.jpg',
    '/imgs/foto8.jpg',
    '/imgs/foto9.jpg',
    '/imgs/foto10.jpg',
    '/imgs/foto11.jpg',
    '/imgs/foto12.jpg',
    '/imgs/foto13.jpg',
    '/imgs/foto14.jpg',
    '/imgs/foto15.jpg',
    '/imgs/foto16.jpg',
    '/imgs/foto17.jpg',
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imageList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageList.length]);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % imageList.length);
  };
  
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">
          Bem-vindo à Aventura de
        </h1>
        <h1 className="kep text-[100px] quest-title">
          Kevin e Pâmela
        </h1>

        <div className="relative w-full max-w-3xl aspect-[16/9] overflow-hidden rounded-xl shadow-md mb-6">
          <img
            src={imageList[current]}
            alt={`Imagem ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition duration-1000"
          />

          <button
            onClick={goToPrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[rgba(255,255,255,0.25)] hover:bg-white rounded-full p-2"
          >
            ◀
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[rgba(255,255,255,0.25)] hover:bg-white rounded-full p-2"
          >
            ▶
          </button>
        </div>

        <h2>Você se aproxima de um senhor com uma aparência amigável, está utilizando uma bengala e um chapéu um tanto diferente.<br/>
          Ao notar sua presença, ele sorri e diz:
        </h2>
      </div>
      <div className="flex flex-col items-center mt-4 p-4 gap-4">
        <img
          className="w-1/2 h-1/2 md:w-1/5 md:h-1/5 rounded-full object-cover scale-110"
          src="/imgs/mage.gif"
          alt="Mago"
        />
        <audio
          src="/sounds/Mage.mp3"
          controls
          className="h-6 mb-4"
        />
        <div className="flex-1 flex flex-col">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4 text-[rgba(74,88,37,1)]">
            Merlin, o mago
          </h1>
          <p className="pb-[20px] text-base md:text-lg text-justify">
            YOU SHALL NOT... Ah espera, fala errada.<br/>
            Eu costumava ser um aventureiro como você, até que tomei uma flechada no joelho.<br/>
            Em meus sonhos, vi você chegando a um lugar especial, onde um casal cheio de amor parecia precisar da sua ajuda.  
            Eles sorriram ao te ver, e algo me diz que sua presença fará toda a diferença.<br/>
            Tenho quase certeza de que vi esse casal subindo a rua mais cedo, ouvi dizer que são novos aqui na cidade.
          </p>
          <button
            onClick={() => navigate('/mission')}
            className="self-end group relative inline-flex h-14 items-center justify-center rounded-full bg-[rgba(165,121,0,0.65)] py-1 pl-6 pr-14 overflow-hidden"
          >
            <span className="z-10 pr-2">Seguir o caminho que o mago indicou</span>

            <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-[rgba(165,121,0,0.65)] transition-[width] group-hover:w-[calc(100%-8px)]">
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