import { Link } from 'react-router-dom'
import type Tema from '../../models/Tema'

interface CardTemasProps {
  tema: Tema
}

function CardTemas({ tema }: CardTemasProps) {
  return (
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between w-full max-w-sm shadow-md bg-white">
      <header className="py-4 px-6 bg-indigo-800 text-white font-bold text-2xl text-center">
        Tema
      </header>

      <p className="p-6 text-xl text-gray-800 bg-slate-200 flex-1">
        {tema.descricao}
      </p>

      <div className="flex divide-x divide-white">
        <Link
          to={`/editartema/${tema.id}`}
          className="w-1/2 bg-indigo-500 hover:bg-indigo-700 text-white text-center py-2"
        >
          Editar
        </Link>

        <Link to={`/deletartema/${tema.id}`}
          className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
		        flex items-center justify-center'>
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardTemas
