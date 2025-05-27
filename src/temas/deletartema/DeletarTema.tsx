import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import type Tema from "../../models/Tema"
import { buscar, deletar } from "../../services/Services"
import { RotatingLines } from "react-loader-spinner"

function DeletarTema() {
  const navigate = useNavigate()

  const [tema, setTema] = useState<Tema>({} as Tema)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  const { id } = useParams<{ id: string }>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/temas/${id}`, setTema, {
        headers: {
          Authorization: token,
        },
      })
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado")
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  async function deletarTema() {
    setIsLoading(true)

    try {
      await deletar(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      })

      alert("Tema apagado com sucesso")
      retornar()
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout()
      } else {
        alert("Erro ao deletar o tema.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  function retornar() {
    navigate("/temas")
  }

  return (
    <div className="container max-w-md mx-auto p-6">
      <h1 className="text-4xl text-center mb-8 font-semibold text-gray-900">
        Deletar tema
      </h1>

      <p className="text-center text-lg font-medium mb-6 text-gray-700">
        Você tem certeza de que deseja apagar o tema a seguir?
      </p>

      <div className="border rounded-2xl shadow-lg overflow-hidden">
        <header className="bg-indigo-600 text-white text-2xl font-bold py-3 px-6">
          Tema
        </header>

        <p className="bg-gray-100 p-8 text-xl min-h-[100px] flex items-center justify-center text-gray-800">
          {tema.descricao || "Carregando..."}
        </p>

        <div className="flex gap-2">
          <button
            onClick={retornar}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-bl-2xl transition-colors"
          >
            Não
          </button>

          <button
            onClick={deletarTema}
            disabled={isLoading}
            className="w-1/2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-br-2xl flex justify-center items-center transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeletarTema
