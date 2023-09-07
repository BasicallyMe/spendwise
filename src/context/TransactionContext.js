import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "backend/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

const TransactionContext = createContext();

export function useTransactionContext() {
  return useContext(TransactionContext);
}

export function TransactionContextProvider({ children, user }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`))
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          let updatedTransactions = [];
          snapshot.forEach((doc) => {
            updatedTransactions.push(doc.data());
          });
          setTransactions(updatedTransactions);
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <TransactionContext.Provider value={{ transactions }}>
      {children}
    </TransactionContext.Provider>
  );
}
