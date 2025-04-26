import React, { useState } from 'react';
import ScheduleList from './ScheduleList';
import ToggleSwitch from './ToggleSwitch';

const ScheduleControl = ({ schedules, setSchedules, enableSchedule, setEnableSchedule }) => {
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');

  const handleAdd = () => {
    if (time && duration) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('th-TH');

      setSchedules(prev => [
        ...prev,
        {
          id: Date.now(), // ✅ เพิ่ม id
          time,
          duration,
          date: dateStr,
          source: 'schedule', // ✅ บอกว่าเป็น schedule
        }
      ]);

      setTime('');
      setDuration('');
    }
  };

  const handleDelete = (id) => {
    setSchedules(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="section control-box">
      <div className="state-label">
        <span className={`state-dot ${enableSchedule ? 'on' : 'off'}`}></span>
        <span className="state-text">STATE {enableSchedule ? 'ON' : 'OFF'}</span>
      </div>

      <h2>ตั้งเวลา เปิด-ปิด ปั๊ม</h2>
      <ToggleSwitch isOn={enableSchedule} onToggle={() => setEnableSchedule(!enableSchedule)} />

      {enableSchedule && (
        <>
          <div className="input-group">
            <label>เวลา</label>
            <input type="time" value={time} onChange={e => setTime(e.target.value)} />
            <label>จำนวน (นาที)</label>
            <input type="number" value={duration} onChange={e => setDuration(e.target.value)} />
            <button className="add-button" onClick={handleAdd}>เพิ่ม</button>
          </div>

          <ScheduleList schedules={schedules} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default ScheduleControl;
