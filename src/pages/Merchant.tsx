import { useState, useEffect } from "react";
import '../styles/merchant.css';

type Item = {
  id: string;
  createdAt: string;
  updatedAt?: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  buyer?: string;
  uri?: string;
  deleted: boolean;
};

export default function Merchant() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const [isLoadingItems, setIsLoadingItems] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://weddingwebsiteapi-production.up.railway.app/api/PurchaseItem/not-deleted");
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Erro ao buscar itens da loja:", error);
      } finally {
        setIsLoadingItems(false);
      }
    };

    fetchItems();
  }, []);

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

          {isLoadingItems ? (
            <p className="text-white">Carregando itens...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-tr from-[rgba(17,17,17,0.5)] via-[rgba(211,155,0,0.5)] to-[rgba(17,17,17,0.5)] 
                            border-2 border-[#ffbb00] rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer
                            group h-full flex flex-col"
                >
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <img
                      src={item.uri || "/img/default.jpg"}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h2
                      className="text-lg sm:text-xl font-bold mb-0 text-[rgba(255,238,0,1)] bg-[rgba(255,238,0,0.25)] rounded-t-lg p-2"
                      style={{ textShadow: '0 0 5px #0000006c', lineHeight: 1 }}
                    >
                      {item.name}
                    </h2>
                    <p
                      className="text-sm sm:text-base text-white flex-grow bg-[rgba(255,255,255,0.25)] rounded-b-lg p-2 mt-0 leading-tight drop-shadow-lg"
                      style={{ textShadow: '0 0 5px #0000006c' }}
                    >
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-col gap-2">
                      {item.available ? (
                        <>
                          <span className="px-3 py-2 rounded-lg text-sm sm:text-base w-full text-center text-[rgba(255,238,0,1)] drop-shadow-lg"
                                style={{ textShadow: '0 0 5px #0000006c', lineHeight: 1 }}>
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
                        </>
                      ) : (
                        <span className="px-3 py-2 rounded-lg text-sm sm:text-base w-full text-center text-white bg-gray-600">
                          Já presenteado por: <strong>{item.buyer || "Convidado(a)"}</strong>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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