'use strict';

const options = document.getElementsByName('option');

const todoList = [];

const tbody = document.querySelector('tbody');

const todoListId = todoList.length;

function showTodoList() {
	for (let i = 0; i < todoList.length; i++) {
		todoList[i].id = i;
		tbody.children[i].children[0].textContent = i;
		tbody.children[i].children[1].textContent = todoList[i].comment;
	}
}

function showButton() {
	const statusButton = document.createElement('button');
	const deleteButton = document.createElement('button');

	for (let i = 0; i < todoList.length; i++) {
		statusButton.textContent = todoList[i].status;
		statusButton.className = 'working-button';
		tbody.children[i].children[2].appendChild(statusButton);
		deleteButton.textContent = todoList[i].deleteBtn;
		deleteButton.className = 'delete-button';
		tbody.children[i].children[3].appendChild(deleteButton);
	}

	statusButton.addEventListener('click', e => {
		let index = Number(e.target.closest('tr').children[0].textContent);

		if (e.target.classList.contains('working-button')) {
			todoList[index].status = '完了';
			e.target.textContent = todoList[index].status;
			e.target.className = 'done-button';

			for (let i = 0; i < options.length; i++) {
				if (options[i].checked) {
					if (options[i].value === 'WORKINGON') {
						e.target.closest('tr').style.display = "none";
					}
				}
			}

		} else if (e.target.classList.contains('done-button')) {
			todoList[index].status = '作業中';
			e.target.textContent = todoList[index].status;
			e.target.className = 'working-button';

			for (let i = 0; i < options.length; i++) {
				if (options[i].checked) {
					if (options[i].value === 'DONE') {
						e.target.closest('tr').style.display = "none";
					}
				}
			}
		}
	});

	deleteButton.addEventListener('click', e => {
		todoList.splice(Number(e.target.closest('tr').children[0].textContent), 1);
		tbody.removeChild(e.target.closest('tr'));
		showTodoList();
	});
}

document.getElementById('add-btn').addEventListener('click', () => {

	const inputValue = document.getElementById('input-task').value;

	if (inputValue === '') {
		return;
	}

	const tr = document.createElement('tr');

	const todo = {
		id: todoListId,
		comment: inputValue,
		status: '作業中',
		deleteBtn: '削除',
	};

	todoList.push(todo);

	for (let i = 0; i < Object.keys(todo).length; i++) {
		const td = document.createElement('td');
		tbody.appendChild(tr).appendChild(td);

		for (let i = 0; i < options.length; i++) {
			if (options[i].checked) {
				if (options[i].value === 'DONE') {
					tr.style.display = "none";
				}
			}
		}
	}

	showTodoList();
	showButton();

	document.getElementById('input-task').value = '';
});

for (let i = 0; i < options.length; i++) {
	options[i].addEventListener('click', e => {

		if (e.target.value === 'ALL') {
			for (let i = 0; i < todoList.length; i++) {
				tbody.children[i].removeAttribute('style');
			}
		} else if (e.target.value === 'WORKINGON') {
			for (let i = 0; i < todoList.length; i++) {
				tbody.children[i].removeAttribute('style');
				if (todoList[i].status === '完了') {
					tbody.children[i].style.display = "none";
				}
			}
		} else if (e.target.value === 'DONE') {
			for (let i = 0; i < todoList.length; i++) {
				tbody.children[i].removeAttribute('style');
				if (todoList[i].status === '作業中') {
					tbody.children[i].style.display = "none";
				}
			}
		}
	});
}