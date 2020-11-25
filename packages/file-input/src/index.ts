import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
export { MdcFileInput } from './mdc-file-input';

export function configure(frameworkConfig: FrameworkConfiguration) {
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./mdc-file-input')
  ]);
}
