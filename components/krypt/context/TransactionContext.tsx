'use client';

import React, { useEffect, useState, ReactNode } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

declare global {
    interface Window {
        ethereum: any;
    }
}

interface TransactionContextType {
    transactionCount: string | null;
    connectWallet: () => Promise<void>;
    transactions: any[];
    currentAccount: string;
    isLoading: boolean;
    sendTransaction: () => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    formData: {
        addressTo: string;
        amount: string;
        keyword: string;
        message: string;
    };
}

export const TransactionContext = React.createContext<TransactionContextType | null>(null);

// Helper function safely accesses window
const getEthereum = () => {
    if (typeof window !== "undefined") {
        return window.ethereum;
    }
    return null;
};

const createEthereumContract = () => {
    const ethereum = getEthereum();
    if (!ethereum) return null;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
};

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem("transactionCount") : null);
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            const ethereum = getEthereum();
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                if (!transactionsContract) return;

                const availableTransactions = await transactionsContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map((transaction: any) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("Ethereum is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnect = async () => {
        try {
            const ethereum = getEthereum();
            if (!ethereum) return; // Silent return instead of alert on load

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfTransactionsExists = async () => {
        try {
            const ethereum = getEthereum();
            if (ethereum) {
                const transactionsContract = createEthereumContract();
                if (!transactionsContract) return;

                const currentTransactionCount = await transactionsContract.getTransactionCount();

                window.localStorage.setItem("transactionCount", currentTransactionCount);
            }
        } catch (error) {
            console.log(error);
            // throw new Error("No ethereum object"); // Don't throw to avoid crashing app if no wallet
        }
    };

    const connectWallet = async () => {
        try {
            const ethereum = getEthereum();
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async () => {
        try {
            const ethereum = getEthereum();
            if (ethereum) {
                const { addressTo, amount, keyword, message } = formData;
                const transactionsContract = createEthereumContract();
                if (!transactionsContract) return;

                const parsedAmount = ethers.utils.parseEther(amount);

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                });

                const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);

                const transactionsCount = await transactionsContract.getTransactionCount();

                setTransactionCount(transactionsCount.toNumber());
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnect();
        checkIfTransactionsExists();
    }, [transactionCount]);

    return (
        <TransactionContext.Provider
            value={{
                transactionCount,
                connectWallet,
                transactions,
                currentAccount,
                isLoading,
                sendTransaction,
                handleChange,
                formData,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
