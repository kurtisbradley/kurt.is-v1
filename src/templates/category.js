import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import ProjectListing from "../components/ProjectListing";
import config from "../../data/SiteConfig";

export default class CategoryTemplate extends Component {
    render() {
        const { category } = this.props.pageContext;
        const projectEdges = this.props.data.allMarkdownRemark.edges;

        return (
            <Layout title="Category">
                <Helmet
                    title={`Posts in category "${category}" – ${config.siteTitle}`}
                />
                <article>
                    <p>{category}</p>
                    <ProjectListing projectEdges={projectEdges} />
                </article>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query CategoryPage($category: String) {
        allMarkdownRemark(
            limit: 1000
            sort: { fields: [fields___date], order: DESC }
            filter: { frontmatter: { categories: { in: [$category] } } }
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
