import Customer from "../entity/customer";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import * as yup from "yup";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
  public static createCustomerSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  validate(entity: Customer): void {
    try {
      yup.object().shape({
        id: yup.string().required('Id is required'),
        name: yup.string().required('Name is required'),
      }).validateSync({
        id: entity.id,
        name: entity.name,
      },
      { abortEarly: false });
    } catch (errors) {
      const e = errors as yup.ValidationError;

      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: 'customer'
        })
      });
    }
  }
}