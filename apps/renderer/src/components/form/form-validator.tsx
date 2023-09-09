import { FormDto } from '@ide/shared/types';
import { FormInstance } from 'antd';

export function formValidation(
  form: FormInstance<FormDto>,
  step: number,
  callback: () => void
) {
  switch (step) {
    case 0: {
      const isValid = validateInputs(form, [
        'firstName',
        'lastName',
        'middleName',
        'zip',
        'city',
        'street',
      ]);
      isValid && callback();
      break;
    }
    case 1: {
      const isValid = validateInputs(form, [
        'sex',
        'eyeColor',
        'hairColor',
        'height',
        'weight',
        'id',
        'dob',
        'doi',
        'doe',
      ]);
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
    console.log('-----', value, typeof value);

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
