import style from './NewsPostStyle.module.scss'

function NewsPost ({post, setActivemodal, activemodal, data, setData}){

    const openPost = (post) => {
        setActivemodal(true)
        setData(post)
    }

    return (
        <div className={style.news_block} onclick={()=>openPost(post)}>
            <div className={style.content}>
                <div className={style.img}><img src={`${process.env.REACT_APP_API_URL}/${post.image}`} alt=""/></div>

                {/*<div className={style.img} style={{backgroundImage: `url('/files/news/${post.url}')`}}></div>*/}
                <div className={style.date}>{post.createdAt}</div>
                <div className={style.name}>{(post.title.length > 80)?post.title.slice(0, 80) + '...':post.title}</div>
                <div className={style.active}></div>
            </div>
            <div className={style.btnblock} onclick={()=>openPost(post)}>
                <div className={style.btn}>
                    <div className={style.next}></div>
                    <div className={style.text}>Открыть</div>
                </div>
            </div>

        </div>
    )
}

export default NewsPost