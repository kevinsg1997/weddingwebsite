import React, { useEffect, useState } from "react";

type Guest = {
  id: string;
  createdAt: string;
  name: string;
  email?: string;
  isGoing: boolean;
};

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState("");

  const PASSWORD = "noivos2025";

  useEffect(() => {
    const stored = localStorage.getItem("guestlist-auth");
    if (stored === "true") {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    const fetchGuests = async () => {
      try {
        const response = await fetch("https://weddingwebsiteapi-production.up.railway.app/api/guest/all");
        const data = await response.json();
        setGuests(data);
      } catch (error) {
        console.error("Erro ao buscar convidados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, [authenticated]);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const downloadCSV = () => {
    const csvHeader = "Nome,Email,Vai Comparecer,Data de Resposta\n";
    const csvRows = guests.map(g =>
      `"${g.name}","${g.email || ""}","${g.isGoing ? "Sim" : "Não"}","${formatDate(g.createdAt)}"`
    );

    const csvContent = csvHeader + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "lista-convidados.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleAuth = () => {
    if (passwordInput === PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("guestlist-auth", "true");
    } else {
      alert("Senha incorreta. Tente novamente.");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f3e7] p-4">
        <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
          <h2 className="text-xl font-serif text-center mb-4">Acesso Restrito</h2>
          <p className="text-sm text-center mb-4">Digite a senha para visualizar a lista de convidados:</p>
          <input
            type="password"
            className="w-full border border-gray-300 rounded p-2 mb-4"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Senha"
          />
          <button
            onClick={handleAuth}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-[#f7f3e7] font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-6 text-center">Lista de Convidados</h1>

        <div className="mb-4 text-right">
          <button
            onClick={downloadCSV}
            className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded shadow"
          >
            📥 Baixar CSV
          </button>
        </div>

        {loading ? (
          <p className="text-center">Carregando convidados...</p>
        ) : guests.length === 0 ? (
          <p className="text-center">Nenhum convidado encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border-b">Nome</th>
                  <th className="p-3 border-b">Email</th>
                  <th className="p-3 border-b">Vai comparecer?</th>
                  <th className="p-3 border-b">Data de resposta</th>
                </tr>
              </thead>
              <tbody>
                {guests.map(guest => (
                  <tr key={guest.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{guest.name}</td>
                    <td className="p-3 border-b">{guest.email || "-"}</td>
                    <td className="p-3 border-b">{guest.isGoing ? "Sim" : "Não"}</td>
                    <td className="p-3 border-b">{formatDate(guest.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestList;