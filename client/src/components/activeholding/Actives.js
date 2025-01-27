import style from './ActivesStyle.module.scss'
import {useEffect} from "react";
import {useState} from "react";
import OpenNews from "../news/OpenNews";
import BigModal from "../modalwin/BigModal";
import ShowActives from "./ShowActives";
import NewsService from "../../services/NewsService";

function Actives (){

    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')

    const actvholding = [
        {
            name: 'radio',
            actives: [
                'Радио дача',
                'LOVE радио',
                'Русский хит',
                'Авто радио',
                'NRJ'
            ]
        },
        {
            name: 'tv',
            actives: [
                '24 Сургут',
                '360'
            ]
        },
        {
            name: 'internet',
            actives: [
                'О, Сургут! VK.COM',
                'OMEDIA! Югра VK.COM',
                'Новости. Сургут 24 VK.COM',
                'Подслушано в Сургуте VK.COM',
                'Новости.  Сургут 24 OK.RU',
                'OMEDIA! | Сургут 24| О, Сургут! Telegram',
                'Сургут 24 YOUTUBE'
            ]
        },
        {
            name: 'marketing',
            actives: [
                ''
            ]
        },
        {
            name: 'more',
            actives: [
                ''
            ]
        },

    ]

    const getLines = async () => {

    }

    const openACTV = async (index) => {
        const places = ['radio','tv','cifra','pr','more']
        try{
            const {data} = await NewsService.getPlaces({act: places[index]})
            console.log(data)
            if(data){
                setActivemodal(true)
                setData(data)
            }
        }catch(e){
            console.log(e)
        }


    }

    useEffect(() => {
        // Check if there's a hash in the URL
        const hash = window.location.hash;
        if (hash) {
            // Scroll to the element with the id matching the hash
            const element = document.getElementById(hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, []); // Empty dependency array ensures this runs only on component mount

    return(
        <div className={style.main} id='activegroup'>
            <BigModal data={<ShowActives actvs={data}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <div className={style.container}>
                <div className={style.blocks}>
                    <div className={style.one} onClick={()=>openACTV(0)}>
                        <div className={style.left}>
                            <div className={style.next}></div>
                        </div>
                        <div className={style.right}>
                            <div className={style.text}>Радио</div>
                        </div>
                    </div>
                    <div className={style.two}>
                        <div className={style.block} onClick={()=>openACTV(1)}>
                            <div className={style.left}>
                                <div className={style.next}></div>
                            </div>
                            <div className={style.right}>
                                <div className={style.text}>Телевидение</div>
                            </div>
                        </div>
                        <div className={style.block} onClick={()=>openACTV(2)}>
                            <div className={style.left}>
                                <div className={style.next}></div>
                            </div>
                            <div className={style.right}>
                                <div className={style.text}>Цифровые платформы</div>
                            </div>
                        </div>
                    </div>
                    <div className={style.three} onClick={()=>openACTV(3)}>
                        <div className={style.left}>
                            <div className={style.next}></div>
                        </div>
                        <div className={style.right}>
                            <div className={style.text}>Реклама и Маркетинг</div>
                        </div>
                    </div>
                    <div className={style.four} onClick={()=>openACTV(4)}>
                        <div className={style.left}>
                            <div className={style.next}></div>
                        </div>
                        <div className={style.right}>
                            <div className={style.text}>Другие<br/> активы</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Actives