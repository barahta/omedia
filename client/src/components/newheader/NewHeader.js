import style from './NewHeaderStyle.module.scss';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import NewsService from "../../services/NewsService";
function NewHeader() {
    const [showVideo, setShowVideo] = useState(false);

    // const allViews = async () => {
    //     try {
    //         const {data} = await NewsService.viewPost()
    //         if(data){
    //             console.log(data)
    //         }
    //     }catch (e) {
    //         console.log(e)
    //     }
    // }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowVideo(true);
        }, 500);
        // allViews()
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className={style.main}>
            <div className={style.video}>
            {showVideo && (

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={style.videoContent}
                >
                    <source src={`/video/omedia/video.mp4`} type="video/mp4" />
                </video>
                )}
            </div>
            <div className={style.container}>
                <div className={style.leftpart}>
                    <img src="/files/header/logomain.svg" alt=""/>
                </div>
                <div className={style.rightpart}>
                    <div className={style.board}>
                        <Link to="/activegroup"  className={style.btn}>Активы группы<div className={style.border}></div>
                        </Link>
                        {/*<div className={style.btn}>О нас<div className={style.border}></div></div>*/}
                        <Link to='/allnews' className={style.btn}>Новости<div className={style.border}></div></Link>
                        <Link to='/contacts' className={style.btn}>Контакты<div className={style.border}></div></Link>
                        <Link to='/vakansii' className={style.btn}>Вакансии<div className={style.border}></div></Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default NewHeader;