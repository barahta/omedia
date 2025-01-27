import style from './AboutUsStyle.module.scss'
import NewsService from "../../services/NewsService";
import {useEffect, useState} from "react";

function AboutUs () {

    const [aboutText, setAboutText] = useState('')
    const getAbout = async () => {
        try{
            const {data} = await NewsService.getAbout({company: 'omedia'})
            if(data){
                setAboutText(data.text)
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        getAbout()
    },[])

    return(
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.open}>
                    <div className={style.iopen}></div>
                    О нас
                </div>
                <div className={style.text}>{(aboutText)&&aboutText}</div>
            </div>
        </div>
    )
}

export default AboutUs