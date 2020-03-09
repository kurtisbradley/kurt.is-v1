import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostTags from "../components/PostTags";
import Scene from "../components/RGBShift";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

export default class ProjectTemplate extends Component {
    render() {
        const { slug } = this.props.pageContext;
        const postNode = this.props.data.markdownRemark;
        const post = postNode.frontmatter;
        let image;

        if (!post.id) { post.id = slug; }
        if (!post.category_id) { post.category_id = config.postDefaultCategoryID; }
        if (post.image) { image = post.image.childImageSharp.fluid; }

        return (
            <Layout title="Project">
                <Helmet>
                    <title>{`${post.title} – ${config.siteTitle}`}</title>
                </Helmet>
                <SEO postPath={slug} postNode={postNode} postSEO />
                <article className="single-project">
                    <header>
                        <h1>{post.title}</h1>
                        <p>{post.short}</p>
                    </header>

                    {image && (<Scene image={post.image.childImageSharp.fluid} />)}

                    <div className="project-meta">
                        <PostTags tags={post.tags} />
                        <div className="project-links">
                            {post.repo && (
                                <a
                                    className="l-c github-link"
                                    href={post.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Repo
                                </a>
                            )}
                            <a
                                className="l-c live-link"
                                href={post.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Live Site
                            </a>
                            
                        </div>
                    </div>

                    <div
                        className="post"
                        dangerouslySetInnerHTML={{ __html: postNode.html }}
                    />
                </article>
                <style jsx>{`
                    header h1 {
                        font-size: 2rem;
                        margin: 0;
                    }

                    header p {
                        color: var(--gray);
                        margin: 0;
                    }

                    .project-meta {
                        display: flex;
                        justify-content: space-between;
                        align-items: start;
                    }

                    .project-links {
                        display: flex;
                    }

                    .live-link {
                        margin-left: var(--gap-half);
                    }

                    .l-c {
                        background-color: var(--pink);
                        padding: 0.25rem 1rem;
                        color: white;
                        display: block;
                        font-size: 0.9rem;
                    }

                    .l-c:hover {
                        background-color: var(--fg);
                        color: var(--bg);
                    }
                `}</style>
            </Layout>
        );
    }
}

export const pageQuery = graphql`
    query ProjectBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            timeToRead
            excerpt
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 1200) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                slug
                date
                categories
                tags
                template
                url
                repo
                short
            }
            fields {
                slug
                date
            }
        }
    }
`;
