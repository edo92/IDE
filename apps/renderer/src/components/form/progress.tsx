import styled from 'styled-components';
import { Steps as StepsAntd } from 'antd';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const ProgressStep = styled(StepsAntd)`
  width: 70%;
  justify-content: center;
  display: flex;
  color: #ffff;
  .ant-steps-item-title {
    color: #ffff !important;
  }
  .ant-steps-icon {
    color: #ffff !important;
  }
  .ant-steps-item-icon {
    background-color: rgb(255 247 247 / 6%) !important;
  }
`;

type ProgressProps = {
  step: number;
};

export const Progress = ({ step }: ProgressProps) => (
  <Container>
    <ProgressStep
      size="small"
      current={step}
      items={[
        {
          title: 'Finished',
        },
        {
          title: 'In Progress',
        },
        {
          title: 'Waiting',
        },
      ]}
    />
  </Container>
);
