import { bind } from 'decko';

const SCROLL_THRESHOLD = 100;

export default function endlessScroll(params) {
  const parameters = Object.assign({
    scrollThreshold: SCROLL_THRESHOLD,
  }, params);

  return CloneComponent => {
    class ScrollComponent extends PureComponent {
      constructor(props) {
        super(props);

        this.scrollEnabled = true;
        this.scrollBody = document.querySelector('html');
        this.scrollWrapper = document.querySelector('body');
        this.scrollArea = document.getElementById('react-app');
      }

      componentWillUnmount() {
        if (this.handlerPosition) {
          this.handlerPosition(this.scrollTop);
        }

        if (this.removeEndlessScroll) {
          this.removeEndlessScroll();
        }
      }

      @bind
      setEndlessScrollPosition(position) {
        this.scrollBody.scrollTop = position || this.scrollTop;
      }

      @bind
      disableEndlessScroll() {
        this.scrollEnabled = false;
      }

      @bind
      enableEndlessScroll() {
        this.scrollEnabled = true;
      }

      @bind
      destroyEndlessScroll() {
        this.removeEndlessScroll();
      }

      @bind
      handleScrollEvent() {
        const clientHeight = this.scrollBody.clientHeight;
        const scrollHeight = this.scrollArea.scrollHeight;
        this.scrollTop = window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop ||
          0;

        const offset = scrollHeight - clientHeight - this.scrollTop;

        if (this.scrollEnabled && offset < parameters.scrollThreshold) {
          this.scrollEnabled = false;
          if (this.callback) this.callback();
        }
      }

      @bind
      initEndlessScroll(handlers) {
        this.callback = handlers.callback;
        this.handlerPosition = handlers.handlerPosition;

        window.addEventListener('scroll', this.handleScroll, { passive: false });
        window.addEventListener('resize', this.handleScroll, { passive: false });

        this.removeEndlessScroll = () => {
          delete this.callback;
          window.removeEventListener('scroll', this.handleScroll, { passive: false });
          window.removeEventListener('resize', this.handleScroll, { passive: false });
        };
      }

      render() {
        return (
          <CloneComponent
            {...this.props}
            {...this.state}
            initEndlessScroll={this.initEndlessScroll}
            enableEndlessScroll={this.enableEndlessScroll}
            disableEndlessScroll={this.disableEndlessScroll}
            destroyEndlessScroll={this.destroyEndlessScroll}
            setEndlessScrollPosition={this.setEndlessScrollPosition}
          />
        );
      }
    }

    return ScrollComponent;
  };
}
