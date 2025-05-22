
function Home() {
    return (
        <>
            <div className="bg-indigo-900 flex justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja Bem Vinde!
                        </h2>
                        <p className='text-xl'>
                            Expresse aqui seus pensamentos e opniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <button className='rounded text-white cursor-not-allowed md:cursor-auto
                                            border-white border-solid border-2 py-2 px-4
                                            transform hover:-translate-y-1 
                                            transition-colors duration-500 ease-in-out
                                            hover:bg-repeat-x hover:bg-purple-700'
                                >
                                Nova Postagem
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center ">
                    <img
                      src="https://i.imgur.com/fyfri1v.png"
                      alt="Imagem Página Home"
                      className="w-4/4object-contain"
                    />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;