import { customElement, useView, inject, PLATFORM } from 'aurelia-framework';
import { bindable } from "aurelia-typed-observable-plugin";
let inputId = 0;

@inject(Element)
@customElement('mdc-file-input')
@useView(PLATFORM.moduleName('./mdc-file-input.html'))
export class MdcFileInput {

  /** Value the input is bound to */
  @bindable
  value: any;

  /** Text that appears inside the input */
  @bindable
  text: string;

  /** Text that appears inside the button */
  @bindable
  buttonText: string;

  /** Optional. Determines if the state of the input is disabled. False by default*/
  @bindable
  disabled: boolean;

  /** Optional. Apply a input state - Changes input color */
  @bindable.string
  state: string;

  id: string = `mdc-file-input-${++inputId}`;

  elementStateClass() {
    switch (this.state) {
      case 'success':
        return 'input--success'
      case 'warning':
        return 'input--warning'
      case 'error':
        return 'input--error'
      default:
        return ''
    }
  }
}
