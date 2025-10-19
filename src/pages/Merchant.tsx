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

    const eventSource = new EventSource("https://weddingwebsiteapi-production.up.railway.app/api/payment/events");

    eventSource.onmessage = (event) => {
      const updatedItem = JSON.parse(event.data);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id ? { ...item, available: false, buyer: updatedItem.buyer } : item
        )
      );
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
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
          ItemId: item.id,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err) {
      console.error("Erro ao processar a compra", err);
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
          <p className="text-sm mb-4 sm:mb-6">
            *Por nossa loja você consegue realizar o pagamento via cartão de crédito, boleto ou pix, mas se deseja comprar por uma loja de sua preferência, entre em contato em nosso whatsapp.
          </p>
          {isLoadingItems ? (
            <p className="text-white">Carregando itens...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gradient-to-br from-[rgba(214,171,79,1) via-[rgba(222,162,35,1)] to-[rgba(180,139,48,1)] border-4 border-[rgba(248,185,83,1)] rounded-xl hover:scale-105 transition-transform duration-300 cursor-pointer w-64 h-96 flex flex-col justify-between shadow-lg"
                >
                  {/* Parte superior: imagem do item */}
                  <div className="w-full h-40 bg-white rounded-sm border border-yellow-400 shadow-md rounded-xl overflow-hidden">
                    <img
                      src={item.uri || "/img/default.jpg"}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Faixa dourada abaixo da imagem com nome */}
                  <div className="w-[80%] bg-[rgba(0,0,0,0.15)] self-center mt-2 rounded-sm shadow-md">
                    <h2 className="text-sm font-bold text-black bg-[rgba(255,255,255,0.25)] rounded-t-md px-2 py-1 text-center break-words whitespace-normal leading-tight">
                      {item.name}
                    </h2>
                  </div>

                  {/* Descrição */}
                  <div className="px-2 mt-2">
                    <p className="text-xs text-white bg-[rgba(0,0,0,0.25)] rounded-b-md px-2 py-1 mt-0 leading-snug line-clamp-3" style={{ textShadow: '0 0 5px #0000006c' }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Linha preta (como separador) */}
                  <div className="border-t border-black mx-2 my-2"></div>

                  {/* Parte inferior: preço + botão */}
                  <div className="px-2 pb-2 flex flex-col gap-2">
                    {item.available ? (
                      <>
                        <span className="text-sm text-black text-center" style={{ textShadow: '0 0 5px #0000006c', lineHeight: 1 }}>
                          R${item.price},00
                        </span>
                        <button
                          onClick={() => handleBuy(item)}
                          disabled={loading === item.id}
                          className="bg-[rgba(69,94,46,1)] hover:bg-[rgba(0,0,0,1)] text-white text-xs py-1 px-2 rounded-md transition disabled:bg-gray-400"
                        >
                          {loading === item.id ? "Carregando..." : "Presentear 🎁"}
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-white text-center bg-gray-600 px-2 py-1 rounded-md">
                        {item.buyer?.trim() ? (
                          <>Já presenteado por: <strong>{item.buyer}</strong></>
                        ) : (
                          <>Já presenteado</>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
