import React, { Component, Fragment } from "react";
import { Button } from "@scuf/common";
import Counter from "./counter";

class Counters extends Component {
    state = {
        counters: [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
            { id: 5, value: 0 },
        ],
        clicks: 0,
    };

    handleDelete = (counterId) => {
        const ncounters = this.state.counters.filter((c) => c.id !== counterId);
        this.setState({ counters: ncounters, clicks: this.state.clicks + 1 });
        this.props.onCountersClick();
    };

    handleIncrement = (counter) => {
        const ncounters = [...this.state.counters]; //...:clonar
        const index = ncounters.indexOf(counter);
        //ncounters[index] = { ...counter };
        ncounters[index].value++;
        this.setState({ counters: ncounters, clicks: this.state.clicks + 1 });
        this.props.onCountersClick();
    };

    handleReset = () => {
        const ncounters = this.state.counters.map((c) => {
            c.value = 0;
            return c;
        });
        this.setState({ counters: ncounters, clicks: this.state.clicks + 1 });
        this.props.onCountersClick();
    };

    handleRestart = (counter) => {
        const ncounters = [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
            { id: 5, value: 0 },
        ];
        this.setState({ counters: ncounters, clicks: this.state.clicks + 1 });
        this.props.onCountersClick();
    };

    render() {
        return (
            <React.Fragment>
                Clicks: {this.state.clicks}{" "}
                <Button
                    onClick={this.handleReset}
                    type="inline-secondary"
                    size="small"
                    content="Reset"
                />
                <Button
                    onClick={this.handleRestart}
                    type="secondary"
                    size="small"
                    content="Restart"
                />
                <br />
                <br />
                {this.state.counters.map((counter) => (
                    <Counter
                        key={counter.id}
                        onDelete={this.handleDelete}
                        onIncrement={this.handleIncrement}
                        counter={counter}
                    >
                        <h4>Contador # {counter.id}</h4>
                    </Counter>
                ))}
            </React.Fragment>
        );
    }
}

export default Counters;
