import React from "react";

const Button = ({ type, children }) => {
    return (
        <button className={type}>
            {children}
            <style jsx>{`
                button {
                    cursor: pointer;
                    font-family: var(--font-sans);
                    font-size: 1rem;
                    font-weight: 600;
                    line-height: 1;
                    color: #fff;
                    padding: 0.75rem 1rem;
                    border: none;
                    border-radius: var(--radius);
                    background: var(--primary);
                    transition: background-color var(--transition), color var(--transition);
                }

                button:hover,
                button:focus {
                    outline: none;
                    color: #fff;
                    background: var(--gray);
                }

                button.secondary {
                    background: var(--pink);
                }

                button.secondary :hover,
                button.secondary :focus {
                    background: var(--gray);
                }
            `}</style>
        </button>
    );
};

export default Button;
