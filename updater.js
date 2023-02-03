const { autoUpdater } = require('electron-updater');
// const { dialog } = require('electron');

const checkForUpdates = () => {
  // console.log('Checking for updates');
  autoUpdater.logger = require('electron-log');
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.autoDownload = false;
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-available', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Найдено обновление',
        message: 'Вышла новая версия приложения. Скачать и установить?',
        buttons: ['Да', 'Нет']
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.downloadUpdate();
        }
      });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Обновление готово',
        message: 'Установить и перезагрузить приложение?',
        buttons: ['Да', 'Позже']
      })
      .then(({ response }) => {
        if (response === 0) {
          autoUpdater.quitAndInstall(false, true);
        }
      });
  });

  // Проверка и автоматическое скачивание с уведомлением
  // autoUpdater.checkForUpdatesAndNotify();
};

module.exports = { checkForUpdates };
