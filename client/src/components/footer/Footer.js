import style from './FooterStyle.module.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import NewsService from "../../services/NewsService";

function Footer (){

    const [data, setData] = useState('')
    const [thisContacts, setThisContacts] = useState([]);
    const getCities = async () => {
        try{
            const {data} = await NewsService.getCities({capter: 'omedia'})
            setThisContacts(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getCities()
    }, [])

    return(
        <div className={style.main}>
            <div className={style.omediawater}></div>
            <div className={style.omedia}></div>
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.upper}>
                        <div className={style.column}>
                            {/*<div className={style.point}>*/}
                            {/*    <div className={style.next}></div>*/}
                            {/*    <div className={style.text}>О нас</div>*/}
                            {/*</div>*/}
                            <Link to='/activegroup' className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Активы группы</div>
                            </Link>
                            <Link to='/allnews'  className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Новости</div>
                            </Link>
                        </div>
                        {/*<div className={style.column}>*/}
                        {/*    <div className={style.point}>*/}
                        {/*        <div className={style.next}></div>*/}
                        {/*        <div className={style.text}>Стратегические приоритеты</div>*/}
                        {/*    </div>*/}
                        {/*    <div className={style.point}>*/}
                        {/*        <div className={style.next}></div>*/}
                        {/*        <div className={style.text}>История</div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={style.column}>
                            <Link to='/contacts'  className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Контакты</div>
                            </Link>
                            <Link to='/vakansii'  className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Вакансии</div>
                            </Link>
                        </div>
                    </div>
                    <div className={style.uppermobile}>
                            {/*<div className={style.point}>*/}
                            {/*    <div className={style.next}></div>*/}
                            {/*    <div className={style.text}>О нас</div>*/}
                            {/*</div>*/}
                            <Link to={'/activegroup'} className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Активы группы</div>
                            </Link>
                            <Link to={'/allnews'} className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Новости</div>
                            </Link>
                            {/*<div className={style.point}>*/}
                            {/*    <div className={style.next}></div>*/}
                            {/*    <div className={style.text}>Стратегические приоритеты</div>*/}
                            {/*</div>*/}
                            {/*<div className={style.point}>*/}
                            {/*    <div className={style.next}></div>*/}
                            {/*    <div className={style.text}>История</div>*/}
                            {/*</div>*/}
                            <Link to={'/contacts'} className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Контакты</div>
                            </Link>
                            <Link to={'/vakansii'} className={style.point}>
                                <div className={style.next}></div>
                                <div className={style.text}>Вакансии</div>
                            </Link>
                    </div>
                </div>
                <div className={style.contacts}>
                    <div className={style.data} style={{display: 'flex' ,flexDirection: 'column', alignItems: 'flex-end'}}>
                        {(thisContacts[0])&&thisContacts[0].adress.map((adress, indexCity1) => (
                            <div key={indexCity1} className={style.adress}>{(adress)&&adress}</div>
                        ))}
                        {(thisContacts[0])&&thisContacts[0].phone.map((phone, indexCity2) => (
                            <div key={indexCity2} className={style.phone}>{(phone)&&phone}</div>
                        ))}
                        {(thisContacts[0])&&thisContacts[0].email.map((email, indexCity2) => (
                            <div key={indexCity2} className={style.phone}>{(email)&&email}</div>
                        ))}
                    </div>
                    <div className={style.sociality}>
                        <a href={(thisContacts[0])?thisContacts[0].youtube:''} target="_blank" rel="noopener noreferrer" style={(thisContacts[0] && thisContacts[0].youtube.length === 0)?{display:'none'}:{}}><img src="/files/sociality/youtube.png" alt=""/></a>
                        <a href={(thisContacts[0])&&thisContacts[0].telegram} target="_blank" rel="noopener noreferrer" style={(thisContacts[0] && thisContacts[0].telegram.length === 0)?{display:'none'}:{}}><img src="/files/sociality/telegram.png" alt="" height='71px'/></a>
                        <a href={(thisContacts[0])&&thisContacts[0].vk} target="_blank" rel="noopener noreferrer" style={(thisContacts[0] && thisContacts[0].vk.length === 0)?{display:'none'}:{}}><img src="/files/sociality/vk.png" alt=""/></a>
                        <a href={(thisContacts[0])&&thisContacts[0].ok} target="_blank" rel="noopener noreferrer" style={(thisContacts[0] && thisContacts[0].ok.length === 0)?{display:'none'}:{}}><img src="/files/sociality/ok.png" alt=""/></a>

                        {/*<img src="/files/sociality/telegram.png" alt="" height='71px'/>*/}
                        {/*<img src="/files/sociality/youtube.png" alt=""/>*/}
                        {/*<img src="/files/sociality/vk.png" alt=""/>*/}
                        {/*<img src="/files/sociality/ok.png" alt=""/>*/}
                    </div>
                    <div className={style.autor}>
                        <div className={style.copyright}>

                        </div>
                        <div className={style.description}>
                            <div className={style.text}>"Сетевое издание "ОМЕДИА!"</div>
                            <div className={style.text}>Все права защищены</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer