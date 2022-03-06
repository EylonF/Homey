import Avatar from '@mui/material/Avatar';
import { AiOutlineHome,AiOutlineWifi,AiOutlineCheckSquare } from 'react-icons/ai';
import { BiCameraHome,BiBath} from 'react-icons/bi';
import { TiKeyOutline } from 'react-icons/ti';
import { HiOutlineLocationMarker, HiOutlineSparkles } from 'react-icons/hi';
import { FiMonitor,FiSpeaker } from 'react-icons/fi';
import { FaTemperatureLow ,FaSwimmingPool} from 'react-icons/fa';
import { MdOutlineTakeoutDining,MdOutlineBeachAccess,MdOutlinePets,MdOutlineLocalLaundryService,MdOutlineElevator,MdOutlineLuggage,MdOutlineMicrowave,MdOutlineIron,MdOutlineCoffeeMaker } from 'react-icons/md';
import { CgSmartHomeWashMachine,CgSmartHomeRefrigerator } from 'react-icons/cg';
import { GiCigarette } from 'react-icons/gi';
// import { IoSparklesOutline } from 'react-icons/io';



export function StayInfo({ stay }) {

    return (
        <section className="info">
            <div className="info-header">
                <div className="info-header-title">
                    <h2>Entire {stay.type} hosted by {stay.host.fullname}</h2>
                    <p>{stay.capacity} guests ∙ {stay.rooms} ∙ {stay.beds} ∙ {stay.baths}</p>
                </div>

                <Avatar className="user-img" src={stay.host.imgUrl} />

            </div>
            <div className="info-feature">
                <div className="feature-container">
                    <div className="feature-icon">
                        <AiOutlineHome />
                    </div>
                    <div className="feature-txt">
                        <h3> Entire home</h3>
                        <p>You’ll have the apartment to yourself.</p>
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature-icon">
                        <TiKeyOutline />
                    </div>
                    <div className="feature-txt">
                        <h3>Self check-in</h3>
                        <p>Check yourself in with the keypad.</p>
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature-icon">
                        <HiOutlineLocationMarker />
                    </div>
                    <div className="feature-txt">
                        <h3>Great location</h3>
                        <p>95% of recent guests gave the location a 5-star rating.</p>
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature-icon">
                        <HiOutlineSparkles />
                    </div>
                    <div className="feature-txt">
                        <h3>Enhanced Clean</h3>
                        <p>This Host committed to Airbnb's 5-step enhanced cleaning process.</p>
                    </div>
                </div>
            </div>
            <div className="info-description">
                <h2>Description</h2>
                <p>{stay.summary}</p>
            </div>
            <div className="info-amenities">
                <h2>What this place offers</h2>
                <div className="amenities-list">
                    {stay.amenities.map((amenitie, idx) => {
                        let icon
                        switch (amenitie) {
                            case 'TV':
                                return <p key={idx}> <FiMonitor /> {amenitie}</p>
                                break;
                            case 'TV with standard cable':
                                return <p key={idx}> <FiMonitor /> {amenitie}</p>
                                break;
                            case 'Wifi':
                                return <p key={idx}> <AiOutlineWifi /> {amenitie}</p>
                                break;
                            case 'Kitchen':
                                return <p key={idx}> <MdOutlineTakeoutDining /> {amenitie}</p>
                                break;
                            case 'Cooking basics':
                                return <p key={idx}> <MdOutlineTakeoutDining /> {amenitie}</p>
                                break;
                            case 'Washer':
                                return <p key={idx}> <CgSmartHomeWashMachine /> {amenitie}</p>
                                break;
                            case 'Paid washer - In building':
                                return <p key={idx}> <CgSmartHomeWashMachine /> {amenitie}</p>
                                break;
                            case 'Beach access':
                                return <p key={idx}> <MdOutlineBeachAccess /> {amenitie}</p>
                                break;
                            case 'Beach access - Beachfront':
                                return <p key={idx}> <MdOutlineBeachAccess /> {amenitie}</p>
                                break;
                            case 'Pets allowed':
                                return <p key={idx}> <MdOutlinePets /> {amenitie}</p>
                                break;
                            case 'Sound system with aux':
                                return <p key={idx}> <FiSpeaker /> {amenitie}</p>
                                break;
                            case 'Dryer':
                                return <p key={idx}> <MdOutlineLocalLaundryService /> {amenitie}</p>
                                break;
                            case 'Security cameras on property':
                                return <p key={idx}> <BiCameraHome /> {amenitie}</p>
                                break;
                            case 'AC':
                                return <p key={idx}> <FaTemperatureLow /> {amenitie}</p>
                                break;
                            case 'Elevator':
                                return <p key={idx}> <MdOutlineElevator /> {amenitie}</p>
                                break;
                            case 'Luggage drop off allowed':
                                return <p key={idx}> <MdOutlineLuggage /> {amenitie}</p>
                                break;
                            case 'Smoking allowed':
                                return <p key={idx}> <GiCigarette /> {amenitie}</p>
                                break;
                            case 'Bathtub':
                                return <p key={idx}> <BiBath /> {amenitie}</p>
                                break;
                            case 'Refrigerator':
                                return <p key={idx}> <CgSmartHomeRefrigerator /> {amenitie}</p>
                                break;
                            case 'Microwave':
                                return <p key={idx}> <MdOutlineMicrowave /> {amenitie}</p>
                                break;
                            case 'Pool':
                                return <p key={idx}> <FaSwimmingPool /> {amenitie}</p>
                                break;
                            case 'Iron':
                                return <p key={idx}> <MdOutlineIron /> {amenitie}</p>
                                break;
                            case 'Coffee maker':
                                return <p key={idx}> <MdOutlineCoffeeMaker /> {amenitie}</p>
                                break;

                            default:
                                return <p key={idx}><AiOutlineCheckSquare/> {amenitie}</p>
                                break;
                        }
                    })}
                </div>
            </div>
        </section>
    )
}