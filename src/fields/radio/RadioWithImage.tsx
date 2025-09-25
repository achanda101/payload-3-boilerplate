'use client';

import React from 'react';
import Image from 'next/image';
import { useField, FieldLabel } from '@payloadcms/ui';
import type { RadioFieldLabelClientComponent } from 'payload'


export const RadioWithImage: RadioFieldLabelClientComponent = ({ path, field }) => {
  // Use a type assertion to inform TypeScript about your custom `options` shape
  const { options } = field as {
    options: {
      label: string;
      value: string;
    }[];
  };

  // Generate image paths based on the value
  const getImagePath = (value: string) => `/radiolbl_icons/${value}.png`;

  const { value, setValue } = useField({ path });

  return (
    <div>
      <FieldLabel label={field?.label} required={field?.required} path={path}/>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
        {options.map((option) => (
          <label
            key={option.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              // Example styling to show which option is selected
              border: value === option.value ? '1px solid #c7e6fe' : '1px solid transparent',
              padding: '8px',
              borderRadius: '5px',
            }}
          >
            <input
              type="radio"
              name={path}
              value={option.value}
              checked={value === option.value}
              onChange={() => setValue(option.value)}
              style={{ marginRight: '5px' }}
            />
            <span style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px',  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Image src={getImagePath(option.value)} alt={option.label} width={72} height={72} />
              <span style={{ marginLeft: '5px' }}>{option.label}</span>
            </span>
            
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioWithImage;
