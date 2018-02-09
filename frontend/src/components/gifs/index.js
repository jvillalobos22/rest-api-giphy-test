import React, {Component} from 'react'
import './index.css'

const Gifs = ({ gifs }) => {
    return (
        <div>
        {(gifs.length)
            ? <div className="flex-container gifs-container">
                <h3 className="gifs-header">Here are some related Gifs:</h3>
                {gifs.map((gif) => {
                    return (gif.url) && (
                        <div className="gif" key={gif.tag}>
                            <img src={gif.url} alt={gif.tag} />
                            {(gif.tag) &&
                                <div className="tag">
                                    <h6>Matches Tag:</h6>
                                    <span>{gif.tag}</span>
                                </div>
                            }
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
