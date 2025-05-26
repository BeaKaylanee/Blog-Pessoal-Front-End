import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('O Usuário foi desconectado com sucesso!')
        navigate('/')
    }
    
    return (
        <>
              <div className="w-full bg-indigo-900 text-white py-4">
              <div className="flex justify-between items-center px-5 text-lg font-bold">
                <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline">Postagens</a>
                        <a href="#" className="hover:underline">Temas</a>
                        <a href="#" className="hover:underline">Cadastrar tema</a>
                        <a href="#" className="hover:underline">Perfil</a>
                        <a href="#" className="hover:underline">Sair</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar