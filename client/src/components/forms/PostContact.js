import style from './PostContactStyle.module.scss';
import { useState } from "react";
import useNotification from "../../hooks/useNotification.hook";
import { useMessage } from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";

function PostContact({ man, setActivemodal }) {
    const [myname, setMyname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const { notifications, addNotification } = useNotification();
    const message = useMessage();

    const postMess = async () => {
        try {
            const payload = {
                name: myname,
                email: email,
                message: text,
                phone: phone,
                recipient: man.email, // Email получателя
            };

            // Отправка сообщения через сервис
            const response = await NewsService.sendContactMessage(payload);

            if (response.data) {
                setActivemodal(false);
                setMyname('');
                setPhone('');
                setEmail('');
                setText('');
                message('Ваше письмо отправлено');
            }
        } catch (e) {
            console.error(e);
            message('Ошибка при отправке письма. Попробуйте снова.');
        }
    };

    return (
        <div className={style.main}>
            <input
                onChange={e => setMyname(e.target.value)}
                value={myname}
                type="text"
                className={style.forminput}
                placeholder='Как Вас зовут'
                required
            />
            <input
                onChange={e => setPhone(e.target.value)}
                value={phone}
                type="number"
                className={style.forminput}
                placeholder='Телефон для связи'
                required
            />
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="email"
                className={style.forminput}
                placeholder='Контактный email'
                required
            />
            <div className={style.title}>Ваше сообщение</div>
            <textarea
                onChange={(e) => setText(e.target.value)}
                className={style.formtext}
                value={text}
                placeholder="Введите текст сообщения"
                required
            />
            <div className={style.btnpost} onClick={postMess}>Отправить</div>
        </div>
    );
}

export default PostContact;
