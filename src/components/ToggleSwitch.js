import React from 'react';

const ToggleSwitch = ({ isOn, onToggle, cooldown }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={isOn}
        onChange={onToggle}
        disabled={cooldown > 0}
      />
      <span className="slider">
        {cooldown > 0 ? `${cooldown}s` : ''}
      </span>
    </label>
  );
};



export default ToggleSwitch;
