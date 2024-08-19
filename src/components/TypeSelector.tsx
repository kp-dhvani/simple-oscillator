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
    <div
      className='wave-type-selector'
      style={styles.container as React.CSSProperties}
    >
      <label htmlFor='waveform-type' style={styles.label}>
        Oscillator
      </label>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  select: {
    marginBottom: '20px',
    padding: '10px',
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
