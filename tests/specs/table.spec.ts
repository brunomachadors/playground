import { expect, test } from '../fixtures/test';
import {
  characterScenarios,
  charactersApiUrl,
  type Character,
} from '../data/characters';
import { TablePage } from '../pages/TablePage';

test.describe('Table', { tag: ['@table', '@regression'] }, () => {
  for (const characterScenario of characterScenarios) {
    test(
      `Table ${characterScenario.name} matches API`,
      { tag: ['@api', '@mock', '@happy-path', '@data-driven'] },
      async ({ page, request }) => {
        const tablePage = new TablePage(page);

        const response = await request.get(charactersApiUrl);
        expect(response.ok()).toBeTruthy();

        const apiCharacters = (await response.json()) as Character[];
        const expectedCharacter = apiCharacters[characterScenario.index];

        await test.step(
          `Check API returned "${characterScenario.name}" at position ${
            characterScenario.index + 1
          }`,
          async () => {
            expect(expectedCharacter.name).toBe(characterScenario.name);
          },
        );

        await page.route(charactersApiUrl, async (route) => {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(apiCharacters),
          });
        });

        await tablePage.goto();

        await tablePage.expectTableVisible();
        await tablePage.expectMainColumnsVisible();
        await tablePage.expectCharacterVisible(expectedCharacter);
      },
    );
  }
});
