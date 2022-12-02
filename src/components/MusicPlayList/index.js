import {Component} from 'react'
import {AiOutlineSearch, AiOutlineDelete} from 'react-icons/ai'

import './index.css'

class MusicPlayList extends Component {
  constructor(props) {
    super()
    this.state = {tracksList: props.tracks, searchInput: ''}
  }

  onClickDeleteBtn = id => {
    const {tracksList} = this.state
    const filteredList = tracksList.filter(eachItem => eachItem.id !== id)
    this.setState({tracksList: filteredList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {tracksList, searchInput} = this.state
    const filteredList = tracksList.filter(eachItem => {
      const {name} = eachItem
      return name.toLowerCase().includes(searchInput.toLowerCase())
    })
    const trackLength = filteredList.length

    return (
      <div className="music-playlist-container">
        <div className="music-banner-container">
          <h1 className="banner-heading">Ed Sheeran</h1>
          <p className="banner-title">Singer</p>
        </div>
        <div className="title-with-search">
          <h1 className="title">Songs PlayList</h1>
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button className="search-btn" type="button">
              <AiOutlineSearch className="search-icon" />
            </button>
          </div>
        </div>
        {trackLength !== 0 ? (
          <ul className="tracks-list">
            {filteredList.map(eachItem => {
              const {id, imageUrl, name, genre, duration} = eachItem

              const onClickDeleteButton = () => {
                this.onClickDeleteBtn(id)
              }
              return (
                <li className="tracts-list-item" key={id}>
                  <div className="tract-item">
                    <div className="tract-details">
                      <img className="tract-img" src={imageUrl} alt="track" />
                      <div className="tract-item-name-with-genre">
                        <p className="item-name">{name}</p>
                        <p className="genre">{genre}</p>
                      </div>
                    </div>
                    <div className="duration-with-delete">
                      <p className="duration">{duration}</p>
                      <button
                        data-testid="delete"
                        className="delete-btn"
                        type="button"
                        onClick={onClickDeleteButton}
                      >
                        <AiOutlineDelete className="delete-icon" />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="not-found-container">
            <p className="no-found-heading">No Songs Found</p>
          </div>
        )}
      </div>
    )
  }
}

export default MusicPlayList
