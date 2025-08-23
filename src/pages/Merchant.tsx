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
  { id: "15", name: "Bala fini", price: 5, description: "Fini, não fine", img: "/img/fini.jpg" },
];

export default function Merchant() {
  const [loading, setLoading] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif quest-title mb-4">
            Presentes para o Casal
          </h1>
          <p className="text-lg sm:text-xl mb-4 sm:mb-6">
            Ajude Kevin & Pâmela a reunir itens essenciais para sua nova aventura
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gradient-to-tr 
                            from-[rgba(17,17,17,0.5)] 
                            via-[rgba(255,187,0,0.5)] 
                            to-[rgba(17,17,17,0.5)] 
                            border-2 border-[#ffbb00] rounded-xl
                            hover:scale-105 transition-transform duration-300 cursor-pointer
                            group h-full flex flex-col"
              >
                <div className="p-4 sm:p-6 flex flex-col flex-grow">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2
                    className="text-lg sm:text-xl font-bold mb-0 text-[rgba(255,145,0,1)] bg-[rgba(255,238,0,0.25)] rounded-t-lg p-2"
                    style={{ textShadow: '0 0 5px #0000006c, 0 0 10px #0000006c, 0 0 20px #0000006c', lineHeight: 1 }}
                  >
                    {item.name}
                  </h2>
                  <p
                    className="text-sm sm:text-base text-white flex-grow bg-[rgba(255,255,255,0.25)] rounded-b-lg p-2 mt-0 leading-tight"
                  >
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="px-3 py-2 rounded-lg text-sm sm:text-base w-full text-center
                                      drop-shadow-lg" style={{ textShadow: '0 0 5px #0000006c, 0 0 10px #0000006c, 0 0 20px #0000006c', lineHeight: 1 }}>
                      <p>R${item.price},00</p>
                    </span>
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setModalOpen(true);
                      }}
                      disabled={loading === item.id}
                      className="purchase-button w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition disabled:bg-gray-400"
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

      {modalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Deseja sinalizar os noivos?</h2>
            <p className="mb-4">Informe seu nome e e-mail para que possamos notificar os noivos sobre sua compra.</p>

            <input
              type="text"
              placeholder="Seu nome"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Seu e-mail"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={async () => {
                  if (!guestName || !guestEmail) {
                    alert("Preencha nome e e-mail!");
                    return;
                  }

                  try {
                    await fetch("https://weddingwebsiteapi-production.up.railway.app/api/payment/confirmPurchase", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        Name: guestName,
                        Email: guestEmail,
                        Attending: false,
                        ItemName: selectedItem.name
                      }),
                    });
                  } catch (err) {
                    console.error("Erro ao notificar os noivos", err);
                  }

                  if (selectedItem) {
                    handleBuy(selectedItem);
                  }

                  setModalOpen(false);
                  setGuestName('');
                  setGuestEmail('');
                }}
                className="px-4 py-2 rounded bg-blue-500 text-white"
              >
                Confirmar e Comprar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
