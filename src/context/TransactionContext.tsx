import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "backend/firebase";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { User } from 'firebase/auth'

interface Transaction {
  id: string,
  amount: string;
  category: string;
  date: string;
  month: number;
  type: string;
  year: number;
}

interface TransactionContextType {
  transactions: Transaction[];
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function useTransactionContext(): TransactionContextType | undefined {
  return useContext(TransactionContext);
}

interface TransactionContextProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export function TransactionContextProvider({ children, user }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
        let updatedTransactions = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          updatedTransactions.push(data);
        });
        setTransactions(updatedTransactions);
      });
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
