import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const HomePage = () => {
  const navigate = useNavigate();

  const goToControl = () => {
    navigate('/control');
  };

  return (
    <div className="home-container">
      <h1>MENU</h1>

      <div className="menu-grid">
        <button className="menu-button" onClick={goToControl}> {/*ไปหน้าควบคุมปั๊ม */}
          <img src="/icon/pump.png" alt="ปั๊มน้ำ" className="pump-image" />
        </button>

        
      </div>
    </div>
  );
};

export default HomePage;
