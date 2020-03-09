import React, { Component } from "react";
import { Link } from "gatsby";
import ThemeContext from "../context/ThemeContext";
import { scrollToTop } from "../utils/global";

const Logo = () => {
    return (
        <Link to="/" style={{ display: "inline-flex" }} title="Home">
            <svg height="30" viewBox="0 0 100 65" fill="var(--fg)">
                <polygon points="63.763,0 78.286,0 63.636,14.703 53.804,24.576 94.231,65 79.707,65 39.281,24.576 "/>
                <polygon points="43.659,0 58.182,0 43.534,14.703 33.702,24.576 74.126,65 59.603,65 19.176,24.576 "/>
                <polygon points="0,24.576 15.922,40.557 30.446,40.557 14.522,24.576 "/>
                <rect x="71.598" y="19.43" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 148.384 -12.3133)" width="10.289" height="10.29"/>
                <rect x="87.58" y="35.413" transform="matrix(-0.7071 0.7072 -0.7072 -0.7071 186.9669 3.6636)" width="10.29" height="10.289"/>
            </svg>

            <style jsx>{`
                svg {
                    transition: fill 0.1s ease-in;
                }
                svg:hover,
                svg:focus {
                    fill: var(--gray);
                }
            `}</style>
        </Link>
    )
}

const Toggle = ({ context }) => {
    return (
        <button
            onClick={context.toggleTheme}
            aria-label="Toggle Theme"
            title="Toggle Theme"
            type="button"
        >
            <style jsx>{`
                 button {
                    height: 20px;
                    width: 20px;
                    border: 2px solid var(--fg);
                    border-radius: 50%;
                    background: transparent;
                    cursor: pointer;
                    transition: border-color var(--transition);
                }
                button:hover,
                button:focus {
                    outline: none;
                    border-color: var(--gray);
                }
            `}</style>
        </button>
    )
}

export default class Header extends Component {
    static contextType = ThemeContext;

    render() {
        const { title } = this.props;
        const theme = this.context;

        return (
            <nav>
                <div className="header">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="title" title="Scroll to top" onClick={scrollToTop} onKeyDown={scrollToTop} role="link" tabIndex={0}>
                        {title}
                        </div>
                    <div className="menu">
                        <Link to="/about/" className="l-m" activeClassName="active">About</Link>
                        <Link to="/projects/" className="l-m" activeClassName="active">Projects</Link>
                        <Link to="/contact/"className="l-m" activeClassName="active">Contact</Link>
                    </div>
                    <div className="toggle">
                            <Toggle context={theme} />
                    </div>
                </div>
                <style jsx>{`
                    nav {
                        z-index: 10;
                        margin: var(--small-gap) auto var(--big-gap) auto;
                        position: sticky;
                        padding: var(--gap) 0;
                        top: 0;
                        background-color: var(--header-bg);
                        backdrop-filter: saturate(180%) blur(20px);
                        transition: background-color var(--transition);
                    }

                    .header {
                        margin: 0 auto;
                        padding: 0 var(--gap);
                        max-width: calc(1.5 * var(--main-content));
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                    }

                    .logo,
                    .menu,
                    .toggle {
                        display: flex;
                        align-items: center;
                    }

                    .logo {
                        flex-basis: calc(0.25 * var(--main-content));
                    }

                    .title {
                        cursor: pointer;
                        font-weight: 700;
                        flex-basis: 100px;
                    }
                    
                    .title:focus {
                        outline: none;
                    }

                    .menu {
                        flex: 1;
                        margin: 0;
                        max-width: calc(var(--main-content) - 100px);
                    }

                    .toggle {
                        flex: 1;
                        justify-content: flex-end;
                    }

                    @media (max-width: 960px) {
                        nav {
                            margin: var(--gap-double) 0;
                            padding: 0;
                            top: calc(-1 * (30px + var(--gap)));
                        }

                        .header {
                            max-width: var(--main-content);
                        }

                        .menu {
                            order: 4;
                            flex-basis: 100%;
                            margin: var(--gap) 0;
                            padding-top: var(--gap);
                            max-width: unset;
                            display: flex;
                            overflow: auto;
                            scrollbar-width: none;
                        }

                        .menu::-webkit-scrollbar {
                            display: none;
                        }

                        .logo,
                        .title,
                        .toggle {
                            flex: 1;
                            flex-basis: unset;
                        }

                        .title {
                            text-align: center;
                        }
                    }
                `}</style>
            </nav>
        );
    }
}
