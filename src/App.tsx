import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [addNoBreakSpaces, setAddNoBreakSpaces] = useState(true);
  const [addNonBreakingHyphen, setAddNonBreakingHyphen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const exampleWithHyphen = 'лет на рынке бизнес\u2011аналитики';
  const exampleWithBreakSpace =
    'Заполните форму и\u00A0мы\u00A0проведем для вас демо';

  // Замена обычных дефисы на неразрывные
  const handleAddNonBreakingHyphens = (text: string) => {
    return text.replace(/-/g, '\\u2011');
  };

  // Добавление символа неразрывного пробела (для запрета переноса на новую строку)
  const handleAddNonBreakSpaces = (text: string, prepositions = []) => {
    // Стандартный набор предлогов/союзов (можно расширить)
    const defaultPrepositions = [
      'в',
      'с',
      'к',
      'у',
      'о',
      'и',
      'на',
      'за',
      'по',
      'из',
      'от',
      'до',
      'для',
      'не',
      'но',
      'а',
      'или',
      'то',
      'же',
      'ли',
      'бы',
    ];

    const allPrepositions = [...defaultPrepositions, ...prepositions];

    const regex = new RegExp(
      `(^|\\s)(${allPrepositions.join('|')})(\\s)`,
      'gi',
    );

    // Замена пробела на неразрывный после предлога
    return text.replace(regex, (_, p1, p2, __) => {
      return `${p1}${p2}\\u00a0`;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let processedText = inputText;

    if (addNoBreakSpaces) {
      processedText = handleAddNonBreakSpaces(processedText);
    }

    if (addNonBreakingHyphen) {
      processedText = handleAddNonBreakingHyphens(processedText);
    }

    setOutputText(processedText);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error('Что-то пошло не так при копировании текста 💀: ', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Форматирование текста 📝</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <h2>Исходный текст</h2>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Введите текст..."
            style={{
              width: '100%',
              height: '100px',
              padding: '8px',
              fontSize: '16px',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={addNoBreakSpaces}
              onChange={(e) => setAddNoBreakSpaces(e.target.checked)}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            Добавить неразрывные пробелы{' '}
            <code
              style={{
                opacity: 0.6,
                background: 'rgba(0, 0, 0, 0.1)',
                padding: '0 4px',
                borderRadius: '4px',
                color: '#9800f7',
              }}
            >
              <small>\u00A0</small>
            </code>
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input
              type="checkbox"
              checked={addNonBreakingHyphen}
              onChange={(e) => setAddNonBreakingHyphen(e.target.checked)}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            Добавить неразрывный дефис{' '}
            <code
              style={{
                opacity: 0.6,
                background: 'rgba(0, 0, 0, 0.1)',
                padding: '0 4px',
                borderRadius: '4px',
                color: '#9800f7',
              }}
            >
              <small>\u2011</small>
            </code>
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#9800f7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Форматировать
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h2>✨ Результат ✨</h2>
        <textarea
          value={outputText}
          readOnly
          placeholder="Здесь появится ваш текст..."
          style={{
            width: '100%',
            height: '100px',
            padding: '8px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={handleCopy}
          style={{
            color: '#9800f7',
            background: 'none',
            border: 0,
            cursor: 'pointer',
            padding: 0,
          }}
        >
          {isCopied ? 'Скопировано ✅' : 'Копировать'}
        </button>
      </div>
    </div>
  );
}

export default App;
