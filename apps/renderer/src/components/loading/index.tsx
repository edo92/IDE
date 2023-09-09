import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type LoadingProps = {
  spinning: boolean;
};

export const Loading = (props: LoadingProps) => {
  return (
    <Spin
      spinning={props.spinning}
      indicator={
        <LoadingOutlined rev={undefined} style={{ fontSize: 30 }} spin />
      }
    />
  );
};
