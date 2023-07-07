import React from 'react';

export type FloatLabelProps = {
  labelText: string;
};

type OtherProps = {
  children: React.ReactElement;
  active: boolean;
  value?: string;
  style?: Object;
};

export default function FloatingLabel({
  active,
  labelText,
  children,
  value,
  style = {},
}: FloatLabelProps & OtherProps) {
  return (
    <div style={{ display: 'flex', flexFlow: 'column-reverse', ...style }}>
      {children}
      <span
        className={
          active || value || value === 0 ? 'floating-label label' : 'label'
        }
      >
        {labelText}
      </span>
    </div>
  );
}
