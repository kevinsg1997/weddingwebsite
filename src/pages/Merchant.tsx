import { useState } from "react";

type Item = {
  id: string;
  name: string;
  price: number;
  img: string;
};

const items: Item[] = [
  { id: "1", name: "Passagem da carruagem real", price: 300, img: "/img/carruagem.jpg" },
  { id: "2", name: "Entrada para o buffet da realeza", price: 200, img: "/img/buffet.jpg" },
  { id: "3", name: "Objeto inanimado (+4 para ambiente)", price: 100, img: "/img/decoracao.jpg" },
  { id: "4", name: "Vassoura com encontamento de vento", price: 250, img: "/img/aspirador.jpg" },
  { id: "5", name: "Kit para recuperar estâmina", price: 50, img: "/img/ressaca.jpg" },
  { id: "6", name: "Poção de estâmina extra", price: 50, img: "/img/monster.jpg" },
  { id: "7", name: "Poção de vida", price: 50, img: "/img/cafe.jpg" },
  { id: "8", name: "Encantamento +5 de carisma (para vestes)", price: 500, img: "/img/maquinalavar.jpg" },
  { id: "9", name: "Fogueira de chef level 10", price: 500, img: "/img/fogao.jpg" },
  { id: "10", name: "Kit do chef level 10 (+5 de satisfação culinária)", price: 250, img: "/img/kitpanela.jpg" },
  { id: "11", name: "Vestes iti malia para pet (+10 de beleza do pet)", price: 50, img: "/img/roupinhaluke.jpg" },
  { id: "12", name: "Elemental culinário", price: 250, img: "/img/panelaeletrica.jpg" },
  { id: "13", name: "Elemental do tempo", price: 250, img: "/img/arcondicionado.jpg" },
];

export default function Merchant() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (item: Item) => {
    try {
      setLoading(item.id);

      const response = await fetch("https://weddingwebsiteapi-production.up.railway.app/api/payment/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.name,
          price: item.price,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err) {
      console.error("Erro ao iniciar compra", err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Loja de Presentes 💝
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl shadow-lg p-4 flex flex-col items-center bg-white"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600 mb-2">R$ {item.price.toFixed(2)}</p>
            <button
              onClick={() => handleBuy(item)}
              disabled={loading === item.id}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400"
            >
              {loading === item.id ? "Carregando..." : "Presentear 🎁"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
