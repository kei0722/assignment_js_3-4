'use strict';

const tbody = document.querySelector('tbody');
const options = document.getElementsByName('option');

const TYPE = {
	ALL: '全て',
	DOING: '作業中',
	DONE: '完了'
}

let todoList = [];

const createTodoWorkingOn = () => {
	const todoWorkingon = todoList.filter( todoListfiltered => todoListfiltered.state === TYPE.DOING);
	createTags(todoWorkingon);
	showTodo(todoWorkingon);
	return todoWorkingon;
}

const createTodoCompleted = () => {
	const todoCompleted = todoList.filter( todoListfiltered => todoListfiltered.state === TYPE.DONE);
	createTags(todoCompleted);
	showTodo(todoCompleted);
	return todoCompleted;
}

const checkRadioButton = () => {
	createTodoWorkingOn();
	createTodoCompleted();

	for (let i = 0; i < options.length; i++) {
		if (options[i].checked) {
			if (options[i].value === 'ALL') {
				createTags(todoList);
				showTodo(todoList);
			} else if (options[i].value === 'WORKINGON') {
				createTags(createTodoWorkingOn());
				showTodo(createTodoWorkingOn());
			} else if (options[i].value === 'COMPLETED') {
				createTags(createTodoCompleted());
				showTodo(createTodoCompleted());
			}
		}
	}
}

const createTags = tags => {

	while (tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}

	for (let i = 0; i < tags.length; i++) {
		const createTr = document.createElement('tr');
		tbody.appendChild(createTr);

		document.querySelectorAll('th').forEach( function() {
			createTr.appendChild(document.createElement('td'));
		});
	}
}

const showTodo = list => {

	for (let i = 0; i < list.length; i++) {

		while (tbody.children[i].children[2].firstChild) {
			tbody.children[i].children[2].removeChild(tbody.children[i].children[2].firstChild);
		}

		while (tbody.children[i].children[3].firstChild) {
			tbody.children[i].children[3].removeChild(tbody.children[i].children[3].firstChild);
		}

		tbody.children[i].children[0].textContent = list[i].id;
		tbody.children[i].children[1].textContent = list[i].comment;

		const stateButton = tbody.children[i].children[2].appendChild(document.createElement('button'));
		stateButton.textContent = list[i].state;

		if (list[i].state === TYPE.DOING) {
			stateButton.className = 'state-button workingon-button';
		} else {
			stateButton.className = 'state-button completed-button';
		}

		const deleteButton = tbody.children[i].children[3].appendChild(document.createElement('button'));
		deleteButton.textContent = '削除';
		deleteButton.className = 'delete-button';
	}

	const getStateButton = document.getElementsByClassName('state-button');
	for (let i = 0; i < getStateButton.length; i++) {
		getStateButton[i].addEventListener('click', () => {

			if (getStateButton[i].classList.contains('workingon-button')) {
				getStateButton[i].classList.remove('workingon-button');
				getStateButton[i].classList.add('completed-button');
				list[i].state = TYPE.DONE;
				getStateButton[i].textContent = list[i].state;
				checkRadioButton();

			} else {
				getStateButton[i].classList.remove('completed-button');
				getStateButton[i].classList.add('workingon-button');
				list[i].state = TYPE.DOING;
				getStateButton[i].textContent = list[i].state;
				checkRadioButton();
			}
		});
	}

	const getDeleteButton = document.getElementsByClassName('delete-button');
	for (let i = 0; i < getDeleteButton.length; i++) {
		getDeleteButton[i].addEventListener('click', () => {
			todoList.splice(list[i].id, 1);

			todoList.forEach( function(vale, index) {
				todoList[index].id = index;
			});

			checkRadioButton();
		});
	}
}

for (let i = 0; i < options.length; i++) {
	options[i].addEventListener('change', () => {
		checkRadioButton();
	});
}

document.getElementById('add-btn').addEventListener('click', () => {

	if (document.getElementById('input-task').value === '') {
		return;
	}

	const todo = {
		id: todoList.length,
		comment: document.getElementById('input-task').value,
		state: TYPE.DOING,
	}

	todoList.push(todo);
	document.getElementById('input-task').value = '';
	checkRadioButton();
});