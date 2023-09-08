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
  setStep: (n: number) => void;
};

export const StepButtons = ({ setStep, step }: StepButtonProps) => (
  <StepButtonsWrapper>
    <Button
      size="large"
      type="default"
      disabled={step === 0}
      style={{ color: '#1677ff' }}
      onClick={() => setStep(step - 1)}
    >
      Back
    </Button>

    <Button
      size="large"
      type="primary"
      disabled={step === 3}
      onClick={() => setStep(step + 1)}
    >
      Next
    </Button>
  </StepButtonsWrapper>
);
