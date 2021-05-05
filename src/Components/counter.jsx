import React, { Component } from "react";
import { Button, Badge, Icon } from "@scuf/common";

class Counter extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <Badge color={this.getBadgeClasses()}>{this.formatCount()}</Badge>{" "}
                <Button
                    onClick={() => this.props.onIncrement(this.props.counter)}
                    type="inline-secondary"
                    size="small"
                    content="Incremento"
                />
                <Button
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                    type="secondary"
                    size="small"
                    icon={<Icon name="delete" root="common" />}
                    content="Eliminar"
                />
                <br />
                <br />
            </div>
        );
    }

    getBadgeClasses = () => {
        let classes = "";
        classes += this.props.counter.value === 0 ? "red" : "green";
        return classes;
    };

    formatCount = () => {
        return this.props.counter.value === 0 ? "Zero" : this.props.counter.value;
    };
}

export default Counter;
