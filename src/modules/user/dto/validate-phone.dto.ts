import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validatePhone', async: false })
export class ValidatePhone implements ValidatorConstraintInterface {
  validate(phone: string) {
    return phone.length === 11;
  }

  desfaultMessage() {
    return 'Phone must have 11 digits';
  }
}
