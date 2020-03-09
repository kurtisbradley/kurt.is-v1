import React, { Component } from "react";

const defaultState = {
    dark: null,
    toggleTheme: () => {},
}

const ThemeContext = React.createContext(defaultState);

class ThemeProvider extends Component {
    state = {
        isDark: null
    };

    componentDidMount() {
        const localDark = JSON.parse(localStorage.getItem("kb-dark-mode"));
        if (localDark) {
            this.setState({ isDark: localDark });
        } else if (localDark === null) {
            this.setState({ isDark: true });
        }
    }

    componentDidUpdate(prevState) {
        const { isDark } = this.state;
        if (prevState.isDark !== isDark) {
            localStorage.setItem("kb-dark-mode", isDark);
        }
    }

    toggleTheme = () => {
        this.setState(prevState => ({ isDark: !prevState.isDark }));
    };

    render() {
        const { children } = this.props;
        const { isDark } = this.state;

        return (
            <ThemeContext.Provider
                value={{
                    isDark,
                    toggleTheme: this.toggleTheme
                }}
            >
                {children}
            </ThemeContext.Provider>
        );
    }
}

export default ThemeContext;

export { ThemeProvider };
