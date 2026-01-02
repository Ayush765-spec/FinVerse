"use client";

import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Footer } from "@/components/krypt";
import { TransactionsProvider, TransactionContext } from "@/components/krypt/context/TransactionContext";
import { ethers } from 'ethers';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

const WalletDashboard = () => {
    const context = useContext(TransactionContext);
    const [balance, setBalance] = useState<string>("0.0000");

    if (!context) return null;
    const { currentAccount, connectWallet } = context;

    useEffect(() => {
        const fetchBalance = async () => {
            if (currentAccount && window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const bal = await provider.getBalance(currentAccount);
                    setBalance(ethers.utils.formatEther(bal));
                } catch (error) {
                    console.error("Error fetching balance", error);
                }
            }
        };

        fetchBalance();
    }, [currentAccount]);

    return (
        <div className="flex flex-col items-center justify-center w-full mt-10">
            {!currentAccount ? (
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-2xl mb-4">Connect your wallet to view details</h2>
                    <button
                        onClick={connectWallet}
                        className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] text-white font-bold"
                    >
                        Connect Wallet
                    </button>
                </div>
            ) : (
                <div className="w-full md:w-1/2 p-5">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-48 sm:w-96 w-full my-5 eth-card white-glassmorphism mx-auto shadow-2xl">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm truncate">
                                    {currentAccount}
                                </p>
                                <p className="text-white font-semibold text-3xl mt-1">
                                    {balance.substring(0, 7)} ETH
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 mt-8">
                        <h3 className="text-white text-xl mb-4 border-b border-gray-700 pb-2">Wallet Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">Status</p>
                                <p className="text-green-400">Connected</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Network</p>
                                <p className="text-white">Ethereum (EVM)</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-400 text-sm">Full Address</p>
                                <p className="text-white text-xs break-all">{currentAccount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const WalletsPage = () => {
    return (
        <TransactionsProvider>
            <div className="min-h-screen gradient-bg-welcome">
                <Navbar />
                <div className="p-10 min-h-[80vh] flex flex-col items-center">
                    <h1 className="text-white text-3xl mb-2 text-gradient font-bold w-full text-center md:text-left">My Wallet</h1>
                    <WalletDashboard />
                </div>
                <Footer />
            </div>
        </TransactionsProvider>
    );
};

export default WalletsPage;
