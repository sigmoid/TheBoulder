import React, { useEffect, useState, useCallback } from 'react';
import debounce from 'lodash.debounce';

function EditConversation() {

    const [state, setState] = useState({ pageData: null, saveTimeout: null });
    const debouncedSave = useCallback(debounce(() => savePageData(), 500), []);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        populateData();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            savePageData();
        }
    }, []);


    /* ================== Save/Load ================== */

    const populateData = async () => {
        const data = await fetch('api/dialogue/get-conversation?' + new URLSearchParams({ id: 3 }));
        console.log(data);
        const parsed = await data.json();
        console.log(parsed);
        setState({ pageData: parsed });
    }


    const savePageData = async () => {
        console.log('saving...');

        if (state.pageData.currentPrompt !== null) {
            fetch('api/dialogue/save-prompt', {
                method: 'POST',
                body: JSON.stringify(state.pageData.currentPrompt),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            });
        }
    }

    /* ==================== State Changes ==================== */

    const handleResponseChange = (event, id) => {
        let newState = { ...state };
        newState.pageData.currentPrompt.responses.find(x => x.id === id).text = event.target.value;
        setState(newState);
        debouncedSave();
    }

    const handleAddResponse = async () => {
        const newData = await fetch('api/dialogue/add-response', {
            method: 'POST',
            body: JSON.stringify(state.pageData.currentPrompt),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        const parsed = await (newData.json());

        let newPageData = { ...state.pageData };
        newPageData.currentPrompt = parsed;
        console.log(newPageData);
        setState({ ...state, pageData: newPageData });
        debouncedSave();
    }

    const handleKeyDown = (event) => {
        if (event.ctrlKey && event.key === "Enter") {
            document.getElementById("addResponseButton").click();
        }
    }

    const handleDeleteResponse = (id) => {
        let newResponses = state.pageData.currentPrompt.responses.filter((x) => { return x.id !== id });
        let newCurrentPrompt = { ...state.pageData.currentPrompt, responses: newResponses };
        let newPageData = { ...state.pageData, currentPrompt: newCurrentPrompt };
        setState({ pageData: newPageData });
        debouncedSave();
    }

    const handlePromptChange = (event) => {
        let pageData = state.pageData;
        if (pageData.currentPrompt.texts === null || pageData.currentPrompt.texts.length === 0)
            pageData.currentPrompt.texts = [""];
        pageData.currentPrompt.texts[0].text = event.target.value;
        setState({ pageData: pageData });
        debouncedSave();
    }

    /* ===================== Render =====================*/

    const renderResponses = () => {

        return (
            <React.Fragment>
                {state.pageData.currentPrompt.responses.map(x =>
                (
                    <div key={"response-row-".concat(x.id)} className="row justify-content-between">
                        <div className="col-md-4 text-end">
                            <button onClick={() => handleDeleteResponse(x.id)} className="btn btn-sm btn-danger">X</button>
                        </div>

                        <div className="col-md-8">
                            <textarea
                                className="rounded border w-100"
                                key={"response-".concat(x.id)}
                                onChange={(ev) => handleResponseChange(ev, x.id)}
                                value={x.text}
                            >
                                {x.text}
                            </textarea>
                        </div>
                    </div>

                ))}
                <div className="row justify-content-end" key={"new-response-btn"}>
                    <div className="col-auto">
                        <button id="addResponseButton" onClick={handleAddResponse} className="btn btn-success">New Response (Ctrl+Enter)</button>
                    </div>
                </div>
            </React.Fragment>);

    }

    const renderCurrentPrompt = () => {
        return (
            <div key="currentPrompt" className="row">
                <textarea
                    className="col-md-12 rounded border m-2"
                    key="promptText"
                    onChange={handlePromptChange}
                    value={state.pageData.currentPrompt.texts[0].text}
                >
                </textarea>
            </div>
        );
    }

    const renderConversationBeat = (conversationBeat) => {
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

    const renderConversation = () => {
        if (state.pageData === null) {
            return (
                <p>loading...</p>
            );
        }
        else {
            return (
                <React.Fragment>
                    <div className="container">
                        {state.pageData.previousConversation.map(x => renderConversationBeat(x))}
                        {renderCurrentPrompt()}
                        {renderResponses()}
                    </div>
                </React.Fragment>
            );
        }
    }

    return (
        <div>
            <h1>Edit Conversation</h1>

            {renderConversation()}

        </div>
    );
}

EditConversation.displayName = 'EditConversation';

export default EditConversation;
