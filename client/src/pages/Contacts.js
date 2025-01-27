import { useEffect, useRef, useState } from "react";
import style from './styles/ContactsStyle.module.scss';
import TwoBlocks from "../components/animation/TwoBlocks";
import Footer from "../components/footer/Footer";
import SmallHeader from "../components/newheader/SmallHeader";
import MyMap from "../components/map/Map";
import WriteModal from "../components/modalwin/WriteModal";
import PostContact from "../components/forms/PostContact";
import {useMessage} from "../hooks/message.hook";
import NewsService from "../services/NewsService";

function Contacts() {
    const [activemodal, setActivemodal] = useState(false);
    const [data, setData] = useState('');
    const [people, setPeople] = useState([]);
    const [allCity, setAllCity] = useState([]);

    const getCities = async () => {
        try{
            const {data} = await NewsService.getCities({capter: 'omedia'})
            setAllCity(data)
        }catch(e){
            console.log(e)
        }
    }

    const getMans = async () => {
        try {
            const { data } = await NewsService.getAUP();

            // Сортировка по priory от меньшего к большему
            const sortedData = data.sort((a, b) => a.priory - b.priory);

            // Установка отсортированных данных в состояние
            setPeople(sortedData);

            console.log(sortedData);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=>{
        getMans()
        getCities()
    },[])


    return (
        <div className={style.bodymain}>
            <WriteModal activemodal={activemodal} setActivemodal={setActivemodal} data={<PostContact man={data}  setActivemodal={setActivemodal}/>} setData={setData} />
            <SmallHeader />
            <TwoBlocks />
            <div className={style.listpersonal}>
                <div className={style.title}>КОНТАКТЫ</div>
                <div className={style.list}>
                    {people.map((man, index) => (
                        <div
                            className={style.blockman}
                            key={index}
                            // ref={(el) => blockRefs.current[index] = el}
                        >
                            <div className={style.photo} style={(man.image.length > 0)?{backgroundImage: `url('${process.env.REACT_APP_API_URL}${man.image}')`}:{}}></div>
                            <div className={style.fio}>
                                <div className={style.name}>{man.firstname}</div>
                                <div className={style.name}>{man.secondname}</div>
                                <div className={style.name}>{man.lastname}</div>
                            </div>
                            <div className={style.dev}>{man.developers}</div>
                            <div className={style.btncontact} onClick={() => {setActivemodal(true);setData(man)}}>Написать</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={style.contacts}>
                <div className={style.ontheleft}>
                    <div className={style.container50}>
                        <div className={style.strock}>адрес</div>
                        {(allCity[0])&&allCity[0].adress.map((adress, indexAdress)=>(
                            <div key={indexAdress} className={style.strock}>{adress}</div>
                        ))}
                    </div>
                </div>
                <div className={style.ontheright}>
                    <div className={style.container50}>
                        <div className={style.strock}>Контакты</div>
                        {(allCity[0])&&allCity[0].phone.map((phone, indexphone)=>(
                            <div key={indexphone} className={style.strock}>{phone}</div>
                        ))}
                        {(allCity[0])&&allCity[0].email.map((email, indexemail)=>(
                            <div key={indexemail} className={style.strock}>{email}</div>
                        ))}
                    </div>
                </div>
            </div>
            <MyMap  mapw={(allCity[0])?allCity[0].mapw:'61.249149'} maph={(allCity[0])?allCity[0].maph:'73.429279'}/>
            <Footer />
        </div>
    );
}

export default Contacts;