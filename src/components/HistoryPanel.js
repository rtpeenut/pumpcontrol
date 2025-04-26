import React from 'react';
import '../styles.css';

const HistoryPanel = ({ show, onClose, schedules }) => {
  return (
    <div className={`history-panel ${show ? 'show' : ''}`}>
      <div className="history-header">
        <button onClick={onClose} className="close-button"> {/*ปิด*/}
            <img src="/icon/back.png" alt="กลับ" className="back" />     
        </button>
        <h3>ประวัติย้อนหลัง</h3>
      </div>
      <div className="history-content">
  {schedules.length === 0 ? (
    <p>ยังไม่มีประวัติ</p>
  ) : (
    <>
      {/* ประวัติ Manual */}
      <h4>⏱️ ประวัติ Manual</h4>
      {schedules.filter(item => item.source === 'manual').length === 0 ? (
        <p>ไม่มีรายการ Manual</p>
      ) : (
        schedules
          .filter(item => item.source === 'manual')
          .map((item, idx) => (
            <div key={`manual-${idx}`} className="history-item">
              <strong>{item.date}</strong><br />
              เปิด {item.time} - ปิด {item.endTime}<br />
              เป็นเวลา {item.duration} นาที
            </div>
          ))
      )}

      {/* ประวัติ Schedule */}
      <h4>📅 ประวัติ Auto</h4>
      {schedules.filter(item => item.source !== 'manual').length === 0 ? (
        <p>ไม่มีรายการ Auto</p>
      ) : (
        schedules
          .filter(item => item.source !== 'manual')
          .map((item, idx) => (
            <div key={`schedule-${idx}`} className="history-item">
              <strong>{item.date}</strong><br />
              เปิด {item.time} เป็นเวลา {item.duration} นาที
            </div>
          ))
      )}
    </>
  )}
</div>

    </div>
  );
};

export default HistoryPanel;
