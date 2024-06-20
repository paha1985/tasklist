import { useEffect, useState } from 'react';
import { ref, onValue, orderByChild, query } from 'firebase/database';
import { db } from '../firebase';

export const useGetTodo = (refreshTodosFlag, sorted, search) => {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState([]);
	useEffect(() => {
		setIsLoading(true);
		let filteredTodos = [];

		const todosDbRef = ref(db, 'todos');
		//const topUserPostsRef = query(ref(db, 'todos'), orderByChild('title'));

		onValue(todosDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || [];

			if (search) {
				filteredTodos = loadedTodos.filter((todo) => {
					const lc = todo.title.toLowerCase();
					const filter = search.toLowerCase();
					return lc.includes(filter);
				});
				setTodos(
					sorted
						? filteredTodos.sort((a, b) => (a.title > b.title ? 1 : -1))
						: filteredTodos,
				);
			} else {
				setTodos(
					sorted
						? loadedTodos.sort((a, b) => (a.title > b.title ? 1 : -1))
						: loadedTodos,
				);
			}
		});

		setIsLoading(false);
	}, [refreshTodosFlag]);
	return { isLoading, todos };
};
