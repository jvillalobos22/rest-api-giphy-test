import React from 'react'
import {
  Link
} from 'react-router-dom'
import './index.css'

/* ArticleList Component
 *  - This component receives props from its parent and uses them to create a
 *    list of article cards with links to the full article
 */
const ArticlesList = ({ articles, currentPage, totalPages, fetchArticles, ...routeParams }) => {
    return (
        <div className="articles-list">
            {articles.map(item =>
                <div className="article-card" key={item.article_id}>
                    <Link to={"/posts/" + item.article_id}>
                        <h2 dangerouslySetInnerHTML={{__html: item.header }}></h2>
                    </Link>
                    <div className="article-body" dangerouslySetInnerHTML={{__html: item.excerpt + '...' }}></div>
                    <Link to={"/posts/" + item.article_id}>
                        <button className="btn more">Continue Reading</button>
                    </Link>
                </div>
            )}
            {(currentPage < totalPages) &&
                <button className="btn loadbtn" onClick={() => fetchArticles(currentPage+1)}>
                    Load More
                </button>
            }
        </div>
    )
}

export default ArticlesList
