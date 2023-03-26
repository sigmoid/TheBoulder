import React, { Component } from 'react';

export class EditConversation extends Component {
    static displayName = EditConversation.name;

    constructor(props) {
        super(props);
        this.state = {
            currentCount: 0,
            pageData: null,
            newResponseId : -1
        };
    }


    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
        this.populateData();
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    async populateData() {
        const data = await fetch('api/dialogue/get-conversation?' + new URLSearchParams({ id: 1 }));
        console.log(data);
        const parsed = await data.json();
        console.log(parsed);
        this.setState({ pageData: parsed }, () => { });

    }



    handleResponseChange = (event, id) => {

    }

    handleAddResponse = () => {
        let newPageData = this.state.pageData;

        newPageData.currentPrompt.responses.push({id: this.state.newResponseId, text:"response"});

        console.log(this.state.newResponseId);

        this.setState({ pageData: newPageData, newResponseId:this.state.newResponseId - 1 });
    }

    handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            document.getElementById("addResponseButton").click();
        }
    }

    handleDeleteResponse = (id) => {
        console.log("deleting ", id);
        let newResponses = this.state.pageData.currentPrompt.responses.filter((x) => { return x.id !== id });
        let newCurrentPrompt = { ...this.state.pageData.currentPrompt, responses: newResponses };
        let newPageData = { ...this.state.pageData, currentPrompt: newCurrentPrompt };
        console.log(newPageData.responses);
        this.setState({ pageData: newPageData });
    }

    handlePromptChange = (event) => {
        let pageData = this.state.pageData;
        if (pageData.currentPrompt.texts === null || pageData.currentPrompt.texts.length === 0)
            pageData.currentPrompt.texts = [""];
        pageData.currentPrompt.texts[0].text = event.target.value;
        this.setState({ pageData: pageData });
    }

    /* ===================== Render =====================*/

    renderResponses = () => {
        return (
            <React.Fragment>
                {this.state.pageData.currentPrompt.responses.map(x =>
                (
                    <div key={"response-row-".concat(x.id)} className="row justify-content-between">
                        <div className="col-md-4 text-end">
                            <button onClick={() => this.handleDeleteResponse(x.id)} className="btn btn-sm btn-danger">X</button>
                        </div>

                        <div className="col-md-8">
                            <textarea
                                className="rounded border w-100"
                                key={"response-".concat(x.id)}
                                onChange={() => this.handleResponseChange(x.id)}
                                value={x.text}
                            >
                                {x.text}
                            </textarea>
                        </div>
                    </div>

                ))}
                <div className="row justify-content-end" key={"new-response-btn"}>
                    <div className="col-auto">
                        <button id="addResponseButton" onClick={this.handleAddResponse} className="btn btn-success">New Response (Ctrl+Enter)</button>
                    </div>
                </div>
            </React.Fragment>);

    }

    renderCurrentPrompt = () => {
        return (
            <div key="currentPrompt" className="row">
                <textarea
                    className="col-md-12 rounded border m-2"
                    key="promptText"
                    onChange={this.handlePromptChange}
                    value={this.state.pageData.currentPrompt.texts[0].text}
                >
                </textarea>
            </div>
        );
    }

    renderConversationBeat = (conversationBeat) => {
        const itemKey = (conversationBeat.promptId !== null) ? conversationBeat.promptId : conversationBeat.responseId;

        if (conversationBeat.promptId !== null) {
            return (
                <div key={'prompt'.concat(conversationBeat.promptId)} className="row">
                    <div className="col-md-12 rounded border m-2">
                        <div className="prompt">{conversationBeat.text}</div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div key={'response'.concat(conversationBeat.responseId)} className="row">
                    <div className="col-md-12 rounded border m-2 bg-light ">
                        <div className="response">{conversationBeat.text}</div>
                    </div>
                </div>
            );
        }

    }

    renderConversation = () => {
        if (this.state.pageData === null) {
            return (
                <p>loading...</p>
            );
        }
        else {
            return (
                <React.Fragment>
                    <div className="container">
                        {this.state.pageData.previousConversation.map(x => this.renderConversationBeat(x))}
                        {this.renderCurrentPrompt()}
                        {this.renderResponses()}
                    </div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>Edit Conversation</h1>

                {this.renderConversation()}

            </div>
        );
    }
}
