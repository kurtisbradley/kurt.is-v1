import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import ProjectListing from "../components/ProjectListing";
import config from "../../data/SiteConfig";

export default class TagTemplate extends Component {
    render() {
        const { tag } = this.props.pageContext;
        const projectEdges = this.props.data.allMarkdownRemark.edges;

        return (
            <Layout title="Tag">
                <Helmet
                    title={`Projects tagged as "${tag}" – ${config.siteTitle}`}
                />
                <article>
                    <p>
                        Projects tagged as <u>{tag}</u>
                    </p>
                    <ProjectListing projectEdges={projectEdges} />
                </article>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query TagPage($tag: String) {
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [fields___date], order: DESC }
            filter: { frontmatter: { tags: { in: [$tag] } } }
        ) {
            totalCount
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
                        card {
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        date
                        template
                        short
                    }
                }
            }
        }
    }
`;
