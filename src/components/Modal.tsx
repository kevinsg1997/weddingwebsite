import React, { useState } from "react";
import '../styles/modal.css';

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    IsGoing: false,
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.Name) {
      setStatus("❌ Por favor, preencha seu nome.");
      return;
    }

    setLoading(true); // Inicia carregamento

    try {
      const response = await fetch(
        "https://weddingwebsiteapi-production.up.railway.app/api/guest/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Name: formData.Name,
            Email: formData.Email,
            IsGoing: formData.IsGoing,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setStatus(`❌ Erro: ${data.message || "Não foi possível enviar."}`);
        return;
      }

      setStatus(
        formData.IsGoing
          ? "🎉 Estamos muito felizes em contar com você nesta aventura!"
          : "📜 Sua ausência foi registrada. Estaremos com você em pensamento!"
      );
    } catch (err) {
      console.error(err);
      setStatus("❌ Erro ao enviar os dados, tente novamente.");
    } finally {
      setLoading(false); // Finaliza carregamento
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, id } = e.target;

    if (type === "radio" && name === "attendance") {
      setFormData(prev => ({
        ...prev,
        IsGoing: value === "going",
      }));
    } else if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        [id]: checked,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(53,53,53,0.5)] z-50">
      <div className="bg-[rgba(255,247,224,1)] parchment-bg quest-border rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
        >
          ✖
        </button>
        <h2 className="text-xl sm:text-2xl font-serif quest-title text-center mb-4">
          Confirmação de Presença
        </h2>
        <p>*Caso seja mais de uma pessoa, enviar os dados de cada um.<br /></p>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="Name" className="block readable-text font-sans mb-1">
              Nome completo do Aventureiro *
            </label>
            <input
              id="Name"
              type="text"
              placeholder="Digite seu nome"
              className="w-full p-2 border border-quest-gold rounded"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Email" className="block readable-text font-sans mb-1">
              E-mail (opcional)
            </label>
            <input
              id="Email"
              type="email"
              placeholder="Digite seu e-mail (opcional)"
              className="w-full p-2 border border-quest-gold rounded"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="IsGoing"
              type="radio"
              name="attendance"
              value="going"
              checked={formData.IsGoing === true}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-gray-400 rounded peer checked:border-green-500 checked:bg-green-500 focus:outline-none"
            />
            <label htmlFor="IsGoing" className="readable-text font-sans peer-checked:text-green-800">
              Vou comparecer
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="IsNotGoing"
              type="radio"
              name="attendance"
              value="notGoing"
              checked={formData.IsGoing === false}
              onChange={handleChange}
              className="w-5 h-5 border-2 border-gray-400 rounded peer checked:border-red-500 checked:bg-red-500 focus:outline-none"
            />
            <label htmlFor="IsNotGoing" className="readable-text font-sans peer-checked:text-red-800">
              Não vou comparecer
            </label>
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 border border-quest-gold rounded py-2 readable-text"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 rounded py-2 transition-colors duration-200 ${
                loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[rgba(0,0,0,0.15)] hover:bg-[rgba(0,0,0,0.25)]"
              }`}
            >
              {loading ? "Enviando..." : "Confirmar"}
            </button>
          </div>
          {status && <p className="text-center mt-4 font-semibold">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Modal;
