import style from './OpenCompany.module.scss'

function OpenCompany ({com}){
    return (
        <div className={style.main}>
            <div className={style.leftpart}>
                <div className={style.logo}>
                    <img src={`${process.env.REACT_APP_API_URL}${com.logo}`} alt=""/>
                </div>
                <div className={style.title}>{com.name}</div>
                <a href={com.site} target="_blank" rel="noopener noreferrer" className={style.site}>
                    Перейти на сайт
                </a>
            </div>
            <div className={style.rightpart}>
                <div className={style.container}>
                    <div className={style.up}>
                        <div className={style.image} style={{backgroundImage: `url('${process.env.REACT_APP_API_URL}${com.image}')`}}></div>
                        <div className={style.desc}>{com.desc}</div>
                    </div>

                    <div className={style.contacts}>
                        {(com.contacts)&&com.contacts.map((contact, indexCon)=>(
                            <div key={indexCon} className={style.phone}>{contact}</div>
                        ))}
                        {/*<div className={style.phone}>{com.phone}</div>*/}
                        {/*<div className={style.email}>{com.email}</div>*/}
                        {/*<div className={style.adress}>{com.adress}</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OpenCompany