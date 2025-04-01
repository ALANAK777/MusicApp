import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [
        {
          name: "Don'u Don'u Don'u",
          duration: 263,
          artist: "Dhanush",
          playlist: "Pop Hits",
          url: "/public/song1.mp3",
        },
        {
          name: "Dheema Dheema",
          duration: 354,
          artist: "Anirudh",
          playlist: "Rock Classics",
          url: "/public/song2.mp3",
        },
        {
          name: "Aasa Kooda",
          duration: 201,
          artist: "Sai Abhyankkar",
          playlist: "Pop Hits",
          url: "/public/song3.mp3",
        },
        {
          name: "Ordinary Person",
          duration: 354,
          artist: "Anirudh",
          playlist: "Rock Classics",
          url: "/public/song4.mp3",
        },
        {
          name: "Enemy",
          duration: 201,
          artist: "Ani",
          playlist: "CLimax",
          url: "/public/song5.mp3",
        }
      ],
      playingSong: null,
      isPlaying: false,
      audio: new Audio(),
      wishlist: [],
      theme: "light",
    };
  }

  formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  playSong = (song) => {
    const { playingSong, audio } = this.state;
    if (playingSong !== song) {
      audio.src = song.url;
      audio.play();
      this.setState({ playingSong: song, isPlaying: true });
    } else {
      audio.play();
      this.setState({ isPlaying: true });
    }
  };

  pauseSong = () => {
    this.state.audio.pause();
    this.setState({ isPlaying: false });
  };

  stopSong = () => {
    const { audio } = this.state;
    audio.pause();
    audio.currentTime = 0;
    this.setState({ isPlaying: false, playingSong: null });
  };

  addToWishlist = (song) => {
    if (!this.state.wishlist.includes(song)) {
      this.setState((prevState) => ({
        wishlist: [...prevState.wishlist, song],
      }));
    }
  };

  removeFromWishlist = (song) => {
    this.setState((prevState) => ({
      wishlist: prevState.wishlist.filter((item) => item !== song),
    }));
  };

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === "light" ? "dark" : "light"
    }));
  };

  isLongTrack = (duration) => {
    return duration > 300; // More than 5 minutes
  };

  formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  render() {
    const { theme } = this.state;
    const themeStyles = theme === "light" ? styles.lightTheme : styles.darkTheme;

    return (
      <div style={{ ...styles.container, ...themeStyles.container }}>
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>
            <h1 style={{ ...styles.title, ...themeStyles.title }}>🎵 Music Player</h1>
            <button 
              onClick={this.toggleTheme} 
              style={{ ...styles.themeToggle, ...themeStyles.button }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>

          <div style={{ ...styles.wishlistContainer, ...themeStyles.wishlistContainer }}>
            <h2 style={{ ...styles.wishlistTitle, ...themeStyles.title }}>🎶 Wishlist</h2>
            <div style={styles.wishlistList}>
              {this.state.wishlist.length > 0 ? (
                this.state.wishlist.map((song, index) => (
                  <div 
                    key={index} 
                    style={{ ...styles.wishlistItem, ...themeStyles.wishlistItem }}
                  >
                    <div style={{ ...styles.songName, ...themeStyles.text }}>
                      {song.name}
                      {this.isLongTrack(song.duration) && (
                        <span style={styles.longTrackBadge}>Long Track</span>
                      )}
                    </div>
                    <div style={styles.wishlistItemRight}>
                      <span style={{ ...styles.songDetails, ...themeStyles.secondaryText }}>
                        {song.artist}
                      </span>
                      <button 
                        onClick={() => this.removeFromWishlist(song)} 
                        style={{ ...styles.button, ...styles.removeButton }}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ ...styles.emptyWishlist, ...themeStyles.secondaryText }}>
                  No songs added to wishlist yet.
                </p>
              )}
            </div>
          </div>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.listContainer}>
            {this.state.songs.map((song, index) => (
              <div 
                key={index} 
                style={{ ...styles.songItem, ...themeStyles.songItem }}
              >
                <div style={styles.songInfo}>
                  <div style={styles.songNameContainer}>
                    <div style={{ ...styles.songName, ...themeStyles.text }}>{song.name}</div>
                    {this.isLongTrack(song.duration) && (
                      <span style={styles.longTrackBadge}>Long Track</span>
                    )}
                  </div>
                  <div style={{ ...styles.songDetails, ...themeStyles.secondaryText }}>
                    {song.artist} • {this.formatDuration(song.duration)}
                  </div>
                </div>
                <div style={styles.buttonContainer}>
                  <button 
                    onClick={() => this.playSong(song)} 
                    style={{ ...styles.button, ...themeStyles.button, ...styles.playButton }}
                  >
                    ▶
                  </button>
                  <button 
                    onClick={this.pauseSong} 
                    style={{ ...styles.button, ...themeStyles.button }}
                  >
                    ⏸
                  </button>
                  <button 
                    onClick={this.stopSong} 
                    style={{ ...styles.button, ...themeStyles.button }}
                  >
                    ⏹
                  </button>
                  <button 
                    onClick={() => this.addToWishlist(song)} 
                    style={{ ...styles.button, ...styles.addButton }}
                  >
                    💖
                  </button>
                </div>
              </div>
            ))}
          </div>

          {this.state.playingSong && (
            <div style={{ ...styles.nowPlaying, ...themeStyles.nowPlaying }}>
              <div style={styles.playingAnimation}>▶</div>
              <span style={themeStyles.text}>
                Now Playing: <strong>{this.state.playingSong.name}</strong>
                {this.isLongTrack(this.state.playingSong.duration) && (
                  <span style={{ ...styles.longTrackBadge, marginLeft: "8px" }}>Long Track</span>
                )}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  songNameContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.25rem",
  },
  
  longTrackBadge: {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "2px 8px",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "500",
    display: "inline-block",
  },
  
  container: {
    minHeight: "100vh",
    width: "100vw",
    margin: 0,
    padding: 0,
    display: "flex",
    transition: "all 0.3s ease",
  },
  sidebar: {
    width: "300px",
    height: "100vh",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid rgba(0, 0, 0, 0.1)",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
  },
  mainContent: {
    flex: 1,
    padding: "2rem",
    height: "100vh",
    overflowY: "auto",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  themeToggle: {
    fontSize: "1.2rem",
    padding: "0.5rem",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "900px",
    margin: "0 auto",
  },
  songItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "12px",
    transition: "all 0.2s ease",
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    fontSize: "1.1rem",
    fontWeight: "500",
    marginBottom: "0.25rem",
  },
  songDetails: {
    fontSize: "0.9rem",
  },
  buttonContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  button: {
    padding: "0.5rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  addButton: {
    backgroundColor: "#ff69b4",
    color: "white",
  },
  removeButton: {
    backgroundColor: "#ff4444",
    color: "white",
  },
  nowPlaying: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    padding: "1rem 2rem",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    zIndex: 1000,
  },
  playingAnimation: {
    animation: "pulse 1s infinite",
  },
  wishlistContainer: {
    flex: 1,
    overflowY: "auto",
  },
  wishlistTitle: {
    marginBottom: "1rem",
    fontSize: "1.2rem",
  },
  wishlistList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  wishlistItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.75rem",
    borderRadius: "8px",
  },
  wishlistItemRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  emptyWishlist: {
    textAlign: "center",
    padding: "1rem",
  },
  lightTheme: {
    container: {
      backgroundColor: "#ffffff",
    },
    title: {
      color: "#1a1a1a",
    },
    text: {
      color: "#1a1a1a",
    },
    secondaryText: {
      color: "#666666",
    },
    button: {
      backgroundColor: "#f0f0f0",
      color: "#1a1a1a",
    },
    songItem: {
      backgroundColor: "#f8f9fa",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
    nowPlaying: {
      backgroundColor: "#e8f5e9",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    wishlistContainer: {
      backgroundColor: "#f5f5f5",
      borderRadius: "12px",
      padding: "1rem",
    },
    wishlistItem: {
      backgroundColor: "#ffffff",
    },
  },
  darkTheme: {
    container: {
      backgroundColor: "#1a1a1a",
    },
    title: {
      color: "#ffffff",
    },
    text: {
      color: "#ffffff",
    },
    secondaryText: {
      color: "#b3b3b3",
    },
    button: {
      backgroundColor: "#333333",
      color: "#ffffff",
    },
    songItem: {
      backgroundColor: "#2d2d2d",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    nowPlaying: {
      backgroundColor: "#1e392a",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    },
    wishlistContainer: {
      backgroundColor: "#2d2d2d",
      borderRadius: "12px",
      padding: "1rem",
    },
    wishlistItem: {
      backgroundColor: "#333333",
    },
  },
};

export default App;