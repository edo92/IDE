export class FormDto {
  firstName!: string;
  lastName: string;
  middleName: string;

  street: string;
  city: string;
  zip: number;

  sex: string;
  eyeColor: string;
  hairColor: string;
  height: number;
  dob: object;
  doi: object;
  doe: object;

  constructor(form: FormDto) {
    this.zip = form.zip;
    this.city = form.city;
    this.street = form.street;
    this.lastName = form.lastName;
    this.firstName = form.firstName;
    this.middleName = form.middleName;

    this.sex = form.sex;
    this.eyeColor = form.eyeColor;
    this.hairColor = form.hairColor;
    this.height = form.height;
    this.dob = form.dob;
    this.doi = form.doi;
    this.doe = form.doe;
  }
}
