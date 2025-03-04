import React, { useState, useEffect } from 'react'
import { FaRegLightbulb } from "react-icons/fa";
import './Navbar.css'

function RightNavbar() {
  const [lang, setLang] = useState('EN');
  const [darkMode, setDarkMode] = useState(false);

  // ใช้ useEffect เพื่อตรวจสอบสถานะ Dark Mode จาก localStorage เมื่อโหลดหน้า
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark'); // เปิด Dark Mode
    }
  }, []);

  // ฟังก์ชันสลับ Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark'); // เปิด Dark Mode
      } else {
        document.documentElement.classList.remove('dark'); // ปิด Dark Mode
      }
      localStorage.setItem('darkMode', newMode); // บันทึกสถานะ Dark Mode ลงใน localStorage
      return newMode;
    });
  };

  const handleClick = () => {
    setLang((prevLang) => (prevLang === 'EN' ? 'TH' : 'EN'));
  };

  const handleClickSearch = () => {
    const searchImg = document.getElementById('search-img');
    if(searchImg){
      searchImg.classList.add('animate-clickSearch');
      setTimeout(() => searchImg.classList.remove('animate-clickSearch'), 300);
    }
  };

  return (
    <div className='rightnav'>
      <ul className='rightnav-ul'>
        {/* คลิกที่ไอคอนเพื่อสลับ Dark Mode */}
        <li className='rightnav-li' onClick={toggleDarkMode}>
          <FaRegLightbulb className={`text-white i-bulb ${darkMode ? 'text-yellow-500' : 'text-gray-500'}`} />
        </li>
        <div id="lang" className='rightnav-lang select-none' onClick={handleClick}>
          <li><span className='rightnav-lang-text'>{lang}</span></li> 
        </div>
      </ul>
    </div>
  )
}

export default RightNavbar;
