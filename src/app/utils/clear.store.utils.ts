import { persistor } from '_store/store';

export const clearPersistedStorage = () => {
  persistor
    .purge()
    .then(() => {
      console.log('Le stockage persistant a été vidé');
    })
    .catch(error => {
      console.error('Erreur lors de la purge du stockage persistant:', error);
    });
};
