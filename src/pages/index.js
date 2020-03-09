import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../layout";
import ProjectListing from "../components/ProjectListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class Index extends Component {
    render() {
        const { data } = this.props;
        const latestProjectEdges = data.latest.edges;

        return (
            <Layout title="Home">
                <Helmet title={`${config.siteTitle} – Full Stack Web Developer`} />
                <SEO />
                <article>
                    <div className="hero">
                        <h1>Kurtis Bradley</h1>
                        <p>
                            I work to create clean, intuitive, and impactful <Link to="/projects/" className="l-s" activeClassName="active">experiences</Link> on the web.
                        </p>
                    </div>

                    <div className="front-sections">
                        <section className="section">
                            <h3>
                                Latest Projects
                                <Link to="/projects/" className="l-b" activeClassName="active">
                                    View all
                                </Link>
                            </h3>
                            <ProjectListing simple projectEdges={latestProjectEdges} />
                        </section>
                    </div>
                </article>
                <style jsx>{`
                    .front-sections {
                        margin-top: 6rem;
                    }
                    .front-sections h3 {
                        display: flex;
                        align-items: center;
                        border-bottom: 0;
                        padding-bottom: 0;
                    }
                    .section {
                        margin: var(--small-gap) 0;
                    }
                    .section:first-of-type {
                        margin-bottom: 0;
                    }
                `}</style>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query IndexQuery {
        latest: allMarkdownRemark(
            limit: 5
            sort: { fields: [fields___date], order: DESC }
            filter: { frontmatter: { template: { eq: "project" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                        date
                    }
                    excerpt
                    timeToRead
                    frontmatter {
                        title
                        tags
                        categories
                        thumbnail {
                            childImageSharp {
                                fixed(width: 150, height: 150) {
                                    ...GatsbyImageSharpFixed
                                }
                            }
                        }
                        date
                        template
                    }
                }
            }
        }
    }
`;
