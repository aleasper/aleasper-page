// remote/src/App.js
import React from "react";
import ReactDOM from "react-dom/client";

export const App = () => {
    return <div>Hello from the other side</div>;
};

const mount = (id) => {
    console.log('MOUNT REACT IN ', id);
    const root = ReactDOM.createRoot(document.getElementById(id));
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export { mount };