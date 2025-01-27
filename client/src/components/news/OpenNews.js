import style from './OpenNewsStyle.module.scss'

function OpenNews({news, width}){
    return(
        <div className={style.main} style={(width)?{maxWidth: width}:{}}>
            <div className={style.conatiner}>
                <div className={style.title}>{news.title}</div>
                <div className={style.image}>
                    <img src={(news.imagefull)?`${process.env.REACT_APP_API_URL}/${news.imagefull}`:`${process.env.REACT_APP_API_URL}/${news.image}`} alt=""/>
                </div>
                <div className={style.content}>
                    {(news.text)&&news.text.map((line, index)=>(
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>

            <div className={style.logo}>
                <img src="/files/header/logomain3.svg" alt=""/>
            </div>
        </div>
    )
}

export default OpenNews