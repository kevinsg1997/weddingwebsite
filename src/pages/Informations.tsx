import React, { useState, useEffect } from "react";
import '../styles/informations.css';

const Info: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const weddingDate = new Date("2026-02-28T16:00:00").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">
            Informações da Missão
          </h1>
          <p className="text-lg sm:text-xl readable-text font-sans">
            Tudo que você precisa saber sobre esta aventura épica
          </p>
        </div>

        <div className="parchment-bg p-4 sm:p-6 lg:p-8 rounded-lg quest-border mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold quest-title font-serif text-center mb-4 sm:mb-6 text-[rgba(74,88,37,1)]">
            ⏰ Tempo Até a Aventura Começar
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-[rgba(0,0,0,0.15)] p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.days}
              </div>
              <div className="font-sans text-xs sm:text-sm">Dias</div>
            </div>
            <div className="bg-[rgba(0,0,0,0.15)] p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.hours}
              </div>
              <div className="font-sans text-xs sm:text-sm">Horas</div>
            </div>
            <div className="bg-[rgba(0,0,0,0.15)] p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="font-sans text-xs sm:text-sm">Minutos</div>
            </div>
            <div className="bg-[rgba(0,0,0,0.15)] p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="font-sans text-xs sm:text-sm">Segundos</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="parchment-bg p-4 sm:p-6 rounded-lg quest-border">
            <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4 text-[rgba(74,88,37,1)]">
              📅 Data e Hora da Missão
            </h3>
            <p className="readable-text font-sans text-sm sm:text-base lg:text-lg text-justify">
              <strong>Data:</strong> 28 de Fevereiro de 2026<br />
              <strong>Hora:</strong> 16:00<br />
              <strong>Duração:</strong> Até a missão estar completa.
            </p>
          </div>

          <div className="parchment-bg p-4 sm:p-6 rounded-lg quest-border">
            <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4 text-[rgba(74,88,37,1)]">
              👗 Traje da Missão
            </h3>
            <p className="readable-text font-sans text-sm sm:text-base lg:text-lg text-justify">
              <strong>Código de Vestimenta:</strong> Social/Semi-formal<br />
              <strong>Cores:</strong> Qualquer cor exceto branco ou cores das paletas de madrinhas e padrinhos.
            </p>
          </div>
        </div>

        <div className="parchment-bg p-4 sm:p-6 flex flex-col items-center">
          <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4 text-[rgba(74,88,37,1)]">
            🎨 Paleta de cores Madrinhas e Padrinhos
          </h3>
          <p className="readable-text font-sans text-sm sm:text-base lg:text-lg text-justify">Madrinhas</p>
          <img
            className="w-1/2 h-1/2 md:w-1/2 md:h-1/2 object-cover"
            src="/imgs/paletamadrinhas.png"
            alt="Paleta Madrinhas"
          />
          <p className="readable-text font-sans text-sm sm:text-base lg:text-lg text-justify">Padrinhos</p>
          <img
            className="w-1/2 h-1/2 md:w-1/2 md:h-1/2 object-cover"
            src="/imgs/paletapadrinhos.png"
            alt="Paleta Padrinhos"
          />
        </div>

        <div className="parchment-bg p-4 sm:p-6 rounded-lg quest-border mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4 text-[rgba(74,88,37,1)]">
            🗺️ Local da Missão
          </h3>
          <div className="bg-quest-stone-light rounded-lg p-4 min-h-48 sm:min-h-64 flex items-center justify-center">
            <p className="readable-text font-sans text-sm sm:text-base lg:text-lg text-center">
              <div className="rounded-2xl shadow-lg overflow-hidden w-full h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.513329909012!2d-49.1202727!3d-25.5634597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dcfbaae5ac8ee7%3A0x1b5afdeee19c68e7!2sR.%20J%C3%BAlio%20C%C3%A9sar%20Setenareski%2C%202493%20-%20Mergulh%C3%A3o%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Pinhais%20-%20PR%2C%2083085-290!5e0!3m2!1spt-BR!2sbr!4v1699999999999"
                  width="100%"
                  height="100%"
                  className="w-full h-full border-2 border-[rgba(121,92,0,0.65)] rounded-2xl"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <br />
              <strong>Endereço:</strong> Chácara Lagos Italy<br />
              Rua - R. Júlio César Setenareski, 2493 - Mergulhão, São José dos Pinhais - PR, 83085-290
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
