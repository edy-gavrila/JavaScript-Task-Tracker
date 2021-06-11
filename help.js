const helpBtn = document.getElementById("help-btn");

helpBtn.addEventListener("click", () => {
  backdropEl.classList.remove("hidden");
  backdropEl.innerHTML = `
    <div class="modal help-dlg">
    <div>
    <h2>Help</h2>
    <ul>
    <li>Use this app to keep track of your todo list or tasks you have to complete.</li>
    <li>You can add tasks using the form at the top of the page. If the form is not showing, click "Show Form" at the top of the page. You can hide the form by clicking the same button.</li>
    <li>All the tasks you entered will be save in your browser's local storage and displayed as cards in a list in the app.</li>
    <li>To modify an app just click or tap on it and a dialog will open which will allow you to ammend any of the fields.</li>
    <li>If you want to mark a task as completed just check the "Task Already Completed" checkbox on the form when you enter the task or tap on the task and then check the "Task Completed" checkbox.</li>
    <li> To delete a task click or tap on the "X" to the right side of the task. A dialog will show asking you to confirm the action.</li>
    <li>The task will be display in the reverse order of their entry, with the last entered task at the top.</li>
    <li>Your task list will be saved on the device you entered it and will not be saved across devices.</li>
    <li>To follow: An option to group the tasks by date or by type will be added at a later time.</li>
    
    </ul>
    </div>
    <button id="close-help">Close</button>
    </div>
    `;
  const closeBtn = document.getElementById("close-help");
  closeBtn.addEventListener("click", () => {
    backdropEl.classList.add("hidden");
  });
});
