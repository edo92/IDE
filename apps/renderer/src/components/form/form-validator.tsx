import { FormDto } from '@ide/shared/types';
import { FormInstance } from 'antd';
import type { Dayjs } from 'dayjs';

const formFileds = {
  0: ['firstName', 'lastName', 'middleName', 'zip', 'city', 'street'],
  1: [
    'sex',
    'eyeColor',
    'hairColor',
    'height',
    'weight',
    'id',
    'dob',
    'doi',
    'doe',
  ],
};

export function validateForm(form: FormInstance<FormDto>) {
  const fileds = [...formFileds[0], ...formFileds[1]];

  const formItems = fileds.map((field) => {
    const value = form.getFieldValue(field);
    if (typeof value === 'string') {
      return { [field]: value.trim().toUpperCase() };
    }
    return { [field]: value };
  });
  const _form: FormDto = Object.assign({}, ...formItems);

  ['dob', 'doi', 'doe'].forEach((field: string) => {
    const form = _form as any;
    const date = form[field] as Dayjs;
    form[field] = JSON.stringify({
      d: date.day(),
      m: date.month(),
      y: date.year(),
    });
  });
  return _form;
}

export function validateFormOnStep(
  form: FormInstance<FormDto>,
  step: number,
  callback: () => void
) {
  switch (step) {
    case 0: {
      const isValid = validateInputs(form, formFileds[0]);
      isValid && callback();
      break;
    }
    case 1: {
      const isValid = validateInputs(form, formFileds[1]);
      isValid && callback();
      break;
    }
  }
}

function validateInputs(
  form: FormInstance<FormDto>,
  fields: string[]
): boolean {
  return fields.every((field) => {
    const value = form.getFieldValue(field);

    if (typeof value === 'string') {
      return value?.length;
    }
    if (typeof value === 'number') {
      return !isNaN(value);
    }
    if (typeof value === 'object') {
      return Object.keys(value).length;
    }
    return false;
  });
}
