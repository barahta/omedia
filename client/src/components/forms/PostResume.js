import style from './PostResumeStyle.module.scss';
import { useState } from "react";
import useNotification from "../../hooks/useNotification.hook";
import { useMessage } from "../../hooks/message.hook";
import NewsService from "../../services/NewsService";

function PostResume({ man, setActivemodal }) {
    const [myname, setMyname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [resume, setResume] = useState(null); // Состояние для файла
    const { notifications, addNotification } = useNotification();
    const message = useMessage();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedFormats = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if (allowedFormats.includes(file.type)) {
                setResume(file);
                message(`Файл "${file.name}" успешно прикреплен`);
            } else {
                message('Неверный формат файла. Допустимые форматы: PDF, Word, TXT, Excel.');
            }
        }
    };

    const postResume = async () => {
        console.log(man.email)
        if (myname && phone && email && resume) {
            const formData = new FormData();
            formData.append('name', myname);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('vak', man.name);
            formData.append('recipient', man.email); // Email получателя
            formData.append('resume', resume);

            try {
                const response = await NewsService.sendResumeMessage(formData);
                if (response.data) {
                    setActivemodal(false);
                    setMyname('');
                    setPhone('');
                    setEmail('');
                    setResume(null); // Очистка файла после отправки
                    message('Ваше резюме отправлено');
                }
            } catch (e) {
                console.error(e);
                message('Ошибка при отправке резюме. Попробуйте снова.');
            }
        } else {
            message('Пожалуйста, заполните все поля и прикрепите файл.');
        }
    };

    return (
        <div className={style.main}>
            <div className={style.up}>
                <div className={style.title}>Отклик на вакансию</div>
                <div className={style.vakname}>{man.name}</div>

                <input
                    onChange={e => setMyname(e.target.value)}
                    value={myname}
                    type="text"
                    className={style.forminput}
                    placeholder='Как Вас зовут'
                />
                <input
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    type="number"
                    className={style.forminput}
                    placeholder='Телефон для связи'
                />
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className={style.forminput}
                    placeholder='Контактный email'
                />
            </div>
            <div className={style.down}>
                {resume && <div className={style.filename}>Файл: {resume.name}</div>}
                <input
                    type="file"
                    id="resume-upload"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
                />
                <label htmlFor="resume-upload" className={style.btndoc}>Прикрепить файл</label>
                <div className={style.btnpost} onClick={postResume}>Отправить</div>
            </div>
        </div>
    );
}

export default PostResume;
