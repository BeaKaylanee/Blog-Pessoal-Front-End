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
                        <Link to='/temas' className='hover:underline'>Temas</Link>
                        <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link> 
                         Perfil
                        <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar