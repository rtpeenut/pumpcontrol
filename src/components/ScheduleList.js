import React from 'react';

const ScheduleList = ({ schedules, onDelete }) => {
  const scheduledItems = schedules.filter(item => item.source !== 'manual');

  return (
    <div className="schedule-list">
      <h3>รายการตั้งค่า</h3>
      {scheduledItems.map((item) => (
        <div key={item.id} className="schedule-item">
          <span>เปิด {item.time} เป็นเวลา {item.duration} นาที</span>
          <button onClick={() => onDelete(item.id)}>ลบ</button> {/* ใช้ id */}
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
