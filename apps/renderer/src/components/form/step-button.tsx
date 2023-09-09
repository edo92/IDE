import styled from 'styled-components';
import { Button } from './components';

const StepButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 6px;
  padding-top: 10px;
  padding-bottom: 10px;
  button {
    width: 50%;
  }
`;

type StepButtonProps = {
  step: number;
  next: () => void;
  back: () => void;
};

export const StepButtons = ({ next, back, step }: StepButtonProps) => (
  <StepButtonsWrapper>
    <Button
      size="large"
      type="default"
      disabled={step === 0}
      style={{ color: '#1677ff' }}
      onClick={back}
    >
      Back
    </Button>

    <Button size="large" type="primary" disabled={step === 3} onClick={next}>
      Next
    </Button>
  </StepButtonsWrapper>
);
