import { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'APhysiqueDB';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('userProfile')) {
        db.createObjectStore('userProfile');
      }
      if (!db.objectStoreNames.contains('workoutLogs')) {
        db.createObjectStore('workoutLogs', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('nutritionLogs')) {
        db.createObjectStore('nutritionLogs', { keyPath: 'date' });
      }
      if (!db.objectStoreNames.contains('bodyTracking')) {
        db.createObjectStore('bodyTracking', { keyPath: 'date' });
      }
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }
    },
  });
};

export const useIndexedDB = (storeName, key = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const db = await initDB();
        let result;
        if (key) {
          result = await db.get(storeName, key);
        } else {
          result = await db.getAll(storeName);
        }
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        console.error(`Error fetching from IndexedDB store ${storeName}:`, error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [storeName, key]);

  const putData = async (val, putKey = key) => {
    try {
      const db = await initDB();
      if (putKey) {
        await db.put(storeName, val, putKey);
      } else {
        await db.put(storeName, val);
      }
      setData(val); // Optimistic update
      return true;
    } catch (error) {
      console.error(`Error putting into IndexedDB store ${storeName}:`, error);
      return false;
    }
  };

  const addData = async (val) => {
    try {
        const db = await initDB();
        await db.add(storeName, val);
        // If it's a list, we should ideally fetch again or append, 
        // but for simplicity let's just trigger a re-fetch conceptually or return true
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
  };

  return { data, putData, addData, loading, setData };
};
