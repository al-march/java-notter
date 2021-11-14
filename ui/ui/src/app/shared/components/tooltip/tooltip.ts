import { Directive, ElementRef, Inject, Input, Renderer2 } from "@angular/core";
import { createPopper, Instance, Placement } from "@popperjs/core";
import { DOCUMENT } from "@angular/common";

@Directive({
  selector: '[amTooltip]',
  exportAs: 'amTooltip',
  host: {
    '(mousemove)': 'create()',
    '(mouseleave)': 'destroy()',
  },
})
export class Tooltip {

  @Input() amTooltip = '';
  @Input() placement: Placement = 'top';
  @Input() disable = false;

  trigger: HTMLElement;
  messageRef: HTMLElement | null = null;
  popperRef: Instance | null = null;
  isShow = false;

  constructor(
    private elementRef: ElementRef,
    private rendered: Renderer2,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.trigger = elementRef.nativeElement;
  }

  create() {
    if (this.disable || this.isShow) {
      return;
    }

    this.isShow = true;

    const div = <HTMLElement>this.rendered.createElement('div');
    this.rendered.setAttribute(div, 'class', 'bg-base-200 p-1 px-3 shadow-lg z-10');
    this.rendered.setProperty(div, 'innerHTML', this.amTooltip);
    this.messageRef = div;

    this.rendered.appendChild(this.doc.body, this.messageRef);

    this.popperRef = createPopper(this.trigger, this.messageRef, {
      placement: this.placement,
      modifiers: [{
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      }],
    });
  }

  destroy() {
    this.popperRef?.destroy();
    this.messageRef?.remove();
    this.isShow = false;
  }
}