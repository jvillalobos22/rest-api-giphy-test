import React, { Component } from 'react';
import ArticlesList from './components/articles_list'
import Article from './components/article'
import Sidebar from './components/sidebar'
import Header from './components/header'
import Loading from './components/loading'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.css';

const SERVER = 'http://localhost:8888'
const PATH_BASE = SERVER + '/wp-json/wp/v2'
const POSTS_ENDPOINT = '/posts?_embed'
const TAGS_ENDPOINT = '/tags?per_page=100'
const POSTS_PER_PAGE = 10

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            articles: [],
            tags: [],
            currentPage: 0,
            totalPosts: 0,
            error: null,
            isLoading: false,
            tagsLoading: false,
        }

        this.setArticles = this.setArticles.bind(this)
        this.setTags = this.setTags.bind(this)
        this.fetchArticles = this.fetchArticles.bind(this)
        this.fetchTags = this.fetchTags.bind(this)
        this.getSingleArticle = this.getSingleArticle.bind(this)
    }

    setArticles(data, totalPosts) {
        const newArticles = data.map(item => {
            return {
                article_id: item.id,
                featured_image_id: item.featured_media,
                featured_images: item._embedded["wp:featuredmedia"],
                authors: item._embedded["author"],
                author_id: item.author,
                publish_date: item.date,
                header: item.title.rendered,
                excerpt: shorten(item.content.rendered, 350),
                body: item.content.rendered,
                tags: item.tags,
                gifs: item.cmb2.giphy_metabox.post_gif,
            }
        })
        this.setState((prevState, props) => {
            return {
                articles: [...prevState.articles, ...newArticles],
                totalPosts: parseInt(totalPosts, 10),
                currentPage: prevState.currentPage + 1,
                isLoading: false,
            }
        })
    }

    setTags(data) {
        const newTags = data.map(item => {
            return {
                tag_id: item.id,
                tag_count: item.count,
                tag_name: item.name,
                tag_slug: item.slug,
            }
        })
        this.setState({
            tags: newTags
        })
    }

    getSingleArticle(id) {
        let { articles } = this.state
        let article = articles.find(item => {
            return item.article_id === parseInt(id, 10)
        })
        if(article) {
            return article
        } else {
            return null
        }
    }


    fetchArticles(page) {
        let totalPosts = 0;
        this.setState({ isLoading: true })
        fetch(`${PATH_BASE}${POSTS_ENDPOINT}&per_page=${POSTS_PER_PAGE}&page=${page}`)
        .then(response => {
            // Get total posts from response headers
            totalPosts = (response.headers.get('X-WP-Total'))
            return response.json()
        })
        .then(result => this.setArticles(result, totalPosts))
        .catch(e => this.setState({ error: e }));
    }

    fetchTags() {
        this.setState({ tagsLoading: true })
        fetch(`${PATH_BASE}${TAGS_ENDPOINT}`)
        .then(response => response.json())
        .then(result => this.setTags(result))
        .catch(e => this.setState({ error: e }));
    }

    getTotalPages() {
        /* Function that returns number of pages that can be fetched from the WP API */
        const {totalPosts} = this.state
        if(totalPosts <= POSTS_PER_PAGE) {
            return 1
        } else if(totalPosts > POSTS_PER_PAGE) {
            let pages = totalPosts / POSTS_PER_PAGE
            pages = (totalPosts % POSTS_PER_PAGE !== 0) ? pages++ : pages
            return pages
        }
    }

    componentDidMount() {
        this.fetchArticles(1)
        this.fetchTags()
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <div className="container">
                        {(this.state.isLoading)
                            ? <Loading />
                            : <div className="flex-container">
                                <div className="main-content">
                                    <Route exact path="/" render={(routeProps) => (
                                        <ArticlesList {...routeProps}
                                            articles={this.state.articles}
                                            tags={this.state.tags}
                                            totalPages={this.getTotalPages()}
                                            currentPage={this.state.currentPage}
                                            fetchArticles={this.fetchArticles} />
                                    )} />
                                    <Route path="/posts/:id" render={(routeProps) => (
                                        <Article {...routeProps}
                                            article={this.getSingleArticle(routeProps.match.params.id)}
                                            tags={this.state.tags}
                                            key={routeProps.match.params.id} />
                                    )} />
                                </div>
                                <div className="sidebar">
                                    <Sidebar articles={this.state.articles} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Router>
        );
    }
}

// Shorten a string to less than maxLen characters without truncating words.
function shorten(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
}

export default App;
