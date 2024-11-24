import React, { PureComponent, ReactElement, RefObject } from 'react';

interface ClampLinesProps {
  text: string;
  lines?: number;
  ellipsis?: string;
  buttons?: boolean;
  moreText?: string;
  lessText?: string;
  className?: string;
  delay?: number;
  stopPropagation?: boolean;
  innerElement?: string;
}

interface ClampLinesState {
  expanded: boolean;
  noClamp: boolean;
  text: string;
}

class ClampLines extends PureComponent<ClampLinesProps, ClampLinesState> {
  private element: RefObject<HTMLDivElement> = React.createRef();
  private original: string;
  private watch: boolean = true;
  private lineHeight: number = 0;
  private start: number = 0;
  private middle: number = 0;
  private end: number = 0;
  private randomID: string;
  private ssr: boolean;
  private debounced: () => void;

  static defaultProps: ClampLinesProps = {
    text: 'test',
    lines: 3,
    ellipsis: '...',
    buttons: false,
    moreText: 'Read more',
    lessText: 'Read less',
    delay: 300,
    innerElement: 'div',
  };
  constructor(props: ClampLinesProps) {
    super(props);
    this.original = props.text;
    this.randomID = Math.random().toString(36).substr(2, 10);
    this.state = {
      expanded: true,
      noClamp: false,
      text: '.',
    };
    this.ssr = typeof window === 'undefined';

    this.debounced = this.debounce(this.action, props.delay || 0);
  }

  componentDidMount() {
    if (this.props.text && !this.ssr && this.element.current) {
      this.lineHeight = this.element.current.clientHeight + 1;
      this.clampLines();
      if (this.watch) {
        window.addEventListener('resize', this.debounced);
      }
    }
  }

  componentWillUnmount() {
    if (!this.ssr) {
      window.removeEventListener('resize', this.debounced);
    }
  }

  componentDidUpdate(prevProps: ClampLinesProps) {
    if (prevProps.text !== this.props.text) {
      this.original = this.props.text;
      this.clampLines();
    }
  }

  debounce(func: () => void, wait: number, immediate?: boolean) {
    let timeout: NodeJS.Timeout | null;
    return () => {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout as NodeJS.Timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context);
    };
  }

  action() {
    if (this.watch) {
      this.setState({
        noClamp: false,
      });
      this.clampLines();
      this.setState({ expanded: !this.state.expanded });
    }
  }

  clampLines() {
    if (!this.element.current) return;
    this.setState({
      text: '',
    });
    const maxHeight = this.lineHeight * (this.props.lines || 3) + 1;
    this.start = 0;
    this.middle = 0;
    this.end = this.original.length;
    while (this.start <= this.end) {
      this.middle = Math.floor((this.start + this.end) / 2);
      this.element.current.innerText = this.original.slice(0, this.middle);
      if (this.middle === this.original.length) {
        this.setState({
          text: this.original,
          noClamp: true,
        });
        return;
      }
      this.moveMarkers(maxHeight);
    }
    this.element.current.innerText =
      this.original.slice(0, this.middle - 5) + this.getEllipsis();
    this.setState({
      text: this.original.slice(0, this.middle - 5) + this.getEllipsis(),
    });
  }

  moveMarkers(maxHeight: number) {
    if (
      this.element.current &&
      this.element.current.clientHeight <= maxHeight
    ) {
      this.start = this.middle + 1;
    } else {
      this.end = this.middle - 1;
    }
  }

  getClassName() {
    const className = this.props.className || '';
    return `clamp-lines ${className}`;
  }

  getEllipsis() {
    return this.watch && !this.state.noClamp ? this.props.ellipsis || '' : '';
  }

  getButton(): ReactElement | null {
    if (this.state.noClamp || !this.props.buttons) return null;
    const buttonText = this.watch
      ? this.props.moreText || 'Read more'
      : this.props.lessText || 'Read less';
    return (
      <button
        className="clamp-lines__button"
        onClick={this.clickHandler}
        aria-controls={`clamped-content-${this.randomID}`}
        aria-expanded={!this.state.expanded}>
        {buttonText}
      </button>
    );
  }

  clickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const { stopPropagation } = this.props;
    e.preventDefault();
    if (stopPropagation) e.stopPropagation();
    this.watch = !this.watch;
    this.watch
      ? this.clampLines()
      : this.setState({
          text: this.original,
        });
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    if (!this.props.text) {
      return null;
    }

    const innerClampElement = React.createElement(
      this.props.innerElement || 'div',
      {
        ref: this.element,
        id: !this.ssr && `clamped-content-${this.randomID}`,
        'aria-hidden': !this.ssr && this.state.expanded,
      },
      this.state.text,
    );
    return (
      <div className={this.getClassName()}>
        <div />
        {innerClampElement}
        {!this.ssr && this.getButton()}
      </div>
    );
  }
}

export default ClampLines;
