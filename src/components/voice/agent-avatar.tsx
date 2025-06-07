import React from 'react';
import Image from 'next/image';

interface AgentAvatarProps {
  size?: number;
}

export const AgentAvatar: React.FC<AgentAvatarProps> = ({ size = 72 }) => {
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
        padding: 4, // Small padding to create a border effect
      }}
    >
      <Image
        src="/ai-generated-avatar.png"
        alt="AI English Tutor Avatar"
        width={size - 8}
        height={size - 8}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        priority
      />
    </div>
  );
};

export default AgentAvatar;
