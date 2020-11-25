import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
export { MdcFileInput } from './mdc-file-input';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./mdc-file-input')
  ]);

  config.aurelia.use
    .plugin(PLATFORM.moduleName('@aurelia-mdc-web/button'));
}
