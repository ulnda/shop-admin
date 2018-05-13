export default function endlessScroll(params) {
  const parameters = Object.assign({
    scrollThreshold: 100,
  }, params);

  return CloneComponent => {
    class ScrollComponent extends PureComponent {
      constructor(props) {
        super(props);

        this.scrollEnabled = true;
        this.scrollBody = document.querySelector('html');
        this.scrollWrapper = document.querySelector('body');
        this.scrollArea = document.getElementById('react-app');

        this.initEndlessScroll = this.initEndlessScroll.bind(this);
        this.destroyEndlessScroll = this.destroyEndlessScroll.bind(this);
        this.disableEndlessScroll = this.disableEndlessScroll.bind(this);
        this.enableEndlessScroll = this.enableEndlessScroll.bind(this);
        this.setEndlessScrollPosition = this.setEndlessScrollPosition.bind(this);
        this.handleScroll = this.handleScrollEvent.bind(this);
      }

      componentWillUnmount() {
        if (this.handlerPosition) {
          this.handlerPosition(this.scrollTop);
        }

        if (this.removeEndlessScroll) {
          this.removeEndlessScroll();
        }
      }

      setEndlessScrollPosition(position) {
        this.scrollBody.scrollTop = position || this.scrollTop;
      }

      disableEndlessScroll() {
        this.scrollEnabled = false;
      }

      enableEndlessScroll() {
        this.scrollEnabled = true;
      }

      destroyEndlessScroll() {
        this.removeEndlessScroll();
      }

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

    ScrollComponent.propTypes = {
      initEndlessScroll: PropTypes.func,
      enableEndlessScroll: PropTypes.func,
      disableEndlessScroll: PropTypes.func,
      destroyEndlessScroll: PropTypes.func,
      setEndlessScrollPosition: PropTypes.func,
    };

    return ScrollComponent;
  };
}
