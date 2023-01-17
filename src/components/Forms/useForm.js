import { useState } from 'react';

function getValue(target) {
  return target.type === 'checkbox' ? target.checked : target.value;
}

export function useForm(initialData) {
  const [data, setData] = useState({ ...initialData });

  const handleChange = ({ target }) => {
    setData((data) => ({
      ...data,
      [target.name]: getValue(target),
    }));
  };

  const reset = () => setData({ ...initialData });

  return [data, handleChange, reset];
}
