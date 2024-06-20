import React from 'react';
import styles from './app.module.css';
import { useState } from 'react';
import Modal from './modal.js';

import { useAddTodo, useUpdateTodo, useDeleteTodo, useGetTodo } from './hooks';

export const App = () => {
	const [newTodo, setNewTodo] = useState('');
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const [curTodoId, setCurTodoId] = useState('');
	const [curTodoTitle, setCurTodoTitle] = useState('');
	const [search, setSearch] = useState('');
	const [sorted, setSorted] = useState(false);

	const refreshTodos = () => {
		setRefreshTodosFlag(!refreshTodosFlag);
	};

	const { isCreating, AddTodo } = useAddTodo(refreshTodos, newTodo, setNewTodo);
	const UpdateTodo = useUpdateTodo(
		refreshTodos,
		curTodoId,
		curTodoTitle,
		setModalActive,
		setIsUpdating,
	);

	const { isLoading, todos } = useGetTodo(refreshTodosFlag, sorted, search);

	const DeleteTodo = useDeleteTodo(
		refreshTodos,
		curTodoId,
		setModalActive,
		setIsDeleting,
	);

	const onNewTodoChange = ({ target }) => {
		setNewTodo(target.value);
	};

	const onSearchChange = ({ target }) => {
		setSearch(target.value);
		refreshTodos();
	};

	const setUpdatedTodoChange = ({ target }) => {
		setCurTodoTitle(target.value);
	};

	const sortTodo = () => {
		setSorted(!sorted);
		refreshTodos();
	};

	return (
		<div className={styles.dashboard}>
			<div className={styles.header}>
				<input
					type="text"
					placeholder="Поиск..."
					value={search}
					onChange={onSearchChange}
				/>
				<button onClick={sortTodo}>Сортировка</button>
				<div>
					<input
						type="text"
						placeholder="Добавить новое дело"
						value={newTodo}
						onChange={onNewTodoChange}
					/>
					<button disabled={isCreating || !newTodo} onClick={AddTodo}>
						Добавить
					</button>
				</div>
			</div>
			<div className={styles.todos}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					todos.map(({ id, title }) => (
						<div key={id}>
							{title}
							<button
								onClick={() => {
									setIsUpdating(true);
									setModalActive(true);
									setCurTodoId(id);
									setCurTodoTitle(title);
								}}
							>
								Редактировать
							</button>
							<button
								onClick={() => {
									setIsDeleting(true);
									setModalActive(true);
									setCurTodoId(id);
								}}
							>
								Удалить
							</button>
						</div>
					))
				)}
			</div>
			<Modal active={modalActive && isUpdating} setActive={setModalActive}>
				<input type="text" value={curTodoTitle} onChange={setUpdatedTodoChange} />
				<div>
					<button onClick={UpdateTodo}>Сохранить</button>
					<button
						onClick={() => {
							setModalActive(false);
							setIsUpdating(false);
						}}
					>
						Закрыть
					</button>
				</div>
			</Modal>
			<Modal active={modalActive && isDeleting} setActive={setModalActive}>
				<div>Удалить запись?</div>
				<div>
					<button onClick={DeleteTodo}>Удалить</button>
					<button
						onClick={() => {
							setModalActive(false);
							setIsDeleting(false);
						}}
					>
						Закрыть
					</button>
				</div>
			</Modal>
		</div>
	);
};
