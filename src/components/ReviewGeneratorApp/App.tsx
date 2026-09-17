import React, { useState } from 'react';
import { GOOGLE_DIRECT_WRITE_REVIEW_URL } from './data/customerSuggestions';

export default function App() {
  const reviews = [
    "The security RFID cards work effortlessly with our turnstile entry gates. IDCraft took extra care to match our brand's exact hex color code for the lanyards. Great communication and professional ethics.",
    "Amazing PVC ID cards with premium print quality and fast delivery. The team was very professional throughout the process.",
    "Excellent custom lanyards and ID cards. Colors, finish and durability exceeded our expectations."
  ];

  const [review, setReview] = useState(reviews[0]);
  const [category, setCategory] = useState('All');
  const [lang, setLang] = useState('Random');

  const shuffle = () => {
    setReview(reviews[Math.floor(Math.random() * reviews.length)]);
  };

  const handleCopyAndOpen = async () => {
    try {
      await navigator.clipboard.writeText(review);
    } catch (err) {}
    window.open(GOOGLE_DIRECT_WRITE_REVIEW_URL, '_blank');
  };

  return (
    <div className="app">
      <style>{css}</style>

      {/* HEADER */}
      <div className="header">
        <div className="logo"><img src="/idcraft-logo-icon.png" alt="IDCraft" style={{objectFit: 'contain', width: '100%', height: '100%', padding: '8px', borderRadius: '18px'}} onError={(e) => e.currentTarget.style.display='none'}/></div>

        <div>
          <h2>IDCraft Technologies</h2>
          <p>Custom PVC Cards, Lanyards & Trophies</p>

          <div className="verifiedRow">
            ⭐ <span>4.9</span>
            <div className="dot" />
            <span className="verified">Verified on Google</span>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className="titleBox">
        <h1>
          Leave us a <span className="googleWord">Google</span> Review
        </h1>
        <p>Rate your experience with IDCraft Technologies 💛</p>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="chips">
        {['All', 'PVC ID Cards', 'Lanyards', 'Trophies'].map((item) => (
          <button
            key={item}
            className={category === item ? 'chip active' : 'chip'}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* LANGUAGE */}
      <div className="languageBar">
        {['Random', 'Hinglish', 'English', 'हिन्दी'].map((item) => (
          <button
            key={item}
            className={lang === item ? 'lang activeLang' : 'lang'}
            onClick={() => setLang(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* REVIEW CARD */}
      <div className="card">
        <div className="cardHeader">
          <div className="avatar">G</div>

          <div>
            <strong>Verified Customer</strong>
            <small>Public on Google Maps</small>
          </div>

          <button className="shuffle" onClick={shuffle}>
            🎲 Shuffle
          </button>
        </div>

        <div className="stars">★★★★★</div>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <div className="counter">{review.length}/500</div>
      </div>

      {/* BUTTON */}
      <button className="googleBtn" onClick={handleCopyAndOpen}>
        <div className="googleIcon">
          <svg viewBox="0 0 48 48" width="26" height="26">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 15.5 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6.1 6.8l6.2 5.2C39 36.7 44 31 44 24c0-1.3-.1-2.4-.4-3.5z"
            />
          </svg>
        </div>

        Copy & Open Google →
      </button>

      <div className="footer">
        🔒 Safe & opens directly to Google Maps
      </div>
    </div>
  );
}

const css = `
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:Inter,system-ui,sans-serif;
}

body{
  background:#F7F6F2;
}

.app{
  max-width:420px;
  margin:auto;
  min-height:100vh;
  padding:18px;
  background:#F7F6F2;
}

.header{
  display:flex;
  align-items:center;
  gap:14px;
}

.logo{
  width:62px;
  height:78px;
  border-radius:18px;
  background:#111318;
  color:#F59E0B;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:900;
  font-size:26px;
  border:2px solid #F59E0B;
  position:relative;
  overflow:hidden;
}

.logo:before{
  content:"";
  position:absolute;
  top:6px;
  width:22px;
  height:6px;
  border-radius:10px;
  background:#F59E0B;
}

.header h2{
  font-size:26px;
  font-weight:800;
}

.header p{
  font-size:14px;
  color:#6B7280;
  margin-top:4px;
}

.verifiedRow{
  display:flex;
  align-items:center;
  gap:8px;
  margin-top:8px;
  font-size:13px;
}

.dot{
  width:4px;
  height:4px;
  border-radius:50%;
  background:#CFCFCF;
}

.verified{
  color:#2563EB;
  font-weight:600;
}

.titleBox{
  margin:22px 0 18px;
}

.titleBox h1{
  font-size:34px;
  font-weight:900;
  line-height:1.05;
  letter-spacing:-1px;
}

.titleBox p{
  color:#6B7280;
  margin-top:10px;
  font-size:15px;
}

.googleWord{
  background:linear-gradient(
    90deg,
    #4285F4 0%,
    #4285F4 25%,
    #EA4335 25%,
    #EA4335 50%,
    #FBBC05 50%,
    #FBBC05 75%,
    #34A853 75%
  );
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.chips{
  display:flex;
  gap:10px;
  overflow-x:auto;
  padding-bottom:8px;
}

.chips::-webkit-scrollbar{
  display:none;
}

.chip{
  border:none;
  background:#fff;
  border-radius:999px;
  padding:11px 18px;
  color:#444;
  font-weight:600;
  box-shadow:0 2px 10px rgba(0,0,0,.05);
  white-space:nowrap;
}

.chip.active{
  background:#111318;
  color:#fff;
}

.languageBar{
  margin:18px 0;
  background:#fff;
  border-radius:999px;
  padding:5px;
  display:flex;
  box-shadow:0 4px 16px rgba(0,0,0,.06);
}

.lang{
  flex:1;
  border:none;
  background:none;
  padding:10px;
  border-radius:999px;
  font-weight:600;
  color:#666;
}

.activeLang{
  background:#F59E0B;
  color:#111318;
}

.card{
  background:#fff;
  border-radius:28px;
  padding:18px;
  box-shadow:0 10px 28px rgba(0,0,0,.06);
}

.cardHeader{
  display:flex;
  align-items:center;
  gap:12px;
}

.avatar{
  width:48px;
  height:48px;
  border-radius:50%;
  background:#16A34A;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
}

.cardHeader small{
  display:block;
  color:#888;
  margin-top:2px;
}

.shuffle{
  margin-left:auto;
  border:none;
  background:none;
  color:#F59E0B;
  font-weight:700;
}

.stars{
  color:#FDBA12;
  font-size:30px;
  margin:16px 0;
  letter-spacing:3px;
}

textarea{
  width:100%;
  border:none;
  resize:none;
  outline:none;
  background:#F9FAFB;
  border-radius:18px;
  padding:14px;
  font-size:15px;
  line-height:1.6;
  min-height:130px;
}

.counter{
  margin-top:8px;
  text-align:right;
  color:#999;
  font-size:12px;
}

.googleBtn{
  width:100%;
  margin-top:22px;
  border:none;
  border-radius:999px;
  background:linear-gradient(180deg,#FFD54F,#F4B400);
  padding:16px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:14px;
  font-size:18px;
  font-weight:800;
  color:#111318;
  box-shadow:0 10px 24px rgba(245,158,11,.25);
}

.googleIcon{
  width:42px;
  height:42px;
  border-radius:50%;
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
}

.footer{
  margin-top:16px;
  text-align:center;
  color:#777;
  font-size:13px;
}
`;
