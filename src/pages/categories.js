import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link, graphql } from "gatsby";
import kebabCase from "lodash.kebabcase";
import Layout from "../layout";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class CategoriesPage extends Component {
    render() {
        const { data } = this.props;
        const { group } = data.allMarkdownRemark;

        return (
            <Layout title="Categories">
                <SEO />
                <Helmet title={`Categories – ${config.siteTitle}`} />
                <article>
                    <p>Search by category</p>
                    <div className="tag-container">
                        {group.map(category => (
                            <Link
                                to={`/categories/${kebabCase(
                                    category.fieldValue
                                )}`}
                                key={category.fieldValue}
                                style={{ margin: "0 0.5rem 0.5rem 0" }}
                                className="l-b"
                            >
                                <span key={category.fieldValue}>
                                    {category.fieldValue}{" "}
                                    <span className="count">
                                        {category.totalCount}
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
    query CategoriesQuery {
        allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
        }
    }
`;
