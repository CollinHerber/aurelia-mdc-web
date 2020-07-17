import { ValidationController, ValidationRules, ValidationControllerFactory, Rule } from "aurelia-validation";
import { autoinject } from 'aurelia-framework';
import { MdcValidationRenderer } from "@aurelia-mdc-web/validation";

@autoinject
export class Examples {
  constructor(validationControllerFactory: ValidationControllerFactory) {
    this.validationController = validationControllerFactory.createForCurrentScope();
    this.validationController.addRenderer(new MdcValidationRenderer())
    this.rules = ValidationRules
      .ensure<Examples, string>(x => x.valueStr).required()
      .rules;
  }

  validationController: ValidationController;
  rules: Rule<Examples, unknown>[][];

  value = 0;
  valueStr: string = 'test';

  attached() {
    this.validationController.addObject(this, this.rules);
  }

  async validate() {
    const res = await this.validationController.validate();
    console.log(res);
  }
}
