export default function Home() {
  return (
    <div className="w-auto h-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start p-4 gap-4">
        <img
          className="w-1/4 h-1/4 md:w-1/4 md:h-1/4 rounded-full object-cover"
          src="/src/imgs/mage.png"
          alt="Mago"
        />
        <div className="flex-1 text-left">
          <h1 className="text-white text-base md:text-lg">
            Merlin, o mago:
          </h1>
          <br/>
          <p className="text-white text-base md:text-lg">
            Olá aventureiro(a)! É muito bom ver você por aqui!<br/>
            Você recebeu uma missão muito importe, deseja aceitar? Fique ciente que estará 
            embarcando em uma nova aventura!
          </p>
        </div>
      </div>
    </div>
  );
}