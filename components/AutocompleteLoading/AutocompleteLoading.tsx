import { useState, useRef } from 'react';
import { Autocomplete, Loader } from '@mantine/core';
import axios from 'axios';

export function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);


  async function addCar() {
    
    const owner = owner.value;
    const brand = brand.value;
    const make = make.value;

    await axios.post("http://localhost:1337/api/autos", {
        data: {
            owner,
            brand,
            make
        }            
});

location.reload();
}

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
      }, 50);
    }
  };
  return (
    <>
    <Autocomplete
    label="Testing"
    data={[
      { value: "John" },
      { value: "Johnny" },
      { value: "John Butler" },
      { value: "Johnny Drama" },
      { value: "Johny" }
    ]}
    />
    <Autocomplete
    label="Batteries"
    data={[
      { value: "AA" },
      { value: "AAA" },
      { value: "B" },
      { value: "C" },
      { value: "D" },
      { value: "9V" },
      { value: "CR1616" },
      { value: "CR2020" }
    ]}
    />
    <Autocomplete
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={loading ? <Loader size={16} /> : null}
      label="Async Autocomplete data"
      placeholder="Your email"
    />
    <button className='btn' onClick={addCar}>Add Car</button>
    </>
  );
}
