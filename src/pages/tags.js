import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import kebabCase from "lodash.kebabcase";
import Layout from "../layout";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class TagsPage extends Component {
    render() {
        const { group } = this.props.data.allMarkdownRemark;

        return (
            <Layout title="Tags">
                <SEO />
                <Helmet title={`Tags – ${config.siteTitle}`} />
                <article>
                    <p>Search by tag</p>
                    <div className="tag-container">
                        {group.map(tag => (
                            <Link 
                                to={`/tags/${kebabCase(tag.fieldValue)}`}
                                key={tag.fieldValue}
                                style={{ margin: "0 0.5rem 0.5rem 0" }}
                                className="l-b"
                            >
                                <span key={tag.fieldValue}>
                                    {tag.fieldValue}{" "}
                                    <span className="count">
                                        {tag.totalCount}
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </article>
                <style jsx>{`
                    .count {
                        color: var(--pink);
                        font-weight: 700;
                        margin-left: var(--gap-quarter);
                    }
                `}</style>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query TagsQuery {
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
    }
`;
