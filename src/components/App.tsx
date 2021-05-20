import React, { useEffect } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { EditorState, convertToRaw, RawDraftContentState } from 'draft-js';
import { Editor as DraftEditor } from "react-draft-wysiwyg";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/editor">Editor</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/editor">
                        <Editor />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

function Editor() {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    function saveEditorContent(raw: RawDraftContentState) {
        console.log(raw);
    }

    function handleChange(editorState: EditorState) {

        // Convert to raw js object
        const raw = convertToRaw(editorState.getCurrentContent());

        // Save raw js object to local storage
        saveEditorContent(raw);
        setEditorState(editorState);
    };

    function renderContentAsRawJs() {
        const contentState = editorState.getCurrentContent();
        const raw = convertToRaw(contentState);

        return JSON.stringify(raw, null, 2);

    }

    return <>
        <DraftEditor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleChange}
        />
        <pre>{renderContentAsRawJs()}</pre>
    </>;
}