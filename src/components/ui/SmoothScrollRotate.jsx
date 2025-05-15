import React, { useEffect, useState } from 'react';

export const SmoothScrollRotate = () => {
  const [rotationDegree, setRotationDegree] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY; // Current scroll position
        const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Max scrollable height
  
        const scrollPercent = scrollTop / docHeight; // 0 to 1
        const newRotation = scrollPercent * 360; // 0 to 360 degrees
        setRotationDegree(newRotation);
      };

    // Add the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <section className='flex gap-30' style={{ height: '60vh' }}>
        <div className='w-[450px] h-[350px]'>

        </div>
        <div
          style={{
            margin:'10',
            width: '150px',
            height: '150px',
           
          
            transform: `rotate(${rotationDegree}deg)`,
            transition: 'transform 0.1s ease-out', // Smooth transition
          }}
        >  <img src="flower.png" alt="" className='w-[200px] h-[200px]'/></div>
      </section>

      <section style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            backgroundColor: 'lightgreen',
            borderRadius: '10px',
            transform: `rotate(${rotationDegree}deg)`,
            transition: 'transform 0.1s ease-out', // Smooth transition
          }}
        >  <img src="flower.png" alt="" /></div>
      </section>

      <section style={{ height: '60vh', display: 'flex', justifyContent: 'en', alignItems: 'center' }}>
        <div
          style={{
            width: '150px',
            height: '150px',
            backgroundColor: 'lightblue',
            borderRadius: '10px',
            transform: `rotate(${rotationDegree}deg)`,
            transition: 'transform 0.1s ease-out', // Smooth transition
          }}
        ></div>
      </section>
    </div>
  );
};

// export default SmoothScrollRotate;
