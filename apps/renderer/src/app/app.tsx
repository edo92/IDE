import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
  Input,
  Select as SelectAntd,
  Button,
  Form as FormAntd,
  DatePicker as DatePickerAntd,
  InputNumber,
  Steps as StepsAntd,
  Divider,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { SelectDirectory } from '@ide/shared/types';

import { IPC } from '@ide/shared/util';
import { ChannelIPC } from '@ide/shared/constants';
import { Steps } from '../components/step';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 6rem;
  justify-content: center;
  padding-top: 2rem;
`;

const Form = styled(FormAntd)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const FormItem = styled(FormAntd.Item)`
  width: 70%;
  padding-top: 1rem;
  .ant-form-item-control-input-content {
    gap: 10px;
    display: inline-grid;
  }
`;

const TextInput = styled(Input).attrs({
  size: 'large',
})`
  &::placeholder {
    color: black;
  }
`;

const Select = styled(SelectAntd).attrs({
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

const ProgressStepWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

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

const ItemGroup = styled.div`
  display: flex;
  gap: 6px;
  width: 100%;
  justify-content: center;
  > * {
    width: 100%;
  }
`;

const LightDivider = styled(Divider)`
  min-width: 96% !important;
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: rgb(255 255 255 / 14%) !important;
`;

const Space = styled.div`
  width: 100%;
  height: 0.4rem;
`;

const DatePicker = styled(DatePickerAntd).attrs({
  size: 'large',
})``;

const UploadButton = styled(Input).attrs({
  type: 'file',
  webkitdirectory: 'true',
})`
  &::-webkit-file-upload-button {
    display: none;
    position: relative;
  }
`;
export const App: React.FC = () => {
  const [form] = FormAntd.useForm();
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);

  const handleSubmit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    IPC.api.invoke(ChannelIPC.generate, {
      firstName: form.getFieldValue('FirstName'),
      lastName: form.getFieldValue('LastName'),
      middleName: form.getFieldValue('MiddleName'),
    });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(event.target.name, event.target.value);
    setReady(true);
  };

  const selectFolderHandler = async () => {
    const dir = await IPC.api.invoke<SelectDirectory>(ChannelIPC.getdirectory);
    form.setFieldValue('directory', dir.filePaths[0]);
    setReady(true);
  };

  const StepButtons = () => (
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
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </StepButtonsWrapper>
  );

  return (
    <Container>
      <Wrapper>
        <ProgressStepWrapper>
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
        </ProgressStepWrapper>
        <Form form={form}>
          <Steps step={step}>
            <FormItem>
              <TextInput
                type="text"
                name="FirstName"
                placeholder="First Name"
                onChange={handleOnChange}
              />
              <TextInput
                type="text"
                name="LastName"
                placeholder="Last Name"
                onChange={handleOnChange}
              />
              <TextInput
                type="text"
                name="MiddleName"
                placeholder="Middle Name"
                onChange={handleOnChange}
              />

              <Space />

              <TextInput type="text" placeholder="Street" />
              <ItemGroup>
                <TextInput type="text" placeholder="City" />
                <TextInput type="text" placeholder="Zip" />
              </ItemGroup>
              <StepButtons />
            </FormItem>

            <FormItem>
              <ItemGroup>
                <Select
                  placeholder="Person's Sex"
                  options={[
                    {
                      value: 'MALE',
                      label: 'Male',
                    },
                    {
                      value: 'FEMALE',
                      label: 'Female',
                    },
                  ]}
                />
                <Select
                  placeholder="Eye Color"
                  options={[
                    {
                      value: 'BROWN',
                      label: 'Brown',
                    },
                    {
                      value: 'BLUE',
                      label: 'Blue',
                    },
                    {
                      value: 'GREEN',
                      label: 'Green',
                    },
                  ]}
                />
                <Select
                  placeholder="Hair Color"
                  options={[
                    {
                      value: 'BROWN',
                      label: 'Brown',
                    },
                    {
                      value: 'BLUE',
                      label: 'Blue',
                    },
                    {
                      value: 'GREEN',
                      label: 'Green',
                    },
                  ]}
                />
              </ItemGroup>

              <ItemGroup>
                <InputNumber size="large" placeholder="Height" />
              </ItemGroup>
              <Space />
              <ItemGroup>
                <TextInput type="text" placeholder="ID Number" />
              </ItemGroup>
              <ItemGroup>
                <DatePicker placeholder="Date of Birth" />
                <DatePicker placeholder="Date of Issue" />
                <DatePicker placeholder="Date of Expiry" />
              </ItemGroup>
              <StepButtons />
            </FormItem>

            <FormItem>
              {/* <input id="path-picker" type="file" webkitdirectory="true" /> */}
              <ItemGroup style={{ textAlign: 'center' }}>
                <h4>Select Directory</h4>
              </ItemGroup>
              <Button
                id="upload-bttn"
                icon={<UploadOutlined rev={undefined} />}
                onClick={selectFolderHandler}
              >
                Select Directory
              </Button>
              {ready && (
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </FormItem>
          </Steps>
        </Form>
      </Wrapper>
    </Container>
  );
};
