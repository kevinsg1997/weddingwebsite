import React, { useState, useEffect } from "react";
import '../styles/informations.css';

const Info = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: false,
  });
  const [status, setStatus] = useState("");

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setStatus("❌ Por favor, preencha seu nome e e-mail.");
      return;
    }

    try {
      const response = await fetch(
        "https://weddingwebsiteapi-production.up.railway.app/api/RSVP/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: formData.name,
            Email: formData.email,
            Attending: formData.attending,
            ItemName: "", // preencha se houver item associado
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setStatus(`❌ Erro: ${data.message || "Não foi possível enviar."}`);
        return;
      }

      setStatus(
        formData.attending
          ? "🎉 Estamos muito felizes em contar com você nesta aventura!"
          : "📜 Sua ausência foi registrada. Estaremos com você em pensamento!"
      );

      setTimeout(() => {
        setIsModalOpen(false);
        setFormData({ name: "", email: "", attending: false });
        setStatus("");
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Erro ao enviar os dados, tente novamente.");
    }
  };

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
          <h2 className="text-2xl sm:text-3xl font-bold quest-title font-serif text-center mb-4 sm:mb-6">
            ⏰ Tempo Até a Aventura Começar
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
            <div className="bg-quest-gold p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.days}
              </div>
              <div className="font-sans text-xs sm:text-sm">Dias</div>
            </div>
            <div className="bg-quest-gold p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.hours}
              </div>
              <div className="font-sans text-xs sm:text-sm">Horas</div>
            </div>
            <div className="bg-quest-gold p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="font-sans text-xs sm:text-sm">
                Minutos
              </div>
            </div>
            <div className="bg-quest-gold p-3 sm:p-4 rounded-lg">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="font-sans text-xs sm:text-sm">
                Segundos
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="parchment-bg p-4 sm:p-6 rounded-lg quest-border">
            <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4">
              📅 Data e Hora da Missão
            </h3>
            <p className="readable-text font-sans text-sm sm:text-base lg:text-lg">
              <strong>Data:</strong> 31 de Dezembro de 2024<br />
              <strong>Hora:</strong> 15:00<br />
              <strong>Duração:</strong> Até as estrelas se alinharem
            </p>
          </div>

          <div className="parchment-bg p-4 sm:p-6 rounded-lg quest-border">
            <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4">
              👗 Traje da Missão
            </h3>
            <p className="readable-text font-sans text-sm sm:text-base lg:text-lg">
              <strong>Código de Vestimenta:</strong> Social/Semi-formal<br />
              <strong>Cores:</strong> Qualquer cor exceto branco<br />
              <strong>Especial:</strong> Fique à vontade para adicionar acessórios
              de fantasia!
            </p>
          </div>
        </div>

        <div className="parchment-bg p-4 sm:p-6 rounded-lg quest-border mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold quest-title font-serif mb-4">
            🗺️ Local da Missão
          </h3>
          <div className="bg-quest-stone-light rounded-lg p-4 min-h-48 sm:min-h-64 flex items-center justify-center">
            <p className="readable-text font-sans text-sm sm:text-base lg:text-lg text-center">
              📍 Mapa do Local da Missão<br />
              <span className="text-xs sm:text-sm">
                (Integração com Google Maps ficaria aqui)
              </span>
              <br />
              <strong>Endereço:</strong> A Capela Sagrada do Amor Eterno<br />
              Rua da Aventura, 123, Cidade da Missão, CM 12345
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-quest-green hover:bg-quest-green/90 font-bold py-3 sm:py-4 px-6 sm:px-8 text-lg sm:text-xl rounded-lg quest-border animate-quest-glow font-sans"
          >
            ⚔️ Aceitar Missão
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="parchment-bg quest-border rounded-lg p-6 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
              >
                ✖
              </button>

              <h2 className="text-xl sm:text-2xl font-serif quest-title text-center mb-4">
                Confirmação de Presença
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block readable-text font-sans mb-1"
                  >
                    Nome do Aventureiro *
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-2 border border-quest-gold rounded"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block readable-text font-sans mb-1"
                  >
                    E-mail *
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-2 border border-quest-gold rounded"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="attending"
                    type="checkbox"
                    checked={formData.attending}
                    onChange={(e) =>
                      setFormData({ ...formData, attending: e.target.checked })
                    }
                    className="w-5 h-5 border-quest-gold rounded"
                  />
                  <label
                    htmlFor="attending"
                    className="readable-text font-sans"
                  >
                    Vou comparecer
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 border border-quest-gold rounded py-2 readable-text"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-quest-green hover:bg-quest-green/90 rounded py-2"
                  >
                    Confirmar Presença
                  </button>
                </div>
              </form>

              {status && (
                <p className="mt-4 text-center readable-text font-sans">
                  {status}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Info;
