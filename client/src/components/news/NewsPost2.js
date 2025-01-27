import style from './NewsPostStyle2.module.scss'

function NewsPost ({post, setActivemodal, activemodal, data, setData}){

    const openPost = (post) => {
        setActivemodal(true)
        setData(post)
    }
    console.log(post)
    return (
        <div className={style.news_block} onclick={()=>openPost(post)}>
            <div className={style.content}>
                <div className={style.img}><img src={`${process.env.REACT_APP_API_URL}${post.image}`} alt=""/></div>
                {/*<div className={style.img} style={{backgroundImage: `url('/files/news/${post.url}')`}}></div>*/}
                <div className={style.date}>{(post.createdAt)&&post.createdAt.slice(0, 10).split('-').reverse().join('.')}</div>
                <div className={style.name}>{(post.title && post.title.length > 140)?post.title.slice(0, 140) + '...':post.title}</div>
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