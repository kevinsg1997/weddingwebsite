import { useState } from "react";
import '../styles/merchant.css';

type Item = {
  id: string;
  name: string;
  price: number;
  description: string;
  img: string;
};

const items: Item[] = [
  { id: "1", name: "Passagem da carruagem real", price: 300, description: "Nova aventura garantida para Kevin & Pâmela.", img: "/img/carruagem.jpg" },
  { id: "2", name: "Entrada para o rodizio da realeza", price: 180, description: "O rodizio mais esperado de todo o reino (Arco-Iris).", img: "/img/buffet.jpg" },
  { id: "3", name: "Objeto inanimado (+4 para ambiente)", price: 100, description: "Um objeto sem nada muito especial, mas causa conforto aos olhos.", img: "/img/decoracao.jpg" },
  { id: "4", name: "Vassoura com encontamento de vento", price: 250, description: "Uma vassoura incrível, capaz de limpar as sujeiras mais dificeis.", img: "/img/aspirador.jpg" },
  { id: "5", name: "Kit de recuperação de estâmina", price: 50, description: "Após uma boa aventura é sempre bom se recuperar!", img: "/img/ressaca.jpg" },
  { id: "6", name: "Poção de estâmina extra", price: 50, description: "Para aventuras com longa duração!", img: "/img/monster.jpg" },
  { id: "7", name: "Poção de vida", price: 50, description: "Ajuda os aventureiros a se prepararem para a aventura.", img: "/img/cafe.jpg" },
  { id: "8", name: "Encantamento +5 de carisma (para vestes)", price: 500, description: "Nada como uma veste limpa e cheirosa!", img: "/img/maquinalavar.jpg" },
  { id: "9", name: "Fogueira de chef level 10", price: 500, description: "Somente os chefs mais cobiçados sabem utilizá-la.", img: "/img/fogao.jpg" },
  { id: "10", name: "Kit do chef level 10 (+5 de satisfação culinária)", price: 250, description: "Dizem que ajuda no preparo, mas o que importa é a habilidade.", img: "/img/kitpanela.jpg" },
  { id: "11", name: "Vestes iti malia para pet (+10 de beleza do pet)", price: 50, description: "Ajude o pet dos aventureiros a estar preparado para toda jornada!", img: "/img/roupinhaluke.jpg" },
  { id: "12", name: "Elemental culinário", price: 250, description: "O quê? Um objeto que cozinha sozinho?", img: "/img/panelaeletrica.jpg" },
  { id: "13", name: "Elemental do tempo", price: 450, description: "Apesar de não controlar a velocidade do tempo, ele pode deixar o ambiente mais fresco.", img: "/img/arcondicionado.jpg" },
  { id: "14", name: "Elemental da aguá", price: 350, description: "Tem força extra contra os indesejados musgos.", img: "/img/wap.jpg" },
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
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4">
            Presentes para o Casal
          </h1>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6">
            Ajude Kevin & Pâmela a reunir itens essenciais para sua nova aventura
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="parchment-bg quest-border hover:scale-105 transition-transform duration-300 cursor-pointer group h-full flex flex-col"
              >
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="font-serif text-lg sm:text-xl font-bold mb-2">{item.name}</h2>
                  <p className="text-sm sm:text-base text-gray-700 flex-grow">{item.description}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="bg-gray-400 px-3 py-2 rounded-lg font-bold text-sm sm:text-base w-full text-center">
                      <p>R${item.price},00 💰</p>
                    </span>
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={loading === item.id}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition disabled:bg-gray-400"
                    >
                      {loading === item.id ? "Carregando..." : "Presentear 🎁"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}