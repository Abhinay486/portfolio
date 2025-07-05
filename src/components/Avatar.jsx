import React, { useState, useEffect, useRef } from 'react';
import './Avatar.css'; // Import the CSS file

const Avatar = () => {
  // State for mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [orbTransform, setOrbTransform] = useState('');
  const [pupilTransform, setPupilTransform] = useState({ left: '', right: '' });

  const avatarRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  useEffect(() => {
    if (!avatarRef.current) return;

    const calculatePupilTransform = (eyeRef) => {
      if (!eyeRef.current) return '';

      const eyeRect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const deltaX = mousePos.x - eyeCenterX;
      const deltaY = mousePos.y - eyeCenterY;

      const angle = Math.atan2(deltaY, deltaX);

      // Max distance pupil can move from center. Should be less than (eyeRadius - pupilRadius)
      const maxPupilOffset = eyeRect.width / 2 - pupilBaseStyle.width / 2 - 2; // -2 for a small margin

      let x = Math.cos(angle) * maxPupilOffset;
      let y = Math.sin(angle) * maxPupilOffset;

      // Clamp movement within the eye
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const pupilMaxTravelRadius = eyeRect.width / 2 - parseFloat(pupilBaseStyle.width) / 2;

      if (distance < pupilMaxTravelRadius) {
         // If mouse is closer to eye center than pupil can travel, move pupil directly towards mouse
         // This needs to be relative to the pupil's own center.
         // The pupil's natural position is center of the eye.
         // So we calculate offset from this center.
         const pupilRadius = parseFloat(pupilBaseStyle.width) / 2;
         const eyeActualRadius = eyeRect.width / 2;
         x = (deltaX / eyeActualRadius) * (eyeActualRadius - pupilRadius);
         y = (deltaY / eyeActualRadius) * (eyeActualRadius - pupilRadius);

      } else {
        // If mouse is further, pupil sticks to the edge
         x = Math.cos(angle) * pupilMaxTravelRadius;
         y = Math.sin(angle) * pupilMaxTravelRadius;
      }

      return `translate(${x}px, ${y}px)`;
    };

    // We need to get the parent of the pupil (the eye) for getBoundingClientRect,
    // as pupils themselves don't have a fixed position in the DOM to measure from initially.
    // Or, better, calculate based on avatarRef and known eye positions.

    // For simplicity and robustness, let's assume eyes are part of the avatarRef's client rect.
    // The pupil movement should be relative to its parent eye's center.
    // The pupil elements (leftPupilRef, rightPupilRef) are what we need to transform.
    // Their parent eye's bounding box is what we need.

    const updatePupils = () => {
      const leftEyeElement = leftPupilRef.current ? leftPupilRef.current.parentElement : null;
      const rightEyeElement = rightPupilRef.current ? rightPupilRef.current.parentElement : null;

      if (leftEyeElement && rightEyeElement) {
        setPupilTransform({
          left: calculatePupilTransform({ current: leftEyeElement }),
          right: calculatePupilTransform({ current: rightEyeElement }),
        });
      }
    };

    updatePupils();

  }, [mousePos]); // Recalculate on mouse move

  useEffect(() => {
    if (!avatarRef.current) return;

    const orbRect = avatarRef.current.getBoundingClientRect();
    const orbCenterX = orbRect.left + orbRect.width / 2;
    const orbCenterY = orbRect.top + orbRect.height / 2;

    // Calculate mouse position relative to the orb's center
    const deltaX = mousePos.x - orbCenterX;
    const deltaY = mousePos.y - orbCenterY;

    // Define max rotation angle
    const maxRotate = 10; // Max degrees of tilt

    // Calculate rotation: further mouse is from center, more it tilts, up to maxRotate
    // Normalize deltaX/Y by orb dimensions to get a factor, then scale by maxRotate
    // Tilt around Y-axis based on horizontal mouse position, X-axis based on vertical
    let rotateY = (deltaX / (orbRect.width / 2)) * maxRotate;
    let rotateX = -(deltaY / (orbRect.height / 2)) * maxRotate; // Negative so it tilts "towards" mouse

    // Clamp values to maxRotate
    rotateY = Math.max(-maxRotate, Math.min(maxRotate, rotateY));
    rotateX = Math.max(-maxRotate, Math.min(maxRotate, rotateX));

    setOrbTransform(`perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);

  }, [mousePos]); // Recalculate on mouse move


  // Styles are defined here. More complex interactive styles will be handled by state.
  const avatarBaseStyle = {
    width: '120px', // Slightly larger for better visual
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#202020', // Orb color
    position: 'relative',
    display: 'flex', // Using flex to help center eyes if needed, but direct positioning is used
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)', // Adding some depth
    // Transition for orb tilt will be applied via state
  };

  const eyeStyle = {
    width: '35px', // Slightly larger eyes
    height: '35px',
    borderRadius: '50%',
    backgroundColor: 'transparent', // Transparent eyes
    border: '4px solid #555555', // Eye border, slightly thicker
    position: 'absolute', // Positioned within the orb
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Positioning the eyes within the orb
  const leftEyeStyle = {
    ...eyeStyle,
    top: '35px', // Adjusted for new orb size
    left: '25px', // Adjusted for new orb size
  };

  const rightEyeStyle = {
    ...eyeStyle,
    top: '35px', // Adjusted for new orb size
    right: '25px', // Adjusted for new orb size
  };

  const pupilBaseStyle = {
    width: '15px', // Slightly larger pupils
    height: '15px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5', // Pupil color
    position: 'absolute', // Will be moved by transform
    // Transition for pupil movement will be applied via state
  };

  // Placeholder for mouse move handler and effects
  // This will be implemented in later steps

  return (
    <div
      ref={avatarRef}
      style={{ ...avatarBaseStyle, transform: orbTransform, transition: 'transform 0.1s ease-out' }}
      className="hero-avatar" // Class for responsive show/hide
    >
      <div style={leftEyeStyle} className="eye left-eye">
        <div ref={leftPupilRef} style={{ ...pupilBaseStyle, transform: pupilTransform.left, transition: 'transform 0.05s ease-out' }} className="pupil"></div>
      </div>
      <div style={rightEyeStyle} className="eye right-eye">
        <div ref={rightPupilRef} style={{ ...pupilBaseStyle, transform: pupilTransform.right, transition: 'transform 0.05s ease-out' }} className="pupil"></div>
      </div>
    </div>
  );
};

export default Avatar;
