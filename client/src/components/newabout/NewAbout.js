import style from './NewAboutStyle.module.scss'
import {useEffect, useState} from "react";
import NewsService from "../../services/NewsService";

function NewAbout(){

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

    return (
        <div className={style.main}>
            <div className={style.containter}>
                <div className={style.btn}>
                    <div className={style.up}>
                        {/*<div className={style.ic}></div>*/}
                        <div className={style.abouttext}>О нас</div>
                    </div>
                    <div className={style.img}></div>
                    <div className={style.active}></div>
                </div>
                <div className={style.text}>
                    <p>{(aboutText)&&aboutText}</p>
                </div>
            </div>
        </div>
    )
}

export default NewAbout