import React from 'react';
import { Form as AntForm } from 'antd';
import styled from 'styled-components';
import { generateShouldUpdateProps } from 'utils/form';
import { themeColors, themeFonSizes } from 'styles/theme';

const FormItem = styled(AntForm.Item)
  .withConfig({
    shouldForwardProp: prop =>
      !['secondaryLabel', 'labelFontWeight'].includes(prop),
  })
  .attrs(() => ({
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  }))`
    &.ant-form-item {
      & > .ant-form-item-control > &.ant-form-item-control-input > &.ant-form-item-control-input-content {  
          &.ant-input, &.ant-input-affix-wrapper, &.ant-select, &.ant-input-number {
            width: 100%;
            border: 0px;
            padding: 0rem;
  
            border-bottom: 0.1rem solid ${themeColors.lightGrey};
            &-focused {
              border-bottom: 0.1rem solid ${themeColors.primaryButton};
              box-shadow: none;
            }
            &:focus {
              box-shadow: none;
            }
          }
        }
      } 
      margin-bottom: 0;

      & .ant-form-item-label {
        padding: 0.6rem;
        display: none;
        & > label {
          padding: 0;
          font-family: Lato;
          font-style: normal;
          font-weight: 500;
          font-size: 1.2rem;
          line-height: 16px;

          letter-spacing: 0.02em;
          text-transform: uppercase;

          color: ${themeColors.primary};

          &.ant-form-item-required:before {
            display: none;
          }
          &:after {
            content: ${props =>
              props.secondaryLabel ? `'${props.secondaryLabel}'` : ''};
            display: ${props =>
              props.secondaryLabel ? 'inline-block' : 'none'};
            margin-left: 1rem;
            color: ${props => themeColors.primary};
            font-size: 1.2rem;
          }
        }
      }

      & .ant-input, & .ant-input-affix-wrapper, & .ant-select, & .ant-input-number {
        & .ant-input-number-input-wrap > input {
          padding: 0rem;
        }

        font-size: 1.4rem;

        padding: 0rem;
        width: 100%;
        border: 0px;
        border-bottom: 0.1rem solid ${themeColors.lightGrey};

        &-focused {
          box-shadow: none;
          border-bottom: 0.1rem solid ${themeColors.primaryButton};
        }
        &:focus {
          box-shadow: none;
        }
      }

      & .ant-input {
        border-bottom: 0rem solid ${themeColors.primaryButton};
      }

      & .ant-form-item-explain {
        font-size: 1.2rem;
        padding-top: 0.1rem;
      }

      & .ant-form-item-extra {
        font-size: ${themeFonSizes.small};
      }
    }
  `;

AntForm.Item = props => <FormItem {...props} />;

/**
 *
 * @type {Form.Item}
 * @description A variation of Form.Item that is already configured with shouldUpdate.
 * @param {array} dependencies - an array of Form.Item dependencies that would cause this Item to rerender
 * @param {boolean} [useShouldUpdate=true] - whether to use dependencies or shouldUpdate
 * @param {JSX} children - child component
 */
AntForm.UpdateItem = ({
  dependencies = [],
  useShouldUpdate = true,
  children = '',
}) => {
  const shouldUpdate = useShouldUpdate
    ? (prev, curr) => generateShouldUpdateProps(dependencies)(prev, curr)
    : undefined;
  return (
    <Form.Item
      noStyle={true}
      shouldUpdate={shouldUpdate}
      dependencies={useShouldUpdate ? undefined : dependencies}
    >
      {params => (typeof children === 'function' ? children(params) : children)}
    </Form.Item>
  );
};

/**
 * @type {import('antd').Form}
 */
const Form = AntForm;

export default Form;
