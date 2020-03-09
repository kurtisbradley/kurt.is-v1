import React, { Component } from "react";
import Helmet from "react-helmet";
import ThemeContext from '../context/ThemeContext'
import Header from "../components/Header";
import Footer from "../components/Footer";
import config from "../../data/SiteConfig";
import favicon from "../images/favicon.png";
import "../styles/global.css";

export default class MainLayout extends Component {
    static contextType = ThemeContext;
    render() {
        const { isDark } = this.context;
        const { children } = this.props;
        const { title } = this.props;
        let themeClass = "";

        if (isDark) {
            themeClass = "dark";
        }
        return (
            <div>
                <Helmet
                    htmlAttributes={{
                        class: `${themeClass}`,
                        lang: "en"
                    }}
                >
                    <meta name="description" content={config.siteDescription} />
                    <link rel="shortcut icon" type="image/png" href={favicon} />
                </Helmet>
                <Header title={title} />
                <main>{children}</main>
                <Footer />
                <style jsx>{`
                    div {
                        height: 100%;
                        padding-bottom: var(--big-gap);
                    }
                    main {
                        max-width: var(--main-content);
                        margin: 0 auto;
                        padding: 0 var(--gap);
                    }
                `}</style>
            </div>
        );
    }
}