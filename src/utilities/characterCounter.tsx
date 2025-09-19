'use client'
import React from 'react';
import { useField } from '@payloadcms/ui';

interface CharacterCounterProps {
  field: {
    name: string;
    maxLength?: number;
    [key: string]: any;
  };
  path: string;
  [key: string]: any;
}

const CharacterCounter = ({ field, path }: CharacterCounterProps): React.ReactElement => {
  const { value } = useField<string>({ path: path || field.name });
  
  const count: number = value ? value.length : 0;
  const maxLength: number | undefined = field.maxLength;
  
  if (!maxLength) {
    return (
      <div style={{ 
        marginTop: '4px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'right'
      }}>
        {count} characters
      </div>
    );
  }
  
  const remaining: number = maxLength - count;
  const isNearLimit: boolean = remaining < Math.floor(maxLength * 0.1);
  const isOverLimit: boolean = remaining < 0;
  
  return (
    <div style={{ 
      marginTop: '4px',
      fontSize: '12px',
      color: isOverLimit ? '#d32f2f' : isNearLimit ? '#ff9800' : '#666',
      textAlign: 'right'
    }}>
      {count}/{maxLength} characters
    </div>
  );
};

export default CharacterCounter;