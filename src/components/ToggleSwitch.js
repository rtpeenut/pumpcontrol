import React from 'react';

const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isOn} onChange={onToggle} />
      <span className="slider" />
    </label>
  );
};

export default ToggleSwitch;
