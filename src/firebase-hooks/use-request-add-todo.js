import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useAddTodo = (refreshTodos, newTodo, setNewTodo) => {
	const [isCreating, setIsCreating] = useState(false);

	const AddTodo = () => {
		setIsCreating(true);
		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, { userId: 10, title: newTodo, completed: true })
			.then((responce) => {
				console.log('Запись добавдена', responce);
				setNewTodo('');
			})
			.finally(setIsCreating(false));
	};

	return { isCreating, AddTodo };
};
