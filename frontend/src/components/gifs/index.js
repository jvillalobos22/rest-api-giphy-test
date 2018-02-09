import React, {Component} from 'react'
import './index.css'

const GIF_PATH_BASE = 'http://api.giphy.com/v1/gifs/random?tag='
const GIF_API_ENDPOINT = '&api_key=1Xaw8cUM3O2Mgzocobw92q83EdANfQHW&limit=1'

/* Gifs Component
 *  - This component receives the tags specific to the displayed article and
 *    makes a request to the Giphy API to find a random gif for each tag. It
 *    then displays those gifs as cards in a flex grid.
 */
// class Gifs extends Component {
//     constructor(props) {
//         super(props)
//
//         this.state = {
//             gifs_loaded: false,
//             gifs: [], // Array of Gif URLs
//         }
//     }
//
//     fetchGifs(article) {
//         const { tags } = this.props
//         const gifs = []
//         tags.forEach(tag => {
//             this.fetchSigleGif(tag).then(result => {
//                 gifs.push(result)
//             })
//         })
//         this.setState({gifs_loaded: true})
//         return gifs
//     }
//
//     async fetchSigleGif(tag) {
//         fetch(`${GIF_PATH_BASE}${tag}${GIF_API_ENDPOINT}`)
//         .then(response => response.json())
//         .then(result => {
//             let gif = {
//                 tag: tag,
//                 url: result.data.image_url,
//             }
//             this.setState((prevState, currentProps) => ({
//                 gifs: [...prevState.gifs, gif]
//             }))
//         })
//         .catch(e => this.setState({ error: e }));
//     }
//
//     componentDidMount() {
//         this.fetchGifs()
//     }
//
//     render() {
//         const { gifs, gifs_loaded } = this.state
//         return (
//             <div>
//             {(gifs_loaded && gifs.length === this.props.tags.length)
//                 ? <div className="flex-container gifs-container">
//                     <h3 className="gifs-header">Here are some related Gifs:</h3>
//                     {gifs.map((gif) => {
//                         return(
//                             <div className="gif" key={gif.tag}>
//                                 <img src={gif.url} alt={gif.tag} />
//                                 <div className="tag">
//                                     <h6>Matches Tag:</h6>
//                                     <span>{gif.tag}</span>
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//                 : <div>Loading Gifs...</div>
//             }
//             </div>
//
//         )
//     }
// }

const Gifs = ({ gifs }) => {

    return (
        <div>
        {(gifs.length)
            ? <div className="flex-container gifs-container">
                <h3 className="gifs-header">Here are some related Gifs:</h3>
                {gifs.map((gif) => {
                    console.log(gif)
                    return(
                        <div className="gif" key={gif.tag}>
                            <img src={gif.url} alt={gif.tag} />
                            <div className="tag">
                                <h6>Matches Tag:</h6>
                                <span>{gif.tag}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
            : <h3 className="gifs-header">No Gifs Related to this Post.</h3>
        }
        </div>
    )
}


export default Gifs
