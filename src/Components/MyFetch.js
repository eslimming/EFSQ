import React from "react";

class MyFetchTimer extends React.Component {
    state = {
        items: [],
        Ciclo: 1,
    };

    async componentDidMount() {
        try {
            setInterval(async () => {
                const res = await fetch(
                    "http://worldtimeapi.org/api/timezone/America/Santiago"
                );
                const dataitems = await res.json();

                this.setState({
                    items: dataitems,
                    Ciclo: this.state.Ciclo > 9 ? 1 : this.state.Ciclo + 1,
                });
            }, 500);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const DT = this.state.items.datetime;
        // const Fecha = DT ? DT.substring(0, 10) : '';
        const Hora = DT ? DT.substring(11, 19) : "";
        const Sec = Hora ? Hora.substring(6, 8) : "";
        return <React.Fragment>{Sec}</React.Fragment>;
    }
}

export default MyFetchTimer;
