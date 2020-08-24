'use strict';

const tbody = document.querySelector('tbody');
const options = document.getElementsByName('option');

let todoList = [];

function createTodoWorkingon() {
	const todoWorkingon = todoList.filter( aaa => aaa.state === '作業中');
	createTags(todoWorkingon);
	showTodo(todoWorkingon);
	return todoWorkingon;
}

function createTodoCompleted() {
	const todoCompleted = todoList.filter( aaa => aaa.state === '完了');
	createTags(todoCompleted);
	showTodo(todoCompleted);
	return todoCompleted;
}

function checkRadioButton() {
	createTodoWorkingon();
	createTodoCompleted();

	for (let i = 0; i < options.length; i++) {
		if (options[i].checked) {
			if (options[i].value === 'ALL') {
				createTags(todoList);
				showTodo(todoList);
			} else if (options[i].value === 'WORKINGON') {
				createTags(createTodoWorkingon());
				showTodo(createTodoWorkingon());
			} else if (options[i].value === 'COMPLETED') {
				createTags(createTodoCompleted());
				showTodo(createTodoCompleted());
			}
		}
	}
}

function createTags(test01) {

	while(tbody.firstChild) {
		tbody.removeChild(tbody.firstChild);
	}

	for (let i = 0; i < test01.length; i++) {
		const createTr = document.createElement('tr');
		tbody.appendChild(createTr);
		
		for (let i = 0; i < document.querySelectorAll('th').length; i++) {
			createTr.appendChild(document.createElement('td'));
		}
	}
}


function showTodo(test02) {

	for (let i = 0; i < test02.length; i++) {

		while(tbody.children[i].children[2].firstChild) {
			tbody.children[i].children[2].removeChild(tbody.children[i].children[2].firstChild);
		}

		while(tbody.children[i].children[3].firstChild) {
			tbody.children[i].children[3].removeChild(tbody.children[i].children[3].firstChild);
		}

		tbody.children[i].children[0].textContent = test02[i].id;
		tbody.children[i].children[1].textContent = test02[i].comment;

		const stateButton = tbody.children[i].children[2].appendChild(document.createElement('button'));
		stateButton.textContent = test02[i].state;

		if (test02[i].state === '作業中') {
			stateButton.className = 'state-button workingon-button';
		} else {
			stateButton.className = 'state-button completed-button';
		}

		const deleteButton = tbody.children[i].children[3].appendChild(document.createElement('button'));
		deleteButton.textContent = test02[i].delete;
		deleteButton.className = 'delete-button';
	}

	const getStateButton = document.getElementsByClassName("state-button");
	for(let i = 0; i < getStateButton.length; i++) {
		getStateButton[i].addEventListener("click", () => {

			if (getStateButton[i].classList.contains('workingon-button')) {
				getStateButton[i].classList.remove('workingon-button');
				getStateButton[i].classList.add('completed-button');
				test02[i].state = '完了';
				getStateButton[i].textContent = test02[i].state;
				checkRadioButton();

			} else {
				getStateButton[i].classList.remove('completed-button');
				getStateButton[i].classList.add('workingon-button');
				test02[i].state = '作業中';
				getStateButton[i].textContent = test02[i].state;
				checkRadioButton();
			}
		});
	}

	const getDeleteButton = document.getElementsByClassName("delete-button");
	for(let i = 0; i < getDeleteButton.length; i++) {
		getDeleteButton[i].addEventListener("click", () => {
			todoList.splice(test02[i].id, 1);

			for (let i = 0; i < todoList.length; i++) {
				todoList[i].id = i;
			}

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
		state: '作業中',
		delete: '削除',
	}

	todoList.push(todo);
	document.getElementById('input-task').value = '';
	checkRadioButton();
});