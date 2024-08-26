import React, { Dispatch, SetStateAction } from 'react';
interface TypeSelectorProps {
  waveType: string;
  onTypeSelect: Dispatch<SetStateAction<OscillatorType>>;
}

const TypeSelector: React.FC<TypeSelectorProps> = ({
  waveType,
  onTypeSelect,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeSelect(event.target.value as OscillatorType);
  };
  return (
    <div className='wave-type-selector'>
      <label htmlFor='waveform-type' style={styles.label}>
        Oscillator Type
      </label>
      <br />
      <select
        id='waveform-type'
        style={styles.select as React.CSSProperties}
        value={waveType}
        onChange={handleChange}
      >
        <option value='sine'>Sine</option>
        <option value='square'>Square</option>
        <option value='triangle'>Triangle</option>
        <option value='sawtooth'>Sawtooth</option>
      </select>
    </div>
  );
};

const styles = {
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  select: {
    marginTop: '10px',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
    appearance: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
};

export default TypeSelector;
