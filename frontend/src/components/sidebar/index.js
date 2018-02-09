import React from 'react'
import {
  Link
} from 'react-router-dom'
import './index.css'

/* Sidebar Component
 *  - This component receives the articles object as props and uses it to create
 *    a list of recent article links to be displayed as a sidebar.
 */

const Sidebar = ({ articles, ...routeParams }) => {
    return (
        <div className="sidebar-container">
            <h3>Recent Articles</h3>
            {(articles && articles.length > 0) &&
                articles.slice(0, 5).map(article => {
                    return(
                        <div key={article.article_id}>
                            <Link to={"/posts/" + article.article_id}>
                                <span dangerouslySetInnerHTML={{__html: article.header }}></span>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Sidebar
