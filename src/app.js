import styles from './app.module.css';
import { useState, useEffect } from 'react';

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			});
	}, []);

	return (
		<div className={styles.dashboard}>
			{Array.isArray(todos) ? (
				todos.map(({ id, title }) => <div key={id}>{title}</div>)
			) : (
				<div>{todos.title}</div>
			)}
		</div>
	);
};
