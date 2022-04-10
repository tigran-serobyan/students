import './Form.css';
import { useParams } from 'react-router-dom';

function Form(props) {
    const { username } = useParams();
    let inputs, handleSubmit;
    let values = {};
    let allValid = false;
    if (username) {
        fetch('/student/' + username, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            res.json().then((json) => {
                values = json.student;
                let inputs = document.getElementsByTagName("input");
                for (let i in inputs) {
                    if (inputs[i] && values[inputs[i].name]) {
                        inputs[i].value = values[inputs[i].name];
                        if (inputs[i].name === "username") {
                            inputs[i].disabled = true;
                        }
                    }
                }
                let valid = props.inputs.map((input) => input.validation(values[input.name] ? values[input.name] : ''))
                allValid = eval(valid.join("&&"));
                if (document.getElementById("submit")) {
                    document.getElementById("submit").disabled = !allValid;
                }
            })
        })
    }
    let handleInput = (event) => {
        values[event.target.name] = event.target.value;
        let valid = props.inputs.map((input) => input.validation(values[input.name] ? values[input.name] : ''))
        allValid = eval(valid.join("&&"));
        if (document.getElementById("submit")) {
            document.getElementById("submit").disabled = !allValid;
        }
    }
    if (props.inputs) {
        inputs = props.inputs.map((input) => <div className="inputDiv"><label>{input.label}</label><input name={input.name} onInput={handleInput} type={input.type ? input.type : "text"} /></div>)
        let valid = props.inputs.map((input) => input.validation(values[input.name] ? values[input.name] : ''))
        allValid = eval(valid.join("&&"));
        if (document.getElementById("submit")) {
            document.getElementById("submit").disabled = !allValid;
        }
    }
    if (props.api) {
        handleSubmit = (event) => {
            event.preventDefault();
            let messages = document.getElementsByClassName("messages")[0];
            let message = document.createElement("div");
            message.innerHTML = "<b>Loading ...</b>";
            messages.appendChild(message);
            fetch(props.api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values)
            }).then((res) => {
                res.json().then((json) => {
                    message.innerHTML = "<b>" + json.status + "</b><i>" + json.message + "</i>";
                    setTimeout(() => {
                        message.remove();
                    }, 3000);
                })
            })
        }
    }
    return (
        <form className="Form" onSubmit={handleSubmit}>
            {inputs}
            <div className="inputDiv">
                <button id="submit" disabled>{props.submit}</button>
            </div>
        </form>
    );
}

export default Form;
