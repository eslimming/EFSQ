import React, { Component } from "react";
// import "@scuf/common/honeywell-dark/theme.css";
// import { Grid, Card } from "@scuf/common";

export default class Content extends Component {
    render() {
        return (
            <div>
                <h1>
                    {" "}
                    {this.props.name === "" ? "Ejemplo ForgeUI" : this.props.name}{" "}
                </h1>
            </div>
        );
    }
}
