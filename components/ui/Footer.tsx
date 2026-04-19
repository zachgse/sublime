import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
    return (
        <div className="w-full py-16 bg-linear-to-r from-[#34241c] to-[#261b13] text-[#ebded6] relative">
            <div className="px-4 lg:px-40 flex w-full gap-12">
                <div className="w-2/3 border-r border-[#ebded6] flex flex-col gap-2 px-4">
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className='w-4'/>
                        Lot 2-A-1 B Marcos Alvarez Ave, Las Piñas, 1747 Metro Manila
                    </div>     
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className='w-4'/>
                        Everyday @ 10 am - 10 pm
                    </div> 
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faEnvelope} className='w-4'/>
                        sublimecafeph@gmail.com
                    </div>                 
                </div>
                <div className="w-1/3  flex flex-col gap-2 px-4">
                    <p>Follow us on</p>
                    <div className="flex gap-3">
                        <a href="https://www.facebook.com/profile.php?id=61576246773112" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} className='w-6'/>
                        </a>
                        <a href="https://www.instagram.com/sublimecafeph/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} className='w-6'/>
                        </a>
                        <a href="https://www.tiktok.com/@sublimecafe" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTiktok} className='w-6'/>
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-12"/>
            <p className="text-center absolute bottom-4 left-0 right-0">
                © Sublime Cafe 2026. All Rights Reserved
            </p>
        </div>
    )
}