import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import imagemPadrao from "../../assets/Perfil.webp"
import { AuthContext } from "../../contexts/AuthContext"

function Perfil() {
    const navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            alert("Você precisa estar logado")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="flex justify-center mx-4">
            <div className="container mx-auto my-4 rounded-2xl overflow-hidden">
                <img
                    className="w-full h-72 object-cover border-b-8 border-white"
                    src="https://i.imgur.com/ZZFAmzo.jpg"
                    alt="Capa do Perfil"
                />

                <img
                    className="w-32 h-32 rounded-full object-cover mx-auto mt-[-4rem] border-4 border-white z-10 relative"
                    src={usuario.foto || imagemPadrao}
                    alt={`Foto de perfil de ${usuario.nome}`}
                />

                <div
                    className="relative mt-[-6rem] h-72 flex flex-col 
                    bg-sky-500 text-white text-2xl items-center justify-center"
                >
                    <p>Nome: {usuario.nome} </p>
                    <p>Email: {usuario.usuario}</p>
                </div>
            </div>
        </div>
    )
}

export default Perfil
