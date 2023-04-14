import React, { Component } from 'react';
import './Presentational.scss';
import './styles/switch.scss';
import { DrumKeyType } from "./types/drum-key.type";

export class Presentational extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            playing: false,
            muted: false,
            display: '',
            current: 0,
        }
    }

    drumKeys: DrumKeyType[] = [
        {
            name: 'Heater 1',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
            key: "Q"
        },
        {
            name: 'Heater 2',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
            key: "W"
        },
        {
            name: 'Heater 3',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
            key: "E"
        },
        {
            name: 'Heater 4',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
            key: "A"
        },
        {
            name: 'Clap',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
            key: "S"
        },
        {
            name: 'Open-HH',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
            key: "D"
        },
        {
            name: 'Kick-n\'-Hat',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
            key: "Z"
        },
        {
            name: 'Kick',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
            key: "X"
        },
        {
            name: 'Closed-HH',
            sound: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
            key: "C"
        },
    ];

    playSound = (drumKey: DrumKeyType): Promise<void> => {
        const audio = new Audio(drumKey.sound);
        audio.volume = this.props.volume;
        return audio.play();
    }

    playPlaylist = (): void => {
        if (this.props.history[this.state.current]) {
            this.playSound(this.props.history[this.state.current])
                .then(() => {
                    this.setState({ current: this.state.current + 1 });
                    this.playPlaylist();
                })
                .catch(() => {
                    this.setState({ playing: false });
                    this.cleanDisplay();
                });
        } else {
            this.setState({ playing: false });
            this.setState({ current: 0 });
            this.cleanDisplay();
        }
    }

    handlePlayPlaylist = (): void => {
        if (this.props.power) {
            this.setState({ playing: true });
            this.playPlaylist();
        }
    }

    handlePressKey = (event: any): void => {
        if (this.props.power) {
            const drumKey: DrumKeyType|null = this.drumKeys.find((drumKey: DrumKeyType) => drumKey.key === event.key.toUpperCase()) ?? null;
            if (drumKey) {
                this.props.drumKeyEvent(drumKey);
                this.setState({ display: drumKey?.name });
                this.playSound(drumKey);
                this.cleanDisplay();
            }
        }
    }
    handlePressDrumKey = (drumKey: DrumKeyType): void => {
        if (this.props.power) {
            this.props.drumKeyEvent(drumKey);
            this.setState({ display: drumKey.name });
            this.playSound(drumKey);
            this.cleanDisplay();
        }
    }

    handleVolumeChange = (event: any): void => {
        const volume: number = Math.floor(Math.round(event.target.value * 100));
        this.setState({ display: `Volume: ${volume}%` });
        this.props.volumeEvent(event.target.value);
        (document.getElementById('tack-list') as HTMLAudioElement).volume = event.target.value;
        this.cleanDisplay();
    }
    handleAudioTagVolumeChange = (event: any): void => {
        event.target.muted = this.props.power ? event.target.muted : true;
        this.setState({ muted: event.target.muted });
        const volume: number = Math.floor(Math.round(event.target.volume * 100));
        this.setState({ display: !event.target.muted ? `Volume: ${volume}%` : 'Volume muted' });
        this.props.volumeEvent(event.target.volume);
        this.cleanDisplay();
    }
    handlePowerChange = (event: any): void => {
        this.props.powerEvent(event.target.checked);
        this.setState({ muted: !event.target.checked });
    }

    renderSoundName = (name: string): string => name.replace(/ /g, '_');

    cleanDisplay = (time: number = 1000) => setTimeout(() => this.setState({ display: '' }), time);

    render() {
        return (
            <div id="drum-machine">
                <div className="container pad-bank">
                    {this.drumKeys.map((drumKey: DrumKeyType) => {
                        return (
                            <div
                                className={'drum-pad ' + (!this.props.power ? 'power-off' : '')}
                                key={this.renderSoundName(drumKey.name)}
                                id={this.renderSoundName(drumKey.name)}
                                aria-label={drumKey.key}
                                onClick={() => this.handlePressDrumKey(drumKey)}
                            >
                                <strong>{drumKey.key}</strong>
                            </div>
                        );
                    })}
                </div>
                <div className="container controls">
                    <div className="power-control" key="power-control">
                        <p>Power</p>
                        <label className="switch" key="switch">
                            <input type="checkbox" checked={this.props.power} onChange={this.handlePowerChange}/>
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div id="display" style={{ height: 48 }} key="display">
                        <p>{this.state.display}</p>
                    </div>
                    <div className="volume-control" key="volume-control">
                        <input
                            max="1"
                            min="0"
                            step="0.01"
                            type="range"
                            value={!this.state.muted ? this.props.volume : 0}
                            onChange={this.handleVolumeChange}
                            disabled={this.state.muted}
                        />
                    </div>
                </div>
                <div className="container playlist-control">
                    <p>Playlist</p>
                    <div className="history">
                        {this.props.history.length > 0 && <ul>
                            {this.props.history.map((drumKey: DrumKeyType, i: number) =>
                                <li key={i}>Track {i + 1}: {drumKey.name}</li>)}
                        </ul>}
                    </div>
                    <div className="current-play">
                        <div style={{ height: 24 }}>
                            {this.state.playing && <p>{this.props.history[this.state.current]?.name}</p>}
                        </div>
                        <audio id="tack-list"
                               controls={true}
                               onPlayCapture={this.handlePlayPlaylist}
                               onVolumeChange={this.handleAudioTagVolumeChange}
                               muted={this.state.muted}
                        >
                            {this.props.history.map((drumKey: DrumKeyType, i: number) =>
                                <source src={drumKey.sound} data-track-number={i} key={`source-${i}`}/>)}
                        </audio>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        (document.getElementById('tack-list') as HTMLAudioElement).volume = this.props.volume;
        document.addEventListener("keydown", this.handlePressKey, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handlePressKey);
    }
}