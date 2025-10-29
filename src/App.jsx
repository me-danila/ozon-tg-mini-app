import {useState} from 'react';

const CONFIG = {
    topics: [
        "Политика",
        "Экономика",
        "Общество",
        "Технологии",
        "Культура",
        "Спорт"
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

// Генерируем варианты времени с шагом 15 минут
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
            alert('Форма отправлена! Данные в консоли.');
        } else {
            alert('Заполните все поля');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Заявка для СМИ</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Тема *
                    </label>
                    <select
                        value={formData.topic}
                        onChange={(e) => handleChange('topic', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="">Выберите тему</option>
                        {CONFIG.topics.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Название СМИ *
                    </label>
                    <input
                        type="text"
                        value={formData.media}
                        onChange={(e) => handleChange('media', e.target.value)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        onFocus={() => formData.media && suggestions.length > 0 && setShowSuggestions(true)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Начните вводить название"
                    />
                    {showSuggestions && (
                        <div
                            className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                            {suggestions.map(media => (
                                <div
                                    key={media}
                                    onClick={() => selectSuggestion(media)}
                                    className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                >
                                    {media}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Дедлайн *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <div onClick={(e) => e.currentTarget.querySelector('input').showPicker()}>
                            <input
                                type="date"
                                value={formData.deadlineDate}
                                onChange={(e) => handleChange('deadlineDate', e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer w-full"
                            />
                        </div>
                        <select
                            value={formData.deadlineTime}
                            onChange={(e) => handleChange('deadlineTime', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">Время</option>
                            {TIME_OPTIONS.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ФИО журналиста *
                    </label>
                    <input
                        type="text"
                        value={formData.journalist}
                        onChange={(e) => handleChange('journalist', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Иванов Иван Иванович"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Контакты *
                    </label>
                    <input
                        type="text"
                        value={formData.contacts}
                        onChange={(e) => handleChange('contacts', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Телефон или email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Текст запроса *
                    </label>
                    <textarea
                        value={formData.requestText}
                        onChange={(e) => handleChange('requestText', e.target.value)}
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Опишите ваш запрос..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Добавить файл
                    </label>
                    <input
                        id="file-input"
                        name="file"
                        type="file"
                        multiple
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        accept="*/*"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-sky-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                    Отправить запрос
                </button>
            </div>
        </div>
    );
}