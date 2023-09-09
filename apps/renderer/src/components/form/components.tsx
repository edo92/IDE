import styled from 'styled-components';
import {
  Form as FormAntd,
  Input as InputAntd,
  Select as SelectAntd,
  Button as ButtonAntd,
  InputNumber as InputNumberAntd,
  DatePicker as DatePickerAntd,
} from 'antd';

export const Form = styled(FormAntd)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

export const Select = styled(SelectAntd).attrs({
  size: 'large',
})`
  width: 100%;
  justify-content: center;
  color: #00000094;
  span.ant-select-selection-placeholder {
    color: #00000094;
    gap: 10px;
  }
`;

export const Input = styled(InputAntd).attrs({
  size: 'large',
})`
  &::placeholder {
    color: #222222;
  }
`;

export const InputNumber = styled(InputNumberAntd).attrs({
  size: 'large',
})`
  ::placeholder {
    color: #222222 !important;
  }
`;

export const DatePicker = styled(DatePickerAntd).attrs({
  size: 'large',
})`
  ::placeholder {
    color: #222222 !important;
  }
`;

export const FormGroup = styled.div`
  width: 70%;
  padding-top: 1rem;
  gap: 10px;
  display: inline-grid;
`;

export const FormItem = styled(FormAntd.Item)`
  margin: 0;
`;

export const Space = styled.div`
  width: 100%;
  height: 0.4rem;
`;

export const ItemGroup = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: center;
  > * {
    width: 100%;
  }
`;

export const Title = styled.h4`
  color: #ffff;
  padding: 0;
  margin: 0.75rem 0;
`;

export const Column = styled.div`
  width: 100%;
  display: flex;
  gap: 7px;
  > * {
    width: 100%;
  }
`;

export const Button = styled(ButtonAntd).attrs({
  size: 'large',
})`
  color: ${(props) => props.disabled && ` #1677ff !important`};
  opacity: ${(props) => (props.disabled ? `0.45 !important` : `1`)};
  width: 100% !important;
`;

export const GroupItem = ({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <>
    <Title>{title}</Title>
    {children}
    <Space />
  </>
);
