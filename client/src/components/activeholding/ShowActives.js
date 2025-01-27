import style from './ShowActivesStyle.module.scss'

function ShowActives ({actvs}){
    return (
        <div className={style.actv_block}>
            <div className={style.container}>
                {(actvs!=='')&&actvs.map((block, index)=>(
                    <a href={block.url} target="_blank" rel="noopener noreferrer" key={index}><div className={style.btn}>{block.name}</div></a>
                ))}
            </div>

        </div>
    )
}

export default ShowActives