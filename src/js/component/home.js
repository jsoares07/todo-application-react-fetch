import React, { useState, useEffect } from "react";
import PropTypes, { object } from "prop-types";
import ReactDOM from "react-dom";

export default function Home() {
	const [newTask, setewTask] = useState(""); //Entrada controlada (input)
	const [listTask, setListTask] = useState([]);
	const [disable, setDisable] = useState(false); //Para deshabilitar el boton y el input luego de borrar la lista y usuario

	const listEverything = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jsoares07", {
			method: "GET",
			//body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log("Info recieved", data);
				setListTask(data);
			});
	};

	const sendEverything = (newArray) => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jsoares07", {
			method: "PUT",
			body: JSON.stringify(newArray),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
			});
	};

	const deleteAll = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jsoares07", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then(() => setListTask([]));
	};

	function add(e) {
		if (e.key === "Enter") {
			if (newTask === "") {
				alert("You have to add a new task");
				return;
			} else {
				setListTask((arr) => [...arr, { label: newTask, done: false }]);
				setewTask("");
				sendEverything([...listTask, { label: newTask, done: false }]);
				return;
			}
		}
		return;
	}

	function Delete(index) {
		if (index > -1) {
			//Para validar que el arreglo no esté vacío
			let aux = listTask.filter((value, index) => index !== index);
			setListTask(aux);
			sendEverything(aux);
		}
	}

	useEffect(() => {
		listEverything();
	}, []);

	return (
		<div className="container d-flex flex-column align-items-center">
			<h1 className="style-1 my-4">To-Do List</h1>
			<ul className="list-group shadow">
				<input
					className="list-group-item full-box"
					id="input-task"
					placeholder="Type a new task"
					disabled={disable}
					onChange={(e) => setewTask(e.target.value)}
					value={newTask}
					onKeyPress={(e) => add(e)}></input>
				{listTask.length === 0 ? (
					<li className="list-group-item full-box">
						<p className="my-2">No tasks, add a task</p>
					</li>
				) : (
					listTask.map(function (name, index) {
						return (
							<li
								key={index}
								className="list-group-item full-box d-flex justify-content-between align-items-center select">
								<p className="my-2">{name.label}</p>
								<button
									type="button"
									className="btn btn-link hide"
									onClick={() => {
										Delete(index);
									}}>
									<i className="fas fa-times"></i>
								</button>
							</li>
						);
					})
				)}
				{listTask.length === 0 ? (
					""
				) : (
					<li className="list-group-item full-box number-items py-0">
						<p className="my-2">
							{listTask.length === 1
								? listTask.length + " task to do"
								: listTask.length + " tasks to do"}
						</p>
					</li>
				)}
			</ul>
			<button
				className="btn btn-danger my-4"
				disabled={disable}
				onClick={() => {
					deleteAll();
					setDisable(true);
					alert("User and tasks successfully deleted");
				}}>
				Delete user and tasks
			</button>
		</div>
	);
}
