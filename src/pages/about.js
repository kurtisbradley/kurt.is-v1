import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import Layout from "../layout";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";
import { createMagic } from "../utils/libs/magic"

export default class AboutPage extends Component {
    render() {
        return (
            <Layout title="About">
                <Helmet>
                    <title>{`About – ${config.siteTitle}`}</title>
                </Helmet>
                <SEO postPath={'/about/'} />
                <article>
                    <h3>Hi, I'm Kurtis.</h3>
                    <p>
                        A full stack developer based on the Gold Coast, Australia. 
                        I enjoy creating web <Link to="/projects/" className="l-s" activeClassName="active">experiences</Link> that flow with a touch of {" "}
                       <span className="l-s magic-create" title="Get Magical" onClick={createMagic} onKeyDown={createMagic} tabIndex={0} role="button">magic.</span>
                    </p>
                    <p>
                        I'm currently focused on all things modern JavaScipt. Particularly {" "}
                        <a href="https://reactjs.org/" className="l-c teal" target="_blank"  rel="noopener noreferrer">React</a> on {" "}
                        <a href="https://www.gatsbyjs.org/" className="l-c purple" target="_blank"  rel="noopener noreferrer">Gatsby</a> and {" "}
                        <a href="https://nextjs.org/" className="l-c invert" target="_blank"  rel="noopener noreferrer">Next.js</a> frameworks.
                    </p>
                </article>
                <style jsx>{`
                    .magic-create {
                        cursor: pointer;
                        user-select: none;
                    }
                `}</style>
            </Layout>
        );
    }
}