import { FormDto } from '@ide/shared/types';

export class GenerateBodyDto {
  form: FormDto;
  directory: string;
}

export type Response = {
  status: string;
};
