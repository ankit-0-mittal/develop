import React, { useState } from 'react';
import { FloatingLabel, FloatLabelProps, Form } from 'app/components/atoms';
import { get } from 'lodash';

type TextInputProps = {
  name: string;
  fixed?: Boolean;
  listName?: string;
};

export default function FloatLabelFormInput({
  name = '',
  fixed = false,
  listName = '',
  children,
  ...otherProps
}: TextInputProps & FloatLabelProps) {
  const [active, setActive] = useState(fixed);
  const onBlur = () => {
    setActive(fixed);
  };
  const onFocus = () => {
    setActive(true);
  };

  const addPropsAndRenderChild = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.

    if (React.isValidElement(child)) {
      return React.cloneElement(child, { onBlur, onFocus });
    }
    return child;
  });

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, currentValues) =>
        prevValues[name] !== currentValues[name]
      }
    >
      {({ getFieldValue }) => (
        <FloatingLabel
          active={active}
          value={
            listName !== ''
              ? get(getFieldValue(listName, name), name)
              : getFieldValue(name)
          }
          {...otherProps}
        >
          {addPropsAndRenderChild}
        </FloatingLabel>
      )}
    </Form.Item>
  );
}
