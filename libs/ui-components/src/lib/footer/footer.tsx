import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'omnifex-footer',
  styleUrl: 'footer.css',
  shadow: true,
})
export class OmnifexFooter {
  @Prop() text: string = 'Built with ❤️';
  @Prop() framework: string = '';

  render() {
    const displayText = this.framework 
      ? `${this.text} using ${this.framework}`
      : this.text;

    return (
      <footer class="footer">
        <p class="footer-text">{displayText}</p>
      </footer>
    );
  }
}
