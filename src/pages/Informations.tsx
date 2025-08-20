import { useState } from "react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const response = await fetch("https://weddingwebsiteapi-production.up.railway.app/api/email/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, attending }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Confirmação enviada com sucesso!");
        setName("");
        setEmail("");
      } else {
        setStatus(`Erro: ${data.message || data.error}`);
      }
    } catch (err) {
      setStatus("Erro ao enviar confirmação.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-xl font-bold mb-4">Confirmação de Presença</h2>

      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-3 border rounded"
        required
      />

      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={attending}
          onChange={(e) => setAttending(e.target.checked)}
          className="mr-2"
        />
        Vou comparecer
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Confirmar Presença
      </button>

      {status && <p className="mt-3 text-center">{status}</p>}
    </form>
  );
}
