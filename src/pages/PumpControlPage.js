import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ManualControl from '../components/ManualControl';
import ScheduleControl from '../components/ScheduleControl';
import HistoryPanel from '../components/HistoryPanel';
import '../styles.css';

const PumpControlPage = () => {
  const navigate = useNavigate();
  const [showHistory, setShowHistory] = useState(false);

  const [schedules, setSchedules] = useState([]);
  const [enableSchedule, setEnableSchedule] = useState(false);

  
  const addManualHistory = (startTime, endTime, duration, timestamp) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('th-TH');
  
    setSchedules(prev => [
      ...prev,
      {
        id: Date.now(),
        time: startTime,
        endTime: endTime,
        duration,
        date: dateStr,
        source: 'manual',
        timestamp, // เพิ่ม timestamp
      },
    ]);
  };
  

  return (
    <div className="page-container">
      <div className="back-button-container">
        <button className="back-button" onClick={() => navigate('/')}>
          <img src="/icon/back.png" alt="กลับ" className="back" />
        </button>

        <button className="history-button" onClick={() => setShowHistory(true)}>
          <img src="/icon/history.png" alt="ประวัติ" className="back" />
        </button>
      </div>

      <h1>ควบคุมปั๊ม🕹️</h1>

      {/*ส่ง addManualHistory ไปยัง ManualControl */}
      <ManualControl addManualHistory={addManualHistory} schedules={schedules} />

      <ScheduleControl
        schedules={schedules}
        setSchedules={setSchedules}
        enableSchedule={enableSchedule}
        setEnableSchedule={setEnableSchedule}
      />

      <HistoryPanel
        show={showHistory}
        onClose={() => setShowHistory(false)}
        schedules={schedules}
      />
    </div>
  );
};

export default PumpControlPage;
