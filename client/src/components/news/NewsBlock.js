import style from './NewsBlockStyle.module.scss'
import {useEffect, useState} from "react";
import BigModal from "../modalwin/BigModal";
import OpenCompany from "../groupcompany/OpenCompany";
import OpenNews from "./OpenNews";
import {Link} from "react-router-dom";
import NewsService from "../../services/NewsService";

function NewsBlock () {

    const [start, setStart] = useState(0)
    const slash = [1,2,3,4]
    const [comas, setComas] = useState(1)
    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')
    const [step, setStep] = useState(0)
    const [news, setNews]=useState([])
    const localDateTime = new Date().toLocaleString('sv-SE', { timeZoneName: 'short' });
    const ActiveNews = (active, comaactv) =>{
        setStart(active)
        setComas(comaactv)
    }

    const openNews = (post) => {
        setActivemodal(true)
        setData(post)
    }



    const viewPost = async () => {
        console.log('здесь заходит в функцию');
        try {
            const { data } = await NewsService.viewPost();
            console.log(data);

            const filteredData = data.filter(item => {
                const localPublishDateTime = convertToLocalTime(item.publishDateTime, 5);
                return (
                    item.public.some(company => company.name === "OMEDIA!" && company.active === true) &&
                    localPublishDateTime <= localDateTime
                );
            });

            const sortedData = filteredData.sort((a, b) => {
                // Берем newsDateTime, если оно есть, иначе createdAt
                const dateA = new Date(a.newsDateTime || a.createdAt).getTime();
                const dateB = new Date(b.newsDateTime || b.createdAt).getTime();

                // Сортируем по убыванию
                return dateB - dateA;
            });

            setNews(sortedData);
        } catch (e) {
            console.error(e);
        }
    };


    const reversNews = (ch)=>{
        const arrnews = [...news]
        if (ch === 'next'){
            if(step+1 > arrnews.length-1){
                setStep(0)
            }else{
                setStep(step+1)
            }
        }
        if(ch === 'last'){
            if(step-1 < 0){
                setStep(arrnews.length - 1)
                console.log(step)
            }else{
                setStep(step-1)
                console.log(step)
            }
        }
    }
    function convertToLocalTime(utcDate, offsetHours) {
        // Преобразуем строку в объект Date
        const date = new Date(utcDate);

        // Получаем локальное время с учетом часового пояса
        const localTime = new Date(date.getTime());

        // Форматируем в нужный вид
        const year = localTime.getUTCFullYear();
        const month = String(localTime.getUTCMonth() + 1).padStart(2, '0');
        const day = String(localTime.getUTCDate()).padStart(2, '0');
        const hours = String(localTime.getUTCHours() + offsetHours).padStart(2, '0');
        const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(localTime.getUTCSeconds()).padStart(2, '0');

        // Создаём строку в формате "YYYY-MM-DD HH:mm:ss+TZ"
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+${String(offsetHours).padStart(2, '0')}`;
        return formattedDate;
    }
    useEffect(()=>{
        viewPost()
        console.log(process.env.REACT_APP_API_URL)
    },[])


    return(
        <div className={style.main}>
            <BigModal data={<OpenNews news={data}  width={'900px'}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <div className={style.container}>
                <div className={style.title}>Новости</div>
                <div className={style.news}>
                    <div className={style.nextbtn} onClick={()=>reversNews('last')}><div className={style.turnnext}></div></div>
                    {news.map((elem, index)=>{

                            if(step+3 > index && index>=step){
                                return(
                                    <div key={index} className={style.news_block} onClick={()=>openNews(elem)}>
                                        <div className={style.img} style={{backgroundImage: `url('${process.env.REACT_APP_API_URL}${elem.image}')`}}></div>
                                        <div className={style.date}>{(elem.newsDateTime)?elem.newsDateTime.slice(0, 10).split('-').reverse().join('.'):(elem.createdAt)&&elem.createdAt.slice(0, 10).split('-').reverse().join('.')}</div>
                                        <div className={style.name}>{(elem.title.length > 140)?elem.title.slice(0, 140) + '...':elem.title}</div>
                                        <div className={style.active}></div>
                                    </div>
                                )
                            }
                            if(step === news.length-1 && (index === 0 || index === 1)){
                                return(
                                    <div key={index} className={style.news_block} onClick={()=>openNews(elem)}>
                                        <div className={style.img} style={{backgroundImage: `url('${process.env.REACT_APP_API_URL}${elem.image}')`}}></div>
                                        <div className={style.date}>{(elem.newsDateTime)?elem.newsDateTime.slice(0, 10).split('-').reverse().join('.'):(elem.createdAt)&&elem.createdAt.slice(0, 10).split('-').reverse().join('.')}</div>
                                        <div className={style.name}>{(elem.title.length > 140)?elem.title.slice(0, 140) + '...':elem.title}</div>
                                        <div className={style.active}></div>
                                    </div>
                                )
                            }
                            if(step === news.length-2 && index === 0){
                                return(
                                    <div key={index} className={style.news_block} onClick={()=>openNews(elem)}>
                                        <div className={style.img} style={{backgroundImage: `url('${process.env.REACT_APP_API_URL}${elem.image}')`}}></div>
                                        <div className={style.date}>{(elem.newsDateTime)?elem.newsDateTime.slice(0, 10).split('-').reverse().join('.'):(elem.createdAt)&&elem.createdAt.slice(0, 10).split('-').reverse().join('.')}</div>
                                        <div className={style.name}>{(elem.title.length > 140)?elem.title.slice(0, 140) + '...':elem.title}</div>
                                        <div className={style.active}></div>
                                    </div>
                                )
                            }






                    })}
                    <div className={style.nextbtn} onClick={()=>reversNews('next')}><div className={style.next}></div></div>
                </div>
                <div className={style.newsmobile}>
                    {news.map((elem, indexNews)=>{
                        if(step===indexNews){
                            return(
                                <div key={indexNews} className={style.news_block} onClick={()=>openNews(elem)}>
                                    <div className={style.img} style={{backgroundImage: `url('${process.env.REACT_APP_API_URL}${elem.image}')`}}></div>
                                    <div className={style.date}>{(elem.newsDateTime)?elem.newsDateTime.slice(0, 10).split('-').reverse().join('.'):(elem.createdAt)&&elem.createdAt.slice(0, 10).split('-').reverse().join('.')}</div>
                                    <div className={style.name}>{(elem.title.length > 140)?elem.title.slice(0, 140) + '...':elem.title}</div>
                                    <div className={style.active}></div>
                                </div>
                            )
                        }
                    })}

                </div>
            </div>
            <div className={style.container} style={{backgroundColor: '#FFF'}}>
                <div className={style.btnsnext}>
                    <div className={style.left} onClick={()=>reversNews('last')}><div className={style.turnnext}></div></div>
                    <div className={style.right} onClick={()=>reversNews('next')}><div className={style.next}></div></div>
                </div>
            </div>
            <div className={style.container} style={{backgroundColor: '#FFF'}}>
                {/*<div className={style.comas}>*/}
                {/*    {slash.map((active, indexS)=>(*/}
                {/*        <div key={indexS} className={style.coma} onClick={()=>ActiveNews(indexS, active)}><div className={style.slash} style={(active === comas)?{opacity: '1'}:{}}></div></div>*/}
                {/*    ))}*/}
                {/*    </div>*/}
                <div className={style.more}>
                    <div className={style.openmore}>
                        <div className={style.next}></div>
                        <Link to='/allnews' className={style.title}>Все новости</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsBlock