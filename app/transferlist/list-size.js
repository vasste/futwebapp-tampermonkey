/* globals
gConfigurationModel models services
*/

import { BaseScript, SettingsEntry } from '../core';

export class ListSizeSettings extends SettingsEntry {
  static id = 'list-size';
  constructor() {
    super('list-size', 'Increase transfer list size', null);
    this.addSetting('Items per page on transfer market (max 30)', 'items-per-page-transfermarket', 30, 'number');
    this.addSetting('Items per page on club (max 90)', 'items-per-page-club', 90, 'number');
  }
}

class ListSize extends BaseScript {
  constructor() {
    super(ListSizeSettings.id);
  }

  activate(state) {
    super.activate(state);

    this._start();
  }

  onScreenRequest(screenId) {
    super.onScreenRequest(screenId);

    if (this._running) {
      this._start();
    }
  }

  deactivate(state) {
    super.deactivate(state);

    this._stop();
  }

  _start() {
    this._running = true;

    const itemsOnMarket = parseInt(this.getSettings()['items-per-page-transfermarket'], 10);
    const itemsOnClub = parseInt(this.getSettings()['items-per-page-club'], 10);
    services.Module.configRepository.configs.itemsPerPage.transferMarket = itemsOnMarket;
    services.Module.configRepository.configs.itemsPerPage.club = itemsOnClub;
  }

  _stop() {
    this._running = false;
    services.Module.configRepository.configs.itemsPerPage.transferMarket = 20;
    services.Module.configRepository.configs.itemsPerPage.club = 20;
  }
}

new ListSize(); // eslint-disable-line no-new
