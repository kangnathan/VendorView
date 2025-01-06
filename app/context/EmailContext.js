"use client";
import { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDisabled, setSetDisabled] = useState(false)
    
    return (
        <EmailContext.Provider
            value={{
                email,
                setEmail,
                isSubmitting,
                setIsSubmitting,
                isDisabled,
                setSetDisabled
            }}
        >
            {children}
        </EmailContext.Provider>
    );
};

export const useEmailContext = () => {
    const context = useContext(EmailContext);

    if (!context) {
        throw new Error("useEmailContext must be used within an EmailProvider");
    }

    return context;
};
