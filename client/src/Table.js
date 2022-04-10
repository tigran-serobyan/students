import './Table.css';
import { Link } from 'react-router-dom';

function Table(props) {
    let head, body;
    let del = (e) => {
        let messages = document.getElementsByClassName("messages")[0];
        let message = document.createElement("div");
        message.innerHTML = "<b>Loading ...</b>";
        messages.appendChild(message);
        fetch('/student', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: e.target.id })
        }).then((res) => {
            res.json().then((json) => {
                message.innerHTML = "<b>" + json.status + "</b><i>" + json.message + "</i>";
                setTimeout(() => {
                    message.remove();
                }, 3000);
            })
        })
    }
    if (props.head) {
        head = props.head.map((title) => <th>{title}</th>)
    }
    if (props.body) {
        body = props.body.map((row) => <tr>{row.map((i) => <td>{i}</td>)}<td><Link to={"/student/" + row[2]}>Edit</Link><button onClick={del} id={row[2]}>Delete</button></td></tr>)
    }
    return (
        <table className="Table">
            <thead>
                <tr>
                    {head}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    );
}

export default Table;
