import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Form as FormAntd } from 'antd';
import type { Dayjs } from 'dayjs';

import { IPC } from '@ide/shared/util';
import { ChannelIPC } from '@ide/shared/constants';
import { UploadOutlined } from '@ant-design/icons';
import { FormDto, SelectDirectory } from '@ide/shared/types';

import {
  Form,
  Input,
  Select,
  Button,
  Column,
  Progress,
  FormGroup,
  GroupItem,
  sexOptions,
  DatePicker,
  StepButtons,
  InputNumber,
  eyeColorOptions,
  hairColorOptions,
  FormItem,
} from '../components/form';
import { Steps } from '../components/step';
import {
  validateForm,
  validateFormOnStep,
} from '../components/form/form-validator';

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
  const [form] = FormAntd.useForm<FormDto>();
  const [step, setStep] = useState(0);
  const [directory, setDirectory] = useState<string>('');

  const handleSubmit = async () => {
    try {
      const _form = validateForm(form);
      await IPC.api.invoke(ChannelIPC.generate, {
        form: _form,
        directory,
      });
    } catch (error) {
      console.error(error);
      throw new Error(error as string);
    }
  };

  const handleSelectDate = (date: Dayjs | null, name: string) => {
    form.setFieldValue(name, date);
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
    setDirectory(dir.filePaths[0]);
  };

  const handleNextStep = async () => {
    validateFormOnStep(form, step, () => {
      setStep(step + 1);
    });
  };

  return (
    <Container>
      <Wrapper>
        <Header>
          <Progress step={step} />
        </Header>

        <Form form={form}>
          <Steps step={step}>
            <FormGroup>
              <GroupItem title="Info">
                <FormItem>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleOnChange}
                    value={form.getFieldValue('firstName')}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleOnChange}
                    value={form.getFieldValue('lastName')}
                  />
                </FormItem>
                <FormItem>
                  <Input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    onChange={handleOnChange}
                    value={form.getFieldValue('middleName')}
                  />
                </FormItem>
              </GroupItem>

              <GroupItem title="Address">
                <Input
                  type="text"
                  name="street"
                  placeholder="Street"
                  onChange={handleOnChange}
                  value={form.getFieldValue('street')}
                />
                <Column>
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleOnChange}
                    value={form.getFieldValue('city')}
                  />
                  <InputNumber
                    type="text"
                    name="zip"
                    placeholder="Zip"
                    value={form.getFieldValue('zip')}
                    onChange={(val) => handleSelect(val, 'zip')}
                  />
                </Column>
                <StepButtons
                  step={step}
                  next={handleNextStep}
                  back={() => setStep(step - 1)}
                />
              </GroupItem>
            </FormGroup>

            <FormGroup>
              <GroupItem title="Appearance">
                <Column>
                  <FormItem>
                    <Select
                      placeholder="Person's Sex"
                      options={sexOptions}
                      value={form.getFieldValue('sex')}
                      onChange={(val) => handleSelect(val, 'sex')}
                    />
                  </FormItem>
                  <FormItem>
                    <Select
                      placeholder="Eye Color"
                      options={eyeColorOptions}
                      value={form.getFieldValue('eyeColor')}
                      onChange={(val) => handleSelect(val, 'eyeColor')}
                    />
                  </FormItem>
                  <FormItem>
                    <Select
                      placeholder="Hair Color"
                      options={hairColorOptions}
                      value={form.getFieldValue('hairColor')}
                      onChange={(val) => handleSelect(val, 'hairColor')}
                    />
                  </FormItem>
                </Column>

                <Column>
                  <InputNumber
                    name="height"
                    placeholder="Height"
                    value={form.getFieldValue('height')}
                    onChange={(val) => handleSelect(val, 'height')}
                  />
                  <InputNumber
                    name="weight"
                    placeholder="Weight"
                    value={form.getFieldValue('weight')}
                    onChange={(val) => handleSelect(val, 'weight')}
                  />
                </Column>
              </GroupItem>

              <GroupItem title="ID Info">
                <FormItem>
                  <Input
                    name="id"
                    type="text"
                    placeholder="ID Number"
                    onChange={handleOnChange}
                    value={form.getFieldValue('height')}
                  />
                </FormItem>
                <Column>
                  <DatePicker
                    name="dob"
                    placeholder="Date of Birth"
                    value={form.getFieldValue('dob')}
                    onChange={(v) => handleSelectDate(v, 'dob')}
                  />
                  <DatePicker
                    name="doi"
                    placeholder="Date of Issue"
                    value={form.getFieldValue('doi')}
                    onChange={(v) => handleSelectDate(v, 'doi')}
                  />
                  <DatePicker
                    name="doe"
                    placeholder="Date of Expiry"
                    value={form.getFieldValue('doe')}
                    onChange={(v) => handleSelectDate(v, 'doe')}
                  />
                </Column>
              </GroupItem>
              <StepButtons
                step={step}
                next={handleNextStep}
                back={() => setStep(step - 1)}
              />
            </FormGroup>
            <FormGroup>
              <GroupItem title="Select Folder">
                <Button
                  id="upload-bttn"
                  onClick={selectDirectory}
                  icon={<UploadOutlined rev={undefined} />}
                >
                  Save Output To
                </Button>
              </GroupItem>
              <Button
                type="primary"
                onClick={handleSubmit}
                disabled={!directory.length}
              >
                Submit
              </Button>
            </FormGroup>
          </Steps>
        </Form>
      </Wrapper>
    </Container>
  );
};
