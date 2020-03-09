import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import dayjs from "dayjs"
import { formatDate } from "../utils/global";

export default class PostListing extends Component {
    getPostList() {
        const { postEdges } = this.props;
        const postList = postEdges.map(postEdge => {
            return {
                path: postEdge.node.fields.slug,
                tags: postEdge.node.frontmatter.tags,
                thumbnail: postEdge.node.frontmatter.thumbnail,
                title: postEdge.node.frontmatter.title,
                date: postEdge.node.fields.date,
                excerpt: postEdge.node.excerpt,
                timeToRead: postEdge.node.timeToRead,
                categories: postEdge.node.frontmatter.categories
            };
        });
        return postList;
    }

    render() {
        const { simple } = this.props;
        const postList = this.getPostList();

        return (
            <section className={`posts ${simple ? "simple" : ""}`}>
                {postList.map(post => {
                    let thumbnail;
                    if (post.thumbnail) {
                        thumbnail = post.thumbnail.childImageSharp.fixed;
                    }

                    const popular = post.categories.includes("Popular");
                    const date = formatDate(post.date);
                    const newest = dayjs(post.date) > dayjs().subtract(1, "M");

                    return (
                        <Link to={post.path} key={post.title}>
                            <div className="each">
                                {thumbnail ? (
                                    <Img fixed={thumbnail} />
                                ) : (
                                    <div />
                                )}
                                <div className="each-list-item">
                                    <h2>{post.title}</h2>
                                    {!simple && (
                                        <div className="excerpt">{date}</div>
                                    )}
                                </div>
                                {newest && (
                                    <div className="alert">
                                        <div className="new">New</div>
                                    </div>
                                )}
                                {popular && !simple && !newest && (
                                    <div className="alert">
                                        <div className="popular">Popular</div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
                <style jsx>{`
                    .posts {
                        margin: 3rem 0;
                    }
                    
                    .posts a {
                        display: block;
                    }
                    
                    .each {
                        display: grid;
                        grid-template-columns: 80px 1fr 90px;
                        align-items: start;
                        padding: 1.5rem 2rem;
                        margin: 0 -2rem;
                        border: 2px solid transparent;
                        border-radius: var(--radius);
                    }
                    
                    .each:hover {
                        border: 2px solid var(--lighter-gray);
                        background: var(--lighter-gray);
                    }

                    .each:active,
                    .each:focus {
                        border: 2px dashed var(--primary);
                        background: var(--lighter-gray);
                    }
                    
                    .posts h2 {
                        font-size: 1.1rem;
                        font-weight: 600;
                        line-height: 1.3;
                        border-bottom: none;
                        margin: 0;
                        padding: 0;
                        color: var(--article-color);
                    }
                    
                    .excerpt {
                        font-size: 1rem;
                        display: block;
                        color: var(--gray);
                        font-weight: 400;
                    }
                    
                    .posts.simple .each {
                        grid-template-columns: 50px 2fr auto;
                        align-items: center;
                        padding: 0.75rem 1rem;
                        margin: 0 -1rem;
                        border: 2px solid transparent;
                    }
                    
                    .posts.simple .each:hover {
                        border: 2px solid var(--lighter-gray);
                        background: var(--lighter-gray);
                    }
                    
                    .posts.simple .each:active,
                    .posts.simple .each:focus {
                        border: 2px dashed var(--primary);
                        background: var(--lighter-gray);
                        outline: none;
                    }

                    .posts.simple h2 {
                        padding: 0;
                        margin: 0;
                        color: var(--article-color);
                    }

                    @media (max-width: 600px) {
                        .each {
                            grid-template-columns: 50px 1fr 70px;
                            align-items: center;
                            padding: 1.25rem 0;
                            margin: 0;
                        }

                        .posts.simple .each {
                            padding: 0.5rem 0;
                            margin: 0;
                        }
                    }

                    .alert {
                        align-self: center;
                        justify-self: flex-end;
                        margin-left: 1rem;
                    }
                    
                    .alert .new {
                        display: inline-block;
                        font-size: 0.8rem;
                        background: var(--yellow);
                        color: black;
                        border-radius: var(--radius);
                        padding: 0.25rem 0.75rem;
                        text-align: center;
                    }
                
                    .alert .popular {
                        display: inline-block;
                        font-size: 0.8rem;
                        background: var(--green);
                        color: white;
                        border-radius: var(--radius);
                        padding: 0.25rem 0.75rem;
                        text-align: center;
                    }
                    
                `}</style>
            </section>
        );
    }
}
