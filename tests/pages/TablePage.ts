import { expect, test, type Locator, type Page } from '@playwright/test';
import type { Character } from '../data/characters';
import { normalizeCharacterName } from '../data/characters';

export class TablePage {
  readonly page: Page;

  // Fixed locators
  readonly characterTable: Locator;
  readonly imageColumnHeader: Locator;
  readonly nameColumnHeader: Locator;
  readonly houseColumnHeader: Locator;
  readonly dateOfBirthColumnHeader: Locator;
  readonly actorColumnHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.characterTable = page.locator('#characterTable');
    this.imageColumnHeader = page.getByRole('columnheader', { name: 'Image' });
    this.nameColumnHeader = page.getByRole('columnheader', { name: 'Name' });
    this.houseColumnHeader = page.getByRole('columnheader', { name: 'House' });
    this.dateOfBirthColumnHeader = page.getByRole('columnheader', {
      name: 'Date of Birth',
    });
    this.actorColumnHeader = page.getByRole('columnheader', { name: 'Actor' });
  }

  // Dynamic locators
  characterRowByName(name: string): Locator {
    return this.page.locator(`#characterRow${normalizeCharacterName(name)}`);
  }

  characterNameByName(name: string): Locator {
    const normalizedName = normalizeCharacterName(name);
    return this.page.locator(`#tableCharacterName${normalizedName}`);
  }

  characterHouseByName(name: string): Locator {
    const normalizedName = normalizeCharacterName(name);
    return this.page.locator(`#tableCharacterHouse${normalizedName}`);
  }

  characterDateOfBirthByName(name: string): Locator {
    const normalizedName = normalizeCharacterName(name);
    return this.page.locator(`#tableCharacterDateOfBirth${normalizedName}`);
  }

  characterActorByName(name: string): Locator {
    const normalizedName = normalizeCharacterName(name);
    return this.page.locator(`#tableCharacterActor${normalizedName}`);
  }

  // Actions
  async goto() {
    await test.step('Open the character table page', async () => {
      await this.page.goto('/table');
    });
  }

  // Asserts
  async expectTableVisible() {
    await test.step('Check that the character table is visible', async () => {
      await expect(this.characterTable).toBeVisible();
    });
  }

  async expectMainColumnsVisible() {
    await test.step('Check that the main table columns are visible', async () => {
      await expect(this.imageColumnHeader).toBeVisible();
      await expect(this.nameColumnHeader).toBeVisible();
      await expect(this.houseColumnHeader).toBeVisible();
      await expect(this.dateOfBirthColumnHeader).toBeVisible();
      await expect(this.actorColumnHeader).toBeVisible();
    });
  }

  async expectCharacterVisible(character: Character) {
    await test.step(`Check character "${character.name}" row is visible`, async () => {
      await expect(this.characterRowByName(character.name)).toBeVisible();
    });

    await test.step(`Check character "${character.name}" name`, async () => {
      await expect(this.characterNameByName(character.name)).toHaveText(
        character.name
      );
    });

    await test.step(`Check character "${character.name}" house`, async () => {
      await expect(this.characterHouseByName(character.name)).toHaveText(
        character.house
      );
    });

    await test.step(`Check character "${character.name}" date of birth`, async () => {
      await expect(this.characterDateOfBirthByName(character.name)).toHaveText(
        character.dateOfBirth || 'Unknown'
      );
    });

    await test.step(`Check character "${character.name}" actor`, async () => {
      await expect(this.characterActorByName(character.name)).toHaveText(
        character.actor
      );
    });
  }

  async expectCharactersFromApiVisible(characters: Character[]) {
    await test.step('Check that API characters are rendered in the table', async () => {
      for (const character of characters) {
        await this.expectCharacterVisible(character);
      }
    });
  }
}
