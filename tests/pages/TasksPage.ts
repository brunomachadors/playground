import { expect, test, type Locator, type Page } from '@playwright/test';

export class TasksPage {
  readonly page: Page;

  // Fixed locators
  readonly title: Locator;
  readonly taskInput: Locator;
  readonly addButton: Locator;
  readonly taskList: Locator;
  readonly completedTaskList: Locator;
  readonly completedTasksTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByTestId('task-title');
    this.taskInput = page.getByTestId('task-input');
    this.addButton = page.getByTestId('task-submit-button');
    this.taskList = page.locator('#taskList');
    this.completedTaskList = page.locator('#completedTaskList');
    this.completedTasksTitle = page.getByRole('heading', {
      name: 'Completed Tasks',
    });
  }

  // Dynamic locators
  taskItemById(id: number): Locator {
    return this.page.getByTestId(`todo-item-${id}`);
  }

  taskTextById(id: number): Locator {
    return this.page.getByTestId(`todo-item-text-desktop-${id}`);
  }

  completeButtonById(id: number): Locator {
    return this.page.getByTestId(`todo-item-complete-button-desktop-${id}`);
  }

  editInputById(id: number): Locator {
    return this.page.getByTestId(`todo-item-edit-input-desktop-${id}`);
  }

  saveButtonById(id: number): Locator {
    return this.page.getByTestId(`todo-item-save-button-desktop-${id}`);
  }

  completedTaskById(id: number): Locator {
    return this.page.getByTestId(`completed-task-${id}`);
  }

  completedTaskTextById(id: number): Locator {
    return this.page.getByTestId(`completed-task-text-${id}`);
  }

  completedTaskStatusById(id: number): Locator {
    return this.page.getByTestId(`completed-task-status-${id}`);
  }

  // Actions
  async goto() {
    await test.step('Open the tasks page', async () => {
      await this.page.goto('/tasks');
    });
  }

  async fillTask(taskText: string) {
    await test.step(`Fill task with "${taskText}"`, async () => {
      await this.taskInput.fill(taskText);
    });
  }

  async clickAddButton() {
    await test.step('Click the add task button', async () => {
      await this.addButton.click();
    });
  }

  async addTask(taskText: string) {
    await test.step(`Add task "${taskText}"`, async () => {
      await this.fillTask(taskText);
      await this.clickAddButton();
    });
  }

  async editTask(id: number, newTaskText: string) {
    await test.step(`Edit task ${id} to "${newTaskText}"`, async () => {
      await this.taskTextById(id).dblclick();
      await this.editInputById(id).fill(newTaskText);
      await this.saveButtonById(id).click();
    });
  }

  async completeTask(id: number) {
    await test.step(`Complete task ${id}`, async () => {
      await this.completeButtonById(id).click();
    });
  }

  // Asserts
  async expectTasksPageVisible() {
    await test.step('Check that the tasks page is visible', async () => {
      await expect(this.title).toBeVisible();
      await expect(this.taskInput).toBeVisible();
      await expect(this.addButton).toBeVisible();
    });
  }

  async expectTaskVisible(id: number, taskText: string) {
    await test.step(`Check that task ${id} is visible`, async () => {
      await expect(this.taskItemById(id)).toBeVisible();
      await expect(this.taskTextById(id)).toHaveText(taskText);
    });
  }

  async expectTaskNotVisible(id: number) {
    await test.step(`Check that task ${id} is not visible`, async () => {
      await expect(this.taskItemById(id)).not.toBeVisible();
    });
  }

  async expectNoTaskWasCreated() {
    await test.step('Check that no task was created', async () => {
      await expect(this.taskList).not.toBeVisible();
    });
  }

  async expectTaskInputEmpty() {
    await test.step('Check that the task input is empty', async () => {
      await expect(this.taskInput).toHaveValue('');
    });
  }

  async expectCompletedTaskVisible(id: number, taskText: string) {
    await test.step(`Check that completed task ${id} is visible`, async () => {
      await expect(this.completedTasksTitle).toBeVisible();
      await expect(this.completedTaskList).toBeVisible();
      await expect(this.completedTaskById(id)).toBeVisible();
      await expect(this.completedTaskTextById(id)).toHaveText(taskText);
      await expect(this.completedTaskStatusById(id)).toHaveText('Complete');
    });
  }
}
