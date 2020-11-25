import defaultHtml from '!!raw-loader!./default.html';
import stateHtml from '!!raw-loader!./state.html';
import disabledHtml from '!!raw-loader!./disabled.html';

export class Examples {
  defaultHtml = defaultHtml;
  stateHtml = stateHtml;
  disabledHtml = disabledHtml;

  states = ['success', 'warning', 'error']
  selectedState = '';
}
