import React, { Component } from 'react';

export class TestApi extends Component {
    static displayName = TestApi.name;

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            message: "not loaded"
        };
    }


    componentDidMount() {
        this.populateData();
    }

    async populateData() {
        const data = await fetch('api/test/test-data');
        console.log(data);
        const toStr = await data.json();
        console.log(toStr);
        this.setState({ message:  toStr.message}, () => { console.log(this.state.message) });

    }

    handleClick = () => {

        const data = { id: 32 };

        fetch('api/test/test-post',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    }

    render() {
        return (
            <div>
                <h1>Testing</h1>

                <p>Data from the backend: {this.state.message}</p>

                <button onClick={ this.handleClick }>Test Send</button>
            </div>
        );
    }
}
