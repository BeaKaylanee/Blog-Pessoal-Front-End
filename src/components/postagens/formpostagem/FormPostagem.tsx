import { useState, useContext, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import type Tema from "../../../models/Tema";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormPostagem() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [isLoading, setIsLoading] = useState(false);
  const [temas, setTemas] = useState<Tema[]>([]);

  const [postagem, setPostagem] = useState<Postagem>({
    titulo: "",
    texto: "",
  } as Postagem);

  const [tema, setTema] = useState<Tema>({ id: 0, descricao: "" });

  async function buscarPostagemPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setPostagem, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarTemas() {
    try {
      await buscar("/temas", setTemas, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarTemas();
    if (id !== undefined) {
      buscarPostagemPorId(id);
    }
  }, [id]);

  useEffect(() => {
    if (postagem.tema) {
      setTema(postagem.tema);
    }
  }, [postagem]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [e.target.name]: e.target.value,
    });
  }

  function selecionarTema(e: ChangeEvent<HTMLSelectElement>) {
    const idTema = Number(e.target.value);
    const temaSelecionado = temas.find((t) => t.id === idTema);
    if (temaSelecionado) {
      setTema(temaSelecionado);
    } else {
      setTema({ id: 0, descricao: "" });
    }
  }

  function retornar() {
    navigate("/postagens");
  }

  async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
  
    const postagemParaEnviar = {
      titulo: postagem.titulo,
      texto: postagem.texto,
      tema: {
        id: tema.id,
      },
    };
  
    try {
      if (id !== undefined) {
        await atualizar(`/postagens`, { ...postagemParaEnviar, id: Number(id) }, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Postagem atualizada com sucesso", "sucesso");
      } else {
        await cadastrar(`/postagens`, postagemParaEnviar, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        ToastAlerta("Postagem cadastrada com sucesso", "sucesso");
      }
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta(
          id !== undefined
            ? "Erro ao atualizar a Postagem!"
            : "Erro ao cadastrar a Postagem!",
          "erro"
        );
      }
    } finally {
      setIsLoading(false);
      retornar();
    }
  }
  

  const carregandoTema = tema.id === 0;

  return (
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Postagem" : "Cadastrar Postagem"}
      </h1>

      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaPostagem}>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo">Título da Postagem</label>
          <input
            type="text"
            placeholder="Título"
            name="titulo"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.titulo ?? ""}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="texto">Texto da Postagem</label>
          <input
            type="text"
            placeholder="Texto"
            name="texto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={postagem.texto ?? ""}
            onChange={atualizarEstado}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tema">Tema da Postagem</label>
          <select
            name="tema"
            id="tema"
            className="border p-2 border-slate-800 rounded"
            onChange={selecionarTema}
            value={tema.id === 0 ? "" : tema.id.toString()}
          >
            <option value="" disabled>
              Selecione um Tema
            </option>

            {temas.map((temaItem) => (
              <option key={temaItem.id} value={temaItem.id}>
                {temaItem.descricao}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={carregandoTema || isLoading}
          className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                             text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormPostagem;
