import { test } from '../fixtures/test';
import { taskExamples } from '../data/tasks';
import { TasksPage } from '../pages/TasksPage';

test.describe('Tasks', { tag: ['@tasks', '@regression'] }, () => {
  test('Tasks page visible', { tag: '@smoke' }, async ({ page }) => {
    const tasksPage = new TasksPage(page);

    await tasksPage.goto();

    await tasksPage.expectTasksPageVisible();
  });

  test('Tasks add task', { tag: '@happy-path' }, async ({ page }) => {
    const tasksPage = new TasksPage(page);

    await tasksPage.goto();
    await tasksPage.addTask(taskExamples.firstTask);

    await tasksPage.expectTaskVisible(1, taskExamples.firstTask);
    await tasksPage.expectTaskInputEmpty();
  });

  test('Tasks empty task not created', { tag: '@negative' }, async ({
    page,
  }) => {
    const tasksPage = new TasksPage(page);

    await tasksPage.goto();
    await tasksPage.addTask(taskExamples.emptyTask);

    await tasksPage.expectNoTaskWasCreated();
  });

  test('Tasks edit task', { tag: ['@happy-path', '@edit'] }, async ({
    page,
  }) => {
    const tasksPage = new TasksPage(page);

    await tasksPage.goto();
    await tasksPage.addTask(taskExamples.firstTask);
    await tasksPage.editTask(1, taskExamples.editedTask);

    await tasksPage.expectTaskVisible(1, taskExamples.editedTask);
  });

  test('Tasks complete task', { tag: ['@happy-path', '@complete'] }, async ({
    page,
  }) => {
    const tasksPage = new TasksPage(page);

    await tasksPage.goto();
    await tasksPage.addTask(taskExamples.firstTask);
    await tasksPage.completeTask(1);

    await tasksPage.expectTaskNotVisible(1);
    await tasksPage.expectCompletedTaskVisible(1, taskExamples.firstTask);
  });

  test(
    'Tasks completed list visible',
    { tag: ['@happy-path', '@complete'] },
    async ({ page }) => {
      const tasksPage = new TasksPage(page);

      await tasksPage.goto();
      await tasksPage.addTask(taskExamples.firstTask);
      await tasksPage.addTask(taskExamples.secondTask);
      await tasksPage.completeTask(1);
      await tasksPage.completeTask(2);

      await tasksPage.expectCompletedTaskVisible(1, taskExamples.firstTask);
      await tasksPage.expectCompletedTaskVisible(2, taskExamples.secondTask);
    },
  );
});
