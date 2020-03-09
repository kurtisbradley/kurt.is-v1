import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class BlogPage extends Component {
    state = {
        searchTerm: "",
        currentCategories: [],
        posts: this.props.data.posts.edges,
        filteredPosts: this.props.data.posts.edges
    };

    handleChange = async event => {
        const { name, value } = event.target;
        await this.setState({ [name]: value });
        this.filterPosts();
    };

    filterPosts = () => {
        const { posts, searchTerm, currentCategories } = this.state;
        let filteredPosts = posts.filter(post =>
            post.node.frontmatter.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        if (currentCategories.length > 0) {
            filteredPosts = filteredPosts.filter(
                post =>
                    post.node.frontmatter.categories &&
                    currentCategories.every(cat =>
                        post.node.frontmatter.categories.includes(cat)
                    )
            );
        }
        this.setState({ filteredPosts });
    };

    updateCategories = category => {
        const { currentCategories } = this.state;
        if (!currentCategories.includes(category)) {
            this.setState(prevState => ({
                currentCategories: [...prevState.currentCategories, category]
            }));
        } else {
            this.setState(prevState => ({
                currentCategories: prevState.currentCategories.filter(
                    cat => category !== cat
                )
            }));
        }
    };

    render() {
        const { filteredPosts, searchTerm, currentCategories } = this.state;
        const filterCount = filteredPosts.length;
        const categories = this.props.data.categories.group;

        return (
            <Layout title="Articles">
                <Helmet title={`Articles – ${config.siteTitle}`} />
                <SEO />
                <article>
                    <div className="category-container">
                        {categories.map(category => {
                            const active = currentCategories.includes(
                                category.fieldValue
                            );

                            return (
                                <div
                                    className={`category-filter ${
                                        active ? "active" : ""
                                    }`}
                                    key={category.fieldValue}
                                    onClick={async () => {
                                        await this.updateCategories(
                                            category.fieldValue
                                        );
                                        await this.filterPosts();
                                    }}
                                    onKeyUp={async (e) => {
                                        if (e.which !== 9 && e.which !== 16) {
                                            await this.updateCategories(
                                                category.fieldValue
                                            );
                                            await this.filterPosts();
                                        }
                                    }}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {category.fieldValue}
                                </div>
                            );
                        })}
                    </div>
                    <div className="search-container">
                        <input
                            className="search"
                            type="text"
                            name="searchTerm"
                            value={searchTerm}
                            placeholder="Type here to filter posts..."
                            onChange={this.handleChange}
                        />
                        <div className="filter-count">{filterCount}</div>
                    </div>
                    <PostListing postEdges={filteredPosts} />
                </article>
                <style jsx>{`
                    .category-container {
                        display: flex;
                        justify-content: flex-start;
                        margin-bottom: 1.5rem;
                        flex-wrap: wrap;
                    }
                    
                    .category-filter {
                        display: flex;
                        align-items: center;
                        font-size: 0.8rem;
                        padding: 0.25rem 0.75rem;
                        background: var(--lighter-gray);
                        border-radius: var(--radius);
                        margin-right: 0.5rem;
                        margin-bottom: 0.5rem;
                        font-weight: 600;
                        color: var(--primary);
                        cursor: pointer;
                    }
 
                    .category-filter.active {
                        background: var(--primary);
                        color: white;
                    }

                    .category-filter.active:hover {
                        
                    }

                    .category-filter:last-of-type {
                        margin-right: 0;
                    }
            
                    .category-filter:hover {
                        background: var(--primary);
                        color: white;
                    }

                    .category-filter:focus {
                        outline: none;
                    }

                    .search-container {
                        display: flex;
                        align-items: center;
                        max-width: 500px;
                        margin-bottom: 2rem;
                    }
                    
                    .search {
                        display: block;
                        background: var(--lighter-gray);
                        border: 2px solid var(--light-gray);
                        border-radius: var(--radius);
                        padding: var(--gap-half);
                        outline: none;
                        margin-bottom: 0;
                        font-family: var(--font-sans);
                        font-size: 1rem;
                        width: 100%;
                        max-width: 100%;
                        color: var(--gray);
                    }
                     
                    .search:hover {
                        background: var(--lighter-gray);
                        border: 2px solid var(--gray);
                    }
                    
                    .search:focus,
                    .search:active {
                        border: 2px solid var(--primary);
                    }

                    .filter-count {
                        width: 80px;
                        text-align: center;
                        color: var(--primary);
                        font-size: 1.2rem;
                        font-weight: 600;
                    }
                `}</style>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query BlogQuery {
        posts: allMarkdownRemark(
            limit: 2000
            sort: { fields: [fields___date], order: DESC }
            filter: { frontmatter: { template: { eq: "post" } } }
        ) {
            edges {
                node {
                    fields {
                        slug
                        date
                    }
                    excerpt(pruneLength: 180)
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
        categories: allMarkdownRemark(limit: 2000) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
        }
    }
`;
