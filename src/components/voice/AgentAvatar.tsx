import React from 'react';

interface AgentAvatarProps {
  size?: number;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ size = 72 }) => {
  // Replace the emoji with an image or SVG if you have a branded agent avatar
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #3b82f6, #1d4ed8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <span style={{ fontSize: size * 0.6, lineHeight: 1 }}>🧑‍🎤</span>
    </div>
  );
};

export default AgentAvatar;
