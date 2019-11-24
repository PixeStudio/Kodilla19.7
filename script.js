function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            running: false
        };
        this.watch = null;

        this.reset = this.reset.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    reset() {
        this.setState({times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }});
    }

    start() {
        if (!this.state.running) {
            this.setState({running: true});
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
        this.setState({times: this.state.times});
    }

    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
    }

    stop() {
        if (!this.state.running)
            this.reset();

        this.setState({running: false});
        clearInterval(this.watch);
    }

    print() {
        return this.format(this.state.times);
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    render() {
      return (
        <div className="app">
            <nav className="controls">
                <a href="#" className="button" id="start" onClick={this.start}>Start</a>
                <a href="#" className="button" id="stop" onClick={this.stop}>Stop</a>
            </nav>
            <div className="stopwatch">{this.print()}</div>
            <ul className="results"></ul>
        </div>
      );
    }
}

ReactDOM.render(<Stopwatch />, document.getElementById('app'));