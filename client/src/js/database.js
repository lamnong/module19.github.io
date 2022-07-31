import { openDB } from 'idb';

const DB_KEY = 'DB_KEY';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await initdb();
  // return db.put('jate', content, DB_KEY); 
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ body: content });
  const result = await request;
  console.log('Save content:', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await initdb();
  // return db.get('jate', DB_KEY)
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const data = await request;
  if (data.length > 0) {
    const result = data[data.length - 1].body;
    console.log('Get content:', result);
    return result 
  }

  console.log('No content to get.', result);
  return null
}

initdb();

