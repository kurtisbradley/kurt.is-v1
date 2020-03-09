import React, { Component } from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import dayjs from "dayjs"

export default class ProjectListing extends Component {
    getProjectList() {
        const { projectEdges } = this.props;
        const projectList = projectEdges.map(projectEdge => {
            return {
                path: projectEdge.node.fields.slug,
                tags: projectEdge.node.frontmatter.tags,
                thumbnail: projectEdge.node.frontmatter.thumbnail,
                card: projectEdge.node.frontmatter.card,
                title: projectEdge.node.frontmatter.title,
                date: projectEdge.node.fields.date,
                excerpt: projectEdge.node.excerpt,
                timeToRead: projectEdge.node.timeToRead,
                categories: projectEdge.node.frontmatter.categories,
                short: projectEdge.node.frontmatter.short
            };
        });
        return projectList;
    }

    render() {
        const { simple } = this.props;
        const projectList = this.getProjectList();

        return (
            <>
                {projectList.map(project => {
                    let thumbnail, card;
                    if (project.thumbnail) { thumbnail = project.thumbnail.childImageSharp.fixed; }
                    if (project.card) { card = project.card.childImageSharp.fluid; }

                    const newest = dayjs(project.date) > dayjs().subtract(1, "M");

                    return (
                        <React.Fragment key={project.path}>
                            <Link to={project.path} key={project.title}>
                                <section className={simple && ('simple')}>
                                   {thumbnail && simple && (
                                        <Img fixed={thumbnail} />
                                    )} 
                                    <div className="entry-item">
                                        <p className="title clamp">{project.title}</p>
                                        {!simple && ( <p className="excerpt clamp">{project.short}</p>)}
                                    </div>
                                    {newest && simple && (
                                        <div className="alert">
                                            <div className="new">New</div>
                                        </div>
                                    )}
                                </section>
                            </Link>
                    
                            <style jsx>{`
                                section {
                                    background-image: ${card && (`url(${card.src})`)};
                                    background-position: top center;
                                }
                            `}</style>

                            <style jsx>{`
                                section {
                                    position: relative;
                                    height: calc(1.4 * var(--big-gap));
                                    object-fit: cover;
                                    background-size: cover;
                                    background-repeat: no-repeat;
                                    background-color: var(--lighter-gray);
                                    border-radius: var(--radius-double);
                                    overflow: hidden;
                                    margin-top: var(--gap-double);
                                }

                                section::before {
                                    content: '';
                                    pointer-events: none;
                                    display: block;
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                    bottom: 0;
                                    left: 0;
                                    border-radius: var(--radius);
                                    background: radial-gradient(
                                      circle at center,
                                      white 10%,
                                      whitesmoke 11%,
                                      whitesmoke 100%
                                    );
                                    z-index: -1;
                                  }
                          
                                  section::after {
                                    content: '';
                                    pointer-events: none;
                                    position: absolute;
                                    z-index: 1;
                                    top: 0;
                                    right: 0;
                                    bottom: 0;
                                    left: 0;
                                    opacity: 0.3;
                                    border-radius: var(--radius);
                                    background: linear-gradient(
                                      to bottom left,
                                      rgba(0, 0, 0, 0.1) 20%,
                                      rgba(0, 0, 0, 0.6) 100%
                                    );
                                    transition: opacity var(--transition-slow),
                                      transform var(--transition-slow);
                                  }
                          
                                  section:hover::after,
                                  section:focus::after,
                                  section.active::after {
                                    opacity: 1;
                                  }

                                .entry-item {
                                    position: absolute;
                                    bottom: 2rem;
                                    left: 2rem;
                                    z-index: 2;
                                    opacity: 0;
                                    transform: translateY(10%);
                                    transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
                                }

                                section:hover .entry-item ,
                                section:focus .entry-item ,
                                section.active .entry-item  {
                                  transform: none;
                                  opacity: 1;
                                }

                                .title,
                                .excerpt {
                                    margin: 0;
                                    line-height: normal;
                                }

                                .title {
                                    color: #fff;
                                    font-size: 2.5rem;
                                    font-weight: 600;
                                    margin-bottom: var(--gap-half);
                                }

                                .excerpt {
                                    font-weight: 500;
                                    color: #eaeaea;
                                    font-size: 1.1rem;
                                }
                                
                                @media (hover: none) {
                                    .entry-item {
                                      transform: none;
                                      opacity: 1;
                                    }
                          
                                    section::after {
                                      opacity: 1;
                                    }
                                }
                                
                                @media (max-width: 600px) {
                                    .title {
                                        color: #fff;
                                        font-size: 1.75rem;
                                        font-weight: bold;
                                        margin-bottom: var(--gap-half);
                                    }
    
                                    .excerpt {
                                        font-size: 1rem;
                                        font-weight: 500;
                                        color: #eaeaea;
                                    }
                                }

                                section.simple {
                                    display: grid;
                                    grid-template-columns: 50px 2fr auto;
                                    align-items: center;
                                    padding: 0.75rem 1rem;
                                    margin: 0 -1rem;
                                    border: 2px solid transparent;
                                    height: auto;
                                    background: none;
                                    border-radius: var(--radius);
                                }

                                section.simple:before,
                                section.simple:after {
                                    display: none;
                                }
                                
                                section.simple:hover {
                                    border: 2px solid var(--lighter-gray);
                                    background: var(--lighter-gray);
                                }
                                
                                section.simple:active,
                                section.simple:focus {
                                    border: 2px dashed var(--primary);
                                    background: var(--lighter-gray);
                                    outline: none;
                                }

                                section.simple .entry-item {
                                    opacity: 1;
                                    position: static;
                                    transform: none;
                                }

                                section.simple .title {
                                    color: var(--article-color);
                                    font-size: 1.25rem;
                                    font-weight: 500;
                                    margin: 0;
                                }

                                .alert {
                                    align-self: center;
                                    justify-self: flex-end;
                                    margin-left: 1rem;
                                }
                                
                                .alert .new {
                                    display: inline-block;
                                    font-size: 0.8rem;
                                    background: var(--lighter-gray);
                                    color: var(--yellow);
                                    border-radius: var(--radius);
                                    padding: 0.25rem 0.75rem;
                                    text-align: center;
                                }
                            `}</style>
                        </React.Fragment>
                    );
                })}

            </>
        );
    }
}
