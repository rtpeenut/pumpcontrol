import React, { useState, useRef, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';

const ManualControl = ({ addManualHistory, schedules }) => {
  const [isOn, setIsOn] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleToggle = () => {
    if (!isOn) {
      //เปิด
      startTimeRef.current = new Date();
      setIsOn(true);
      setCooldown(120);
    } else {
      //ปิด
      if (cooldown > 0) {
        alert(`กรุณารอ ${cooldown} วินาทีก่อนปิดปั๊ม`);
        return;
      }

      const endTime = new Date();
      const startTime = startTimeRef.current;
      if (startTime) {
        const durationMs = endTime - startTime;
        const durationMinutes = Math.round(durationMs / 60000);
        const formatTime = (date) =>
          date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
        addManualHistory(formatTime(startTime), formatTime(endTime), durationMinutes, endTime.getTime());
      }

      setIsOn(false);
    }
  };

  return (
    <div className="section control-box">
      <div className="state-label">
        <span className={`state-dot ${isOn ? 'on' : 'off'}`}></span>
        <span className="state-text">STATE {isOn ? 'ON' : 'OFF'}</span>
      </div>

      <h2>เปิด-ปิด ปั๊ม</h2>

      {isOn && cooldown > 0 && (
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          {cooldown}s
        </div>
      )}

      <ToggleSwitch isOn={isOn} onToggle={handleToggle} />
    </div>
  );
};

export default ManualControl;
