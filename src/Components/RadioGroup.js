import React from "react";
import { Radio } from '@scuf/common';

export default class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Radio

                    label="B"
                    name="RadioGroup"
                    checked={this.state.value === "Value 1"}
                    onChange={() => this.setState({ value: "Value 1" })}
                />
                <Radio
                    label="M"
                    name="RadioGroup"
                    checked={this.state.value === "Value 2"}
                    onChange={() => this.setState({ value: "Value 2" })}
                />
                <Radio
                    label="R"
                    name="RadioGroup"
                    checked={this.state.value === "Value 3"}
                    onChange={() => this.setState({ value: "Value 3" })}
                />
            </div>
        );
    }
}
