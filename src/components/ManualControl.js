import React, { useState, useRef } from 'react';
import ToggleSwitch from './ToggleSwitch';

const ManualControl = ({ addManualHistory }) => {
  const [isOn, setIsOn] = useState(false);
  const startTimeRef = useRef(null);

  const handleToggle = () => {
    const now = new Date();

    if (!isOn) {
      // เปิดปั๊ม
      startTimeRef.current = now;
    } else {
      // ปิดปั๊ม
      const endTime = now;
      const startTime = startTimeRef.current;

      if (startTime) {
        const durationMs = endTime - startTime;
        const durationMinutes = Math.round(durationMs / 60000);

        const formatTime = (date) =>
          date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

        // ✅ เรียกใช้ฟังก์ชันที่ส่งมาจากหน้าแม่
        addManualHistory(formatTime(startTime), formatTime(endTime), durationMinutes);
      }
    }

    setIsOn(prev => !prev);
  };

  return (
    <div className="section control-box">
      <div className="state-label">
        <span className={`state-dot ${isOn ? 'on' : 'off'}`}></span>
        <span className="state-text">STATE {isOn ? 'ON' : 'OFF'}</span>
      </div>

      <h2>เปิด-ปิด ปั๊ม</h2>
      <ToggleSwitch isOn={isOn} onToggle={handleToggle} />
    </div>
  );
};

export default ManualControl;
