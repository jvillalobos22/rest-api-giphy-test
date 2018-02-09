import React from 'react';
import Gifs from '../gifs'
import './index.css';

/* Article Component
 *  - This component receives the article and all tags as props from its parent
 *    and uses them to display the selected article in full
 */
const Article = ({ article, tags }) => {

    const getTags = (article) => {
        if(article && article.tags) {
            const article_tags = article.tags.map(tag => {
                let tagObject = tags.find(item => {
                    return tag === item.tag_id
                })
                return (tagObject) ? tagObject.tag_name : ''
            })
            return article_tags
        } else {
            return []
        }
    }

    const getAuthor = (article) => {
        if(article) {
            let author = article.authors.find(item => {
                return item.id === article.author_id
            })
            return author ? author.name : ''
        } else {
            return ''
        }
    }

    const getGifs = (article) => {
        console.log(article)
        if(article && article.cmb2) {
            let gifs = article.cmb2.giphy_metabox.post_gif ? article.cmb2.giphy_metabox.post_gif : [];
        } else {
            return []
        }
    }

    const getPublishDate = (article) => {
        if(article) {
            let newdate = new Date(article.publish_date)
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return newdate ? newdate.toLocaleString('en-US', options) : ''
        } else {
            return ''
        }
    }

    const getImage = (article) => {
        if(article) {
            if(article.featured_images) {
                let featured_image = article.featured_images.find(item => {
                    return item.id === article.featured_image_id
                })
                return {
                    featured_image_url: featured_image.source_url ? featured_image.source_url : '',
                    featured_image_alt: featured_image.alt_text ? featured_image.alt_text : ''
                }
            } else {
                return ''
            }
        } else {
            return {}
        }
    }

    const featured_image = getImage(article)
    const authorname = getAuthor(article)
    const date = getPublishDate(article)
    const article_tags = (article) ? getTags(article) : []
    const article_gifs = (article && article.gifs) ? article.gifs : []

    return (
        (article) &&
            <div className="article">
                <h1 dangerouslySetInnerHTML={{__html: article.header }}></h1>
                <div className="metadata">
                    {(authorname !== '') &&
                        <h6 className="author"><span>By:</span> { authorname }</h6>
                    }
                    {(date !== '') &&
                        <h6 className="date"><span>Published:</span> { date }</h6>
                    }
                </div>
                {(article_tags && article_tags.length > 1) &&
                    <div className="tags">
                        {article_tags.map(tag => {
                            return <span key={tag}>{tag}</span>
                        })}
                    </div>
                }
                {(featured_image) &&
                    <img className="featured_image" src={ featured_image.featured_image_url } alt={ featured_image.featured_image_alt } />
                }
                <div className="article-body" dangerouslySetInnerHTML={{__html: article.body }}></div>
                <Gifs gifs={article_gifs} />
            </div>
    )
}

export default Article;
