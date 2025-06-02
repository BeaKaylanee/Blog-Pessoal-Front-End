import { Link } from "react-router-dom";
import { UserCircle } from "@phosphor-icons/react";
import type Postagem from "../../../models/Postagem";

interface CardPostagensProps {
  postagem: Postagem;
}

function CardPostagem({ postagem }: CardPostagensProps) {
  const nomeUsuario = postagem.usuario?.nome || "Usuário desconhecido";
  const fotoUsuario = postagem.usuario?.foto;

  return (
    <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          {fotoUsuario ? (
            <img
              src={fotoUsuario}
              className="h-12 w-12 rounded-full object-cover"
              alt={nomeUsuario}
            />
          ) : (
            <UserCircle size={48} className="text-white" />
          )}
          <h3 className="text-lg font-bold text-white uppercase">
            {nomeUsuario}
          </h3>
        </div>

        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">{postagem.titulo}</h4>
          <p>{postagem.texto}</p>
          <p className="italic text-sm text-gray-600">
            Tema: {postagem.tema?.descricao}
          </p>
          <p className="text-sm text-gray-500">
            Data:{" "}
            {new Intl.DateTimeFormat(undefined, {
              dateStyle: "full",
              timeStyle: "medium",
            }).format(new Date(postagem.data))}
          </p>
        </div>
      </div>

      <div className="flex">
        <Link
          to={`/editarpostagem/${postagem.id}`}
          className="w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarpostagem/${postagem.id}`}
          className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center py-2"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardPostagem;
