import React from 'react';

const Loader = () => {
  return (
    <div className="relative w-full h-screen bg-white flex items-center justify-center">
      <style>{`
        @keyframes moveBox1 {
          0%, 100% { transform: translate(0, 0); }
          9.09% { transform: translate(-26px, 0); }
          18.18%, 27.27% { transform: translate(0, 0); }
          36.36%, 45.45%, 54.54%, 63.63% { transform: translate(26px, 0); }
          72.72% { transform: translate(26px, -26px); }
          81.81% { transform: translate(0, -26px); }
          90.90% { transform: translate(-26px, 0); }
        }
        
        @keyframes moveBox2 {
          0%, 100% { transform: translate(0, 0); }
          9.09%, 18.18% { transform: translate(0, 0); }
          27.27% { transform: translate(0, -26px); }
          36.36% { transform: translate(26px, -26px); }
          45.45%, 54.54% { transform: translate(26px, 0); }
          63.63%, 72.72% { transform: translate(26px, 26px); }
          81.81% { transform: translate(0, 26px); }
          90.90% { transform: translate(0, 0); }
        }
        
        @keyframes moveBox3 {
          0%, 100% { transform: translate(0, 0); }
          9.09%, 18.18%, 27.27% { transform: translate(0, 0); }
          36.36% { transform: translate(0, -26px); }
          45.45% { transform: translate(26px, -26px); }
          54.54%, 63.63% { transform: translate(26px, 0); }
          72.72% { transform: translate(26px, 26px); }
          81.81%, 90.90% { transform: translate(0, 26px); }
        }
        
        @keyframes moveBox4 {
          0%, 100% { transform: translate(0, 0); }
          9.09% { transform: translate(0, -26px); }
          18.18% { transform: translate(-26px, -26px); }
          27.27%, 36.36% { transform: translate(-26px, 0); }
          45.45% { transform: translate(0, 0); }
          54.54% { transform: translate(26px, 0); }
          63.63%, 72.72% { transform: translate(26px, 26px); }
          81.81%, 90.90% { transform: translate(0, 26px); }
        }
        
        @keyframes moveBox5 {
          0%, 100% { transform: translate(0, 0); }
          9.09%, 18.18% { transform: translate(0, 0); }
          27.27% { transform: translate(-26px, 0); }
          36.36%, 45.45% { transform: translate(-26px, 26px); }
          54.54% { transform: translate(0, 26px); }
          63.63% { transform: translate(26px, 26px); }
          72.72%, 81.81%, 90.90% { transform: translate(26px, 0); }
        }
        
        @keyframes moveBox6 {
          0%, 100% { transform: translate(0, 0); }
          9.09%, 18.18%, 27.27% { transform: translate(0, 0); }
          36.36% { transform: translate(-26px, 0); }
          45.45% { transform: translate(-26px, 26px); }
          54.54%, 63.63% { transform: translate(0, 26px); }
          72.72%, 81.81% { transform: translate(26px, 0); }
          90.90% { transform: translate(26px, -26px); }
        }
        
        @keyframes moveBox7 {
          0%, 100% { transform: translate(0, 0); }
          9.09% { transform: translate(-26px, 26px); }
          18.18%, 27.27% { transform: translate(-26px, 0); }
          36.36% { transform: translate(-26px, -26px); }
          45.45%, 54.54%, 63.63% { transform: translate(0, 0); }
          72.72% { transform: translate(26px, 0); }
          81.81% { transform: translate(26px, -26px); }
          90.90% { transform: translate(0, -26px); }
        }
        
        @keyframes moveBox8 {
          0%, 100% { transform: translate(0, 0); }
          9.09% { transform: translate(0, 26px); }
          18.18% { transform: translate(-26px, 26px); }
          27.27%, 36.36% { transform: translate(-26px, 0); }
          45.45%, 54.54% { transform: translate(0, 0); }
          63.63% { transform: translate(0, -26px); }
          72.72% { transform: translate(26px, -26px); }
          81.81%, 90.90% { transform: translate(26px, 0); }
        }
        
        @keyframes moveBox9 {
          0%, 100% { transform: translate(0, 0); }
          9.09%, 18.18% { transform: translate(0, 26px); }
          27.27% { transform: translate(-26px, 26px); }
          36.36%, 45.45% { transform: translate(-26px, 0); }
          54.54%, 63.63% { transform: translate(0, 0); }
          72.72% { transform: translate(0, -26px); }
          81.81% { transform: translate(26px, -26px); }
          90.90% { transform: translate(26px, 0); }
        }
        
        .box {
          float: left;
          position: relative;
          width: 20px;
          height: 20px;
          margin-right: 6px;
        }
        
        .box:nth-child(3n) {
          margin-right: 0;
          margin-bottom: 6px;
        }
        
        .box:nth-child(1) { animation: moveBox1 4s infinite; }
        .box:nth-child(2) { animation: moveBox2 4s infinite; }
        .box:nth-child(3) { animation: moveBox3 4s infinite; }
        .box:nth-child(4) { animation: moveBox4 4s infinite; }
        .box:nth-child(5) { animation: moveBox5 4s infinite; }
        .box:nth-child(6) { animation: moveBox6 4s infinite; }
        .box:nth-child(7) { animation: moveBox7 4s infinite; }
        .box:nth-child(8) { animation: moveBox8 4s infinite; }
        .box:nth-child(9) { animation: moveBox9 4s infinite; }
        
        .box::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
      `}</style>
      
      <div className="relative w-[72px] h-[72px]">
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
        <div className="box" />
      </div>
    </div>
  );
};

export default Loader;