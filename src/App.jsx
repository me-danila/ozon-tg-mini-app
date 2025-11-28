import {useState} from 'react';

const CONFIG = {
    topics: [
        "Новинки Ozon",
        "Рынок, тренды, спрос",
        "Опасные товары",
        "Кибербезопасность",
        "Качество",
        "Госрегулирование",
        "Технологии",
        "Логистика, доставка",
        "Финтех Ozon Банк",
        "Продавцы и владельцы ПВЗ",
        "Товары из-за рубежа Ozon Global",
        "Путешествия Ozon Travel",
        "Продукты Ozon fresh",
        "Другой вопрос"
    ],
    mediaMapping: {
        "Коммерсантъ": ["комм", "коммерсант"],
        "Ведомости": ["вед", "ведом"],
        "РБК": ["рбк", "rbc"],
        "Интерфакс": ["интерф", "interfax"],
        "ТАСС": ["тасс", "tass"],
        "Известия": ["изв", "извест"]
    }
};

const generateTimeOptions = () => {
    const options = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            const hour = String(h).padStart(2, '0');
            const minute = String(m).padStart(2, '0');
            options.push(`${hour}:${minute}`);
        }
    }
    return options;
};

const TIME_OPTIONS = generateTimeOptions();

export default function JournalistForm() {
    const [formData, setFormData] = useState({
        topic: '',
        media: '',
        deadlineDate: '',
        deadlineTime: '',
        journalist: '',
        contacts: '',
        requestText: ''
    });

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));

        if (field === 'media') {
            const input = value.toLowerCase();
            if (input) {
                const matches = Object.entries(CONFIG.mediaMapping)
                    .filter(([media, keywords]) =>
                        keywords.some(kw => kw.startsWith(input)) ||
                        media.toLowerCase().startsWith(input)
                    )
                    .map(([media]) => media);

                setSuggestions(matches);
                setShowSuggestions(matches.length > 0);
            } else {
                setShowSuggestions(false);
            }
        }
    };

    const selectSuggestion = (media) => {
        setFormData(prev => ({...prev, media}));
        setShowSuggestions(false);
    };

    const handleSubmit = () => {
        if (Object.values(formData).every(v => v)) {
            const fullDeadline = `${formData.deadlineDate} ${formData.deadlineTime}`;
            console.log('Form submitted:', {...formData, deadline: fullDeadline});
            alert('Форма успешно отправлена!');
        } else {
            alert('Заполните все поля');
        }
    };

    return (
        <div className="min-h-screen bg-[#f9fafb] bg-cover p-6 flex justify-center">
            <div className="flex flex-col gap-6 w-full max-w-2xl">
                <div className="flex flex-col justify-center gap-4 py-12 px-4 rounded-2xl ring ring-[#0f2d4b26] items-center text-center bg-white">
                    <img
                        src="data:image/svg+xml,%3csvg%20width='100%25'%20viewBox='0%200%20160%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M8.20719%2015.665C7.43556%2021.5305%2012.5641%2026.486%2018.6342%2025.7404C22.7721%2025.232%2026.1133%2022.0036%2026.6395%2018.0054C27.4108%2012.1401%2022.2826%207.18464%2016.2121%207.93023C12.0742%208.43834%208.73305%2011.6668%208.20719%2015.665ZM0.0882765%2018.553C-1.00335%207.90572%208.18164%20-0.968946%2019.2009%200.0852014C27.3549%200.865532%2033.9505%207.23855%2034.7581%2015.1177C35.8494%2025.765%2026.6648%2034.6397%2015.6452%2033.5852C7.49116%2032.8049%200.895534%2026.4322%200.0882765%2018.553ZM40.1262%205.49149C39.603%202.96689%2041.5873%200.75149%2044.1071%200.75149H69.6127C70.581%200.75149%2071.1312%201.82221%2070.5463%202.5678L52.9015%2025.0613H66.7265C69.2462%2025.0613%2071.2305%2027.2764%2070.7073%2029.8009C70.3237%2031.6523%2068.5274%2032.9168%2066.5734%2032.9168H38.8742C37.9149%2032.9168%2037.3696%2031.856%2037.9489%2031.1174L55.6073%208.60707H44.2601C42.3062%208.60707%2040.5099%207.34286%2040.1262%205.49149ZM154.792%200.840975C152.906%201.22445%20151.61%202.9209%20151.61%204.78343L151.611%2017.8648L129.608%200.998444C128.841%200.410646%20127.711%200.938517%20127.711%201.88428V28.8918C127.711%2030.754%20129.006%2032.4507%20130.892%2032.8342C133.523%2033.3691%20135.841%2031.4444%20135.841%2028.9963V15.8037L157.843%2032.6697C158.61%2033.2575%20159.74%2032.73%20159.74%2031.7842V4.67856C159.74%202.23046%20157.423%200.305773%20154.792%200.840975ZM73.1144%2016.8308C73.1144%207.53535%2084.0343%200.000121838%2097.5046%200.000121838C110.975%200.000121838%20121.895%207.53535%20121.895%2016.8308C121.895%2026.1259%20110.975%2033.6614%2097.5046%2033.6614C84.0343%2033.6614%2073.1144%2026.1259%2073.1144%2016.8308ZM113.764%2016.8307C113.764%2012.5941%20106.811%207.85567%2097.5046%207.85567C88.1982%207.85567%2081.2446%2012.5941%2081.2446%2016.8307C81.2446%2021.0674%2088.1982%2025.8058%2097.5046%2025.8058C106.811%2025.8058%20113.764%2021.0674%20113.764%2016.8307Z'%20fill='%23005BFF'/%3e%3c/svg%3e"
                        className="max-w-[160px]"
                        alt="logo"/>
                    <h2 className="text-2xl font-bold text-gray-800">Запрос на комментарий Ozon</h2>
                </div>
                <div className="py-12 px-14 rounded-2xl ring ring-[#0f2d4b26] bg-white flex flex-col gap-6">

                    <div>
                        <label className="block text-sm font-semibold">
                            1. Тема<span class="text-red-700">*</span>
                        </label>
                        <select
                            value={formData.topic}
                            onChange={(e) => handleChange('topic', e.target.value)}
                            className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                        >
                            <option value="">Выберите тему</option>
                            {CONFIG.topics.map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                    </div>

                    <hr className="text-gray-200" />

                    <div className="relative">
                        <label className="block text-sm font-semibold">
                            2. Название СМИ<span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.media}
                            onChange={(e) => handleChange('media', e.target.value)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            onFocus={() => formData.media && suggestions.length > 0 && setShowSuggestions(true)}
                            className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                            placeholder="Начните вводить название"
                        />
                        {showSuggestions && (
                            <div
                                className="absolute z-10 w-full mt-1 bg-white ring-2 ring-[#1e37690f] rounded-lg max-h-40 overflow-y-auto">
                                {suggestions.map(media => (
                                    <div
                                        key={media}
                                        onClick={() => selectSuggestion(media)}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {media}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <hr className="text-gray-200" />

                    <div>
                        <label className="block text-sm font-semibold">
                            3. Дедлайн<span className="text-red-700">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-5">
                            <div onClick={(e) => e.currentTarget.querySelector('input').showPicker()}>
                                <input
                                    type="date"
                                    value={formData.deadlineDate}
                                    onChange={(e) => handleChange('deadlineDate', e.target.value)}
                                    className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                                />
                            </div>
                            <select
                                value={formData.deadlineTime}
                                onChange={(e) => handleChange('deadlineTime', e.target.value)}
                                className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                            >
                                <option value="">Время</option>
                                {TIME_OPTIONS.map(time => (
                                    <option key={time} value={time}>{time}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <hr className="text-gray-200" />

                    <div>
                        <label className="block text-sm font-semibold">
                            4. ФИО журналиста<span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.journalist}
                            onChange={(e) => handleChange('journalist', e.target.value)}
                            className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                            placeholder="Иванов Иван Иванович"
                        />
                    </div>

                    <hr className="text-gray-200" />

                    <div>
                        <label className="block text-sm font-semibold">
                            5. Контакты<span className="text-red-700">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.contacts}
                            onChange={(e) => handleChange('contacts', e.target.value)}
                            className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                            placeholder="Телефон или email"
                        />
                    </div>

                    <hr className="text-gray-200" />

                    <div>
                        <label className="block text-sm font-semibold">
                            6. Текст запроса<span className="text-red-700">*</span>
                        </label>
                        <textarea
                            value={formData.requestText}
                            onChange={(e) => handleChange('requestText', e.target.value)}
                            rows="5"
                            className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                            placeholder="Опишите ваш запрос..."
                        />
                    </div>

                    <hr className="text-gray-200" />

                    <div>
                        <label className="block text-sm font-semibold">
                            7. Добавить файл
                        </label>
                        <input
                            id="file-input"
                            name="file"
                            type="file"
                            multiple
                            className="w-full cursor-pointer px-4 py-2 mt-4 bg-[#1e37690f] rounded-lg ring-2 ring-[#1e37690f] hover:bg-white focus:outline-none focus:ring-[#339efc]"
                            accept="*/*"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full cursor-pointer bg-[#005bff] text-white py-3 rounded-lg font-medium hover:bg-[#0045bd] transition-colors"
                    >
                        Отправить запрос
                    </button>
                </div>
            </div>
        </div>
    );
}