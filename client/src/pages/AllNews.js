import style from './styles/AllNewsStyle.module.scss'
import TwoBlocks from "../components/animation/TwoBlocks";
import Footer from "../components/footer/Footer";
import NewsPost from "../components/news/NewsPost";
import SmallHeader from "../components/newheader/SmallHeader";
import {useEffect, useState} from "react";
import OpenNews from "../components/news/OpenNews";
import BigModal from "../components/modalwin/BigModal";
import NewsPost2 from "../components/news/NewsPost2";
import NewsService from "../services/NewsService";

function AllNews (){
    const [total, setTotal] = useState(9)
    const [more, setMore] = useState(true)
    const [news, setNews]=useState([])
    const localDateTime = new Date().toLocaleString('sv-SE', { timeZoneName: 'short' });


    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')
    const openNews = () => {

        if(news && total<news.length){
            setTotal(total + 9)
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
    const openPost = (post) => {
        setActivemodal(true)
        setData(post)
    }
    useEffect(()=>{
        viewPost()
       if(news && total>=news.length){
           setMore(false)
       }
    }, [total])

    useEffect(() => {
        window.scrollTo(0, 0);

    }, []);


    return (
        <div className={style.bodymain}>
            <BigModal data={<OpenNews news={data}  width={'900px'}/>} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData}/>
            <SmallHeader />
            <TwoBlocks />
            <div className={style.allnews}>
                <div className={style.container}>
                    <div className={style.title}>Новости</div>
                    <div className={style.news}>
                        {news.map((elem, index)=>{
                            if(index<total){
                                return(
                                    <div key={index} className={style.cont} onClick={()=>openPost(elem)}>
                                        <NewsPost2  post={elem} openPost={openPost}  data={data} setData={setData}  />
                                    </div>


                                )
                            }

                        })}
                    </div>
                    <div className={style.morebtn} style={(news && total<news.length)?{}:{display:'none'}} onClick={openNews}>ЕЩЁ</div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default AllNews