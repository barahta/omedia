import style from './GroupStyle.module.scss'
import {useEffect, useState} from "react";
import BigModal from "../modalwin/BigModal";
import OpenCompany from "./OpenCompany";
import {Link} from "react-router-dom";
import NewsService from "../../services/NewsService";

function Group (){

    const companies = [
        {
            name: 'Учебно-тренировочный центр «АвиаТЕХ»',
            url: 'http://195.161.41.34:5004/',
            img: 'aviatech.svg',
            desc: 'Авиационный учебный центр, специализирующийся на подготовке частных пилотов на самолете с одним двигателем Cessna 172, Piper 28. Проектирование и строительство аэродромов и посадочных площадок, а также захватывающие туристические полеты в Екатеринбурге.',
            phone: '+7 (3433) 63-97-60',
            email: 'mail@airtechs.ru',
            aplication: '1.png',
            adress: ''
        },
        {
            name: 'Крестьянско-фермерское хозяйство «РеаФарм»',
            url: 'http://195.161.41.34:5003/',
            img: 'reafarm.svg',
            desc: 'Микроклональное копирование семян, выращивание салатного листа, микрозелени, лекарственных растений и других культур. Производство, переработка, хранение, транспортировка и реализация сельскохозяйственной продукции.',
            phone: '+7 (3462) 51-13-98',
            email: '',
            aplication: '2.png',
            adress: ''
        },
        {
            name: 'Телерадиокомпания «Сургутинтерновости»',
            url: 'in-news.ru',
            img: '24logo.svg',
            desc: 'Информационные, просветительские, развлекательные программы, документальные фильмы, интервью на самые злободневные темы семь дней в неделю. В распоряжении съемочных групп новейшее оборудование, которое позволяет снимать в режиме высокой четкости при любой погоде. Наши специалисты — многократные победители конкурсов профессионального мастерства всех уровней — от местного до международного. СИН – это два телеканала, один из которых – окружной собственного программирования «Сургут 24», шесть радиостанций, сайт и множество площадок в социальных сетях.',
            phone: '+7 (3462) 22-12-12',
            email: 'https://news@in-news.ru',
            aplication: '3.png'
        },
        {
            name: 'Центр детского творчества «Hope Kids»',
            url: 'http://195.161.41.34:5001/',
            img: 'hopekids.svg',
            desc: 'Большое пространство, включающее в себя лабиринты, игровые комнаты, интерактивные зоны и зоны мастер-классов для детей, а также бар с детскими напитками и едой. На каникулах на базе центра организован детский лагерь.',
            phone: '+7 (3462) 51‒11‒72',
            email: '',
            aplication: '4.png',
            adress: ''
        },
        {
            name: 'Фитнес-центр «Hope Fitness»',
            url: 'http://195.161.41.34:5002/',
            img: 'hopefitnneslogo.svg',
            desc: 'Круглосуточный фитнес-центр, который предлагает возможность заниматься спортом всей семьей. Инновационное оборудование, высококвалифицированные тренеры, большой выбор групповых программ. В то же время это не только место для занятий спортом – здесь можно отлично отдохнуть и расслабиться после трудного дня в зоне СПА: хамам, финская парная и комната с гималайской солью, услуги массажа и маникюра.',
            phone: '+7 (3462) 51-11-45',
            email: 'info@hopefitness.ru',
            aplication: '5.png',
            adress: ''
        },
        {
            name: 'THEKITCHA',
            url: '/',
            img: 'thekitcha.svg',
            desc: 'Здесь вы можете окунуться в мир гастрономических удовольствий. Просто закажите доставку, а мы сделаем все остальное. Кстати, ни на что не намекаем, но мы закрепили меню в документах группы. Все для вашего удобства! А для тех, кто жаждет приключений, мы всегда готовы забронировать стол по номеру: 50-02-07. Если вы искали место для уютных встреч со вкусными блюдами, то мы ждём вас!',
            phone: '+7 (3462) 50-02-07',
            email: 'улица Энгельса, 15, Сургут',
            aplication: '6.jpeg',
            adress: ''
        },
        {
            name: 'Благотворительный фонд «Траектория надежды»',
            url: 'https://vk.com',
            img: 'traektoriya.svg',
            desc: 'Оказание помощи и поддержки нуждающимся. Привлечение адресных и целевых пожертвований, направленных на комплексное решение различных социальных проблем, а также реализация и поддержка культурных, образовательных и других общественно полезных целей.',
            phone: '+7 (3462) 51-11-80',
            email: 'mail@tnfond.ru',
            aplication: '7.png',
            adress: ''
        },
        {
            name: 'Общественная организация помощи бездомным животным «Верный друг»',
            url: 'https://vk.com',
            img: 'verniydrug.svg',
            desc: 'Центр временной передержки животных. Лечение, кормление, содержание бездомных собак, взятых под опеку. Сокращение числа уличных собак путем их стерилизации. Строительство утепленных вольеров, поиск новых хозяев для подопечных.',
            phone: '+7 (922) 652-77-04',
            email: 'zhereb74@mail.ru',
            aplication: '8.png',
            adress: ''
        },

    ]

    const [activemodal, setActivemodal] = useState(false)
    const [data, setData] = useState('')
    const [group, setGroup] = useState([])
    const openCompany = (com) => {
        setActivemodal(true)
        setData(com)
    }

    const getGroupCompanyes = async () => {
        try{
            const {data} = await NewsService.getGroupCompanyes()
            const posts = data.reverse()
            const sortedArray = posts.sort((a, b) => a.number - b.number);
            console.log(sortedArray)
            setGroup(sortedArray)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getGroupCompanyes()
    }, [])

    return (
        <div className={style.main}>
            <BigModal data={<OpenCompany com={data} />} activemodal={activemodal} setActivemodal={setActivemodal} setData={setData} />
            <div className={style.container}>
                <div className={style.title}>Группа компаний</div>
                <div className={style.companies}>
                    {group.map((com, index)=>(
                        <div key={index} className={style.one} onClick={()=>openCompany(com)}>
                            <div className={style.active}>
                                <div className={style.sphereone}>
                                    <div></div>
                                </div>
                                <div className={style.spheretwo}>
                                    <div></div>
                                </div>
                                <div className={style.spherethree}>
                                    <div></div>
                                </div>
                            </div>
                            <div className={style.comimg} style={{backgroundImage: `url('${process.env.REACT_APP_API_URL}${com.logo}')`}}></div>
                        </div>
                    ))}

                </div>
                <Link to="/activegroup" className={style.more}>Все проекты</Link>
            </div>




        </div>
    )
}

export default Group