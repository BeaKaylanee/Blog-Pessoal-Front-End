import { GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                            Blog Pessoal Generation | Copyright: {data}
                        </p>
                    <p className='text-lg'>Acesse nossas redes sociais</p>
                    <div className='flex gap-2 '>
                        <a href="https://www.linkedin.com/in/beatriz-kailane-3513b5248/" target="_blank">
                            <LinkedinLogo 
                              size={48} 
                              weight='bold'
                              className="hover:text-blue-500 transform hover:-translate-y-1 transition duration-300 cursor-pointer"
                            />
                        </a>
                        <a href="https://www.instagram.com/kaylane_beaa/" target="_blank">
                            <InstagramLogo 
                              size={48} 
                              weight='bold' 
                              className="hover:text-pink-500 transform hover:-translate-y-1 transition duration-300 cursor-pointer"
                            />
                        </a>
                        <a href="https://github.com/BeaKaylanee" target="_blank">
                            <GithubLogo 
                              size={48} 
                              weight='bold'
                              className="hover:text-black transform hover:-translate-y-1 transition duration-300 cursor-pointer"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
