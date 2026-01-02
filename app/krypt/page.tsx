"use client";

import { Navbar, Welcome, Footer, Services, Transactions } from "@/components/krypt";
import { TransactionsProvider } from "@/components/krypt/context/TransactionContext";

const KryptPage = () => {
    return (
        <TransactionsProvider>
            <div className="min-h-screen">
                <div className="gradient-bg-welcome">
                    <Navbar />
                    <Welcome />
                </div>
                <Services />
                <Transactions />
                <Footer />
            </div>
        </TransactionsProvider>
    );
}

export default KryptPage;
