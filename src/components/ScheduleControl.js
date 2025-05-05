import React, { useState } from 'react';
import ScheduleList from './ScheduleList';
import ToggleSwitch from './ToggleSwitch';

const ScheduleControl = ({ schedules, setSchedules, enableSchedule, setEnableSchedule }) => {
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [cooldown, setCooldown] = useState(0);

  React.useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const checkCooldown = (schedules) => {
    const scheduleItems = schedules.filter(item => item.source === 'schedule');
    if (scheduleItems.length === 0) return 0;
  
    const lastItem = scheduleItems[scheduleItems.length - 1];
    const lastTime = lastItem.timestamp;
    if (!lastTime) return 0;
  
    const now = Date.now();
    const diffSec = Math.floor((now - lastTime) / 1000);
    return Math.max(0, 120 - diffSec);
  };
  

  const handleAdd = () => {
    const remain = checkCooldown(schedules);
    if (remain > 0) {
      alert(`กรุณารอ ${remain} วินาทีก่อนเพิ่มเวลาใหม่`);
      return;
    }
  
    if (time && duration) {
      const now = new Date();
      const dateStr = now.toLocaleDateString('th-TH');
  
      setSchedules(prev => [
        ...prev,
        {
          id: Date.now(),
          time,
          duration,
          date: dateStr,
          source: 'schedule',
          timestamp: now.getTime(), 
        }
      ]);
  
      setTime('');
      setDuration('');
      setCooldown(120); 
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
            <button className="add-button" onClick={handleAdd} disabled={cooldown > 0}>
              {cooldown > 0 ? `${cooldown}s` : 'เพิ่ม'}
            </button>
          </div>

          <ScheduleList schedules={schedules} onDelete={handleDelete} />
        </>
      )}
    </div>
  );
};

export default ScheduleControl;
