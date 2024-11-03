import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: 25,
    minutes: 25,
    seconds: 0,
    isRunning: false,
  }

  decreaseTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.seconds === 0 && prevState.minutes === 0) {
          clearInterval(this.timerId)
          return {isRunning: false}
        }
        if (prevState.seconds === 0) {
          return {seconds: 59, minutes: prevState.minutes - 1}
        }
        return {seconds: prevState.seconds - 1}
      })
    }, 1000)
  }

  clearTimeInterval = () => {
    clearInterval(this.timerId)
  }

  startAndStopButtonClick = () => {
    const {isRunning} = this.state
    if (isRunning) {
      this.clearTimeInterval()
    } else {
      this.decreaseTimer()
    }
    this.setState({
      isRunning: !isRunning,
    })
  }

  plusbuttonClick = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => ({
        timer: prevState.timer + 1,
        minutes: prevState.minutes + 1,
      }))
    }
  }

  minusbuttonClick = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prevState => {
        if (prevState.timer > 1) {
          return {
            timer: prevState.timer - 1,
            minutes: prevState.minutes - 1,
          }
        }
        return {
          timer: 1,
          minutes: 1,
        }
      })
    }
  }

  resetButtonClick = () => {
    clearInterval(this.timerId)
    this.setState({
      timer: 25,
      minutes: 25,
      seconds: 0,
      isRunning: false,
    })
  }

  render() {
    const {timer, minutes, seconds, isRunning} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds % 60 > 9 ? seconds : `0${seconds % 60}`
    const playOrPauseButton = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playOrPauseButtonAltText = isRunning ? 'pause icon' : 'play icon'
    const playOrPauseText = isRunning ? 'Pause' : 'Start'
    return (
      <div className="main-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="lower-container">
          <div className="timer-container">
            <div className="timer-box">
              <h1 className="timer">{`${stringifiedMinutes}:${stringifiedSeconds}`}</h1>
              {isRunning ? (
                <p className="timer-status">Running</p>
              ) : (
                <p className="timer-status">Paused</p>
              )}
            </div>
          </div>
          <div>
            <div className="buttons-container">
              <button
                type="button"
                className="button-box"
                onClick={this.startAndStopButtonClick}
              >
                <img
                  src={playOrPauseButton}
                  className="button-image"
                  alt={playOrPauseButtonAltText}
                />
                {playOrPauseText}
              </button>
              <button
                type="button"
                className="button-box"
                onClick={this.resetButtonClick}
              >
                <img
                  className="button-image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="paragraph">Set Timer limit</p>
            <div className="timer-buttons">
              <button
                type="button"
                className="plus-and-minus"
                onClick={this.minusbuttonClick}
              >
                -
              </button>
              <p className="timer-time">{timer}</p>
              <button
                type="button"
                className="plus-and-minus"
                onClick={this.plusbuttonClick}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
