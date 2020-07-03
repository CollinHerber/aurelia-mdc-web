import { MdcComponent } from '@aurelia-mdc-web/base';
import { MDCTopAppBarFoundation, MDCTopAppBarAdapter, MDCTopAppBarBaseFoundation, cssClasses, strings } from '@material/top-app-bar';
import { inject, useView, customElement, PLATFORM } from 'aurelia-framework';
import { SpecificEventListener } from '@material/base';
import { bindable } from 'aurelia-typed-observable-plugin';

@inject(Element)
@useView(PLATFORM.moduleName('./mdc-top-app-bar.html'))
@customElement('mdc-top-app-bar')
export class MdcTopAppBar extends MdcComponent<MDCTopAppBarFoundation> {

  private handleNavigationClick_!: SpecificEventListener<'click'>; // assigned in initialSyncWithDOM()
  private handleWindowResize_!: SpecificEventListener<'resize'>; // assigned in initialSyncWithDOM()
  private handleTargetScroll_!: SpecificEventListener<'scroll'>; // assigned in initialSyncWithDOM()
  private navIcon_!: Element | null;
  private scrollTarget_!: EventTarget;
  hasActionItems: boolean;

  @bindable.booleanAttr
  short: boolean;

  @bindable.booleanAttr
  collapsed: boolean;

  @bindable.booleanAttr
  fixed: boolean;

  @bindable.booleanAttr
  prominent: boolean;

  @bindable.booleanAttr
  dense: boolean;

  async initialise() {
    this.scrollTarget_ = window;
  }

  initialSyncWithDOM() {
    this.handleNavigationClick_ = this.foundation?.handleNavigationClick.bind(this.foundation);
    this.handleWindowResize_ = this.foundation?.handleWindowResize.bind(this.foundation);
    this.handleTargetScroll_ = this.foundation?.handleTargetScroll.bind(this.foundation);

    this.scrollTarget_.addEventListener('scroll', this.handleTargetScroll_ as EventListener);

    this.hasActionItems = !!this.root.querySelector(strings.ACTION_ITEM_SELECTOR);

    this.navIcon_ = this.root.querySelector(strings.NAVIGATION_ICON_SELECTOR);
    if (this.navIcon_) {
      this.navIcon_.addEventListener('click', this.handleNavigationClick_ as EventListener);
    }

    const isFixed = this.root.classList.contains(cssClasses.FIXED_CLASS);
    const isShort = this.root.classList.contains(cssClasses.SHORT_CLASS);
    if (!isShort && !isFixed) {
      window.addEventListener('resize', this.handleWindowResize_ as EventListener);
    }
  }

  setScrollTarget(target: EventTarget) {
    // Remove scroll handler from the previous scroll target
    this.scrollTarget_.removeEventListener('scroll', this.handleTargetScroll_ as EventListener);

    this.scrollTarget_ = target;

    // Initialize scroll handler on the new scroll target
    this.handleTargetScroll_ = this.foundation?.handleTargetScroll.bind(this.foundation);
    this.scrollTarget_.addEventListener('scroll', this.handleTargetScroll_ as EventListener);
  }

  getDefaultFoundation() {
    // DO NOT INLINE this variable. For backward compatibility, foundations take a Partial<MDCFooAdapter>.
    // To ensure we don't accidentally omit any methods, we need a separate, strongly typed adapter variable.
    const adapter: MDCTopAppBarAdapter = {
      hasClass: (className) => this.root.classList.contains(className),
      addClass: (className) => this.root.classList.add(className),
      removeClass: (className) => this.root.classList.remove(className),
      setStyle: (property, value) => (this.root as HTMLElement).style.setProperty(property, value),
      getTopAppBarHeight: () => this.root.clientHeight,
      notifyNavigationIconClicked: () => this.emit(strings.NAVIGATION_EVENT, {}),
      getViewportScrollY: () => {
        const win = this.scrollTarget_ as Window;
        const el = this.scrollTarget_ as Element;
        return win.pageYOffset !== undefined ? win.pageYOffset : el.scrollTop;
      },
      getTotalActionItems: () => this.root.querySelectorAll(strings.ACTION_ITEM_SELECTOR).length,
    };

    let foundation: MDCTopAppBarBaseFoundation;
    if (this.root.classList.contains(cssClasses.SHORT_CLASS)) {
      foundation = new MDCTopAppBarBaseFoundation(adapter);
    } else if (this.root.classList.contains(cssClasses.FIXED_CLASS)) {
      foundation = new MDCTopAppBarBaseFoundation(adapter);
    } else {
      foundation = new MDCTopAppBarFoundation(adapter);
    }

    return foundation;
  }

}
