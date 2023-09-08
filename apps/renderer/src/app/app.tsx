import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Form as FormAntd } from 'antd';
import type { Dayjs } from 'dayjs';

import { IPC } from '@ide/shared/util';
import { ChannelIPC } from '@ide/shared/constants';
import { UploadOutlined } from '@ant-design/icons';
import { SelectDirectory } from '@ide/shared/types';

import {
  Form,
  Input,
  Select,
  Button,
  Column,
  Progress,
  FormItem,
  FormGroup,
  sexOptions,
  DatePicker,
  StepButtons,
  InputNumber,
  eyeColorOptions,
  hairColorOptions,
} from '../components/form';
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

const Header = styled.div`
  position: relative;
  width: 100%;
`;

export const App: React.FC = () => {
  const [form] = FormAntd.useForm();
  const [step, setStep] = useState(0);

  const handleSubmit = async () => {
    await IPC.api.invoke(ChannelIPC.getdirectory);
  };

  const handleSelectDate = (date: Dayjs | null) => {
    form.setFieldValue('date', JSON.stringify(date));
  };

  const handleSelect = (value: unknown, name: string) => {
    form.setFieldValue(name, value as string);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(event.target.name, event.target.value);
  };

  const selectDirectory = async () => {
    const dir = await IPC.api.invoke<SelectDirectory>(ChannelIPC.getdirectory);
    form.setFieldValue('directory', dir.filePaths[0]);
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Progress step={step} />
        </Header>

        <Form form={form}>
          <Steps step={step}>
            <FormItem>
              <FormGroup title="Info">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleOnChange}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleOnChange}
                />
                <Input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  onChange={handleOnChange}
                />
              </FormGroup>

              <FormGroup title="Address">
                <Input
                  type="text"
                  name="street"
                  placeholder="Street"
                  onChange={handleOnChange}
                />
                <Column>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleOnChange}
                  />
                  <Input
                    type="text"
                    name="zip"
                    placeholder="Zip"
                    onChange={handleOnChange}
                  />
                </Column>
                <StepButtons step={step} setStep={setStep} />
              </FormGroup>
            </FormItem>

            <FormItem>
              <FormGroup title="Appearance">
                <Column>
                  <Select
                    placeholder="Person's Sex"
                    options={sexOptions}
                    onChange={(val) => handleSelect(val, 'sex')}
                  />
                  <Select
                    placeholder="Eye Color"
                    options={eyeColorOptions}
                    onChange={(val) => handleSelect(val, 'eyeColor')}
                  />
                  <Select
                    placeholder="Hair Color"
                    options={hairColorOptions}
                    onChange={(val) => handleSelect(val, 'hairColor')}
                  />
                </Column>
                <Column>
                  <InputNumber
                    name="height"
                    placeholder="Height"
                    onChange={(val) => handleSelect(val, 'height')}
                  />
                </Column>
              </FormGroup>

              <FormGroup title="ID Info">
                <Input type="text" placeholder="ID Number" />
                <Column>
                  <DatePicker
                    placeholder="Date of Birth"
                    onChange={handleSelectDate}
                  />
                  <DatePicker
                    placeholder="Date of Issue"
                    onChange={handleSelectDate}
                  />
                  <DatePicker
                    placeholder="Date of Expiry"
                    onChange={handleSelectDate}
                  />
                </Column>
              </FormGroup>
              <StepButtons step={step} setStep={setStep} />
            </FormItem>
            <FormItem>
              <FormGroup title="Select Folder">
                <Button
                  id="upload-bttn"
                  onClick={selectDirectory}
                  icon={<UploadOutlined rev={undefined} />}
                >
                  Save Output To
                </Button>
              </FormGroup>
              <Button
                type="primary"
                onClick={handleSubmit}
                disabled={!form.getFieldValue('directory')?.length}
              >
                Submit
              </Button>
            </FormItem>
          </Steps>
        </Form>
      </Wrapper>
    </Container>
  );
};
