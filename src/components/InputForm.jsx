import React, { useState } from 'react';

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleBlur = () => {
    console.log('handleBlur called'); // デバッグ用ログ
    if (inputValue.trim() === '') {
      setError('入力必須項目です');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    console.log('handleBlur called'); // デバッグ用ログ
    setInputValue(e.target.value);
    if (e.target.value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      setError('入力必須項目です');
    } else {
      setError('');
      // フォーム送信の処理をここに追加
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="inputField">入力フィールド: </label>
        <input
          id="inputField"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ borderColor: error ? 'red' : 'black' }}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">送信</button>
    </form>
  );
};

export default InputForm;