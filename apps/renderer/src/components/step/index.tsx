import {  ReactNode } from 'react';

export const Steps = (props: { step: number; children: ReactNode[] }) => {
  return props.children[props.step];
};
