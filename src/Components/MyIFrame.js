import React, { Component } from "react";

class MyIFrame extends Component {
    render() {
        return (
            <React.Fragment>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/hEtHfel_lbY"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen="true"
                ></iframe>
            </React.Fragment>
        );
    }
}

export default MyIFrame;
