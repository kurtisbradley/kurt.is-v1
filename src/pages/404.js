import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class NotFoundPage extends Component {
    render() {
        return (
            <Layout title="404">
                <Helmet title={`404 – ${config.siteTitle}`} />
                <SEO />
                <article>
                    <h1>This page could not be found.</h1>
                        <blockquote>
                            <p>
                                Simplicity is the ultimate sophistication.
                            </p>
                        </blockquote>
                </article>
            </Layout>
        );
    }
}
