import { useState } from 'react';
import { Input } from 'shadcn-ui';

const ValidatedInput = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (!value) {
      setError('入力必須項目です');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        placeholder="ここに入力してください"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ValidatedInput;