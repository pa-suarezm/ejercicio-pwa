import React, { Component } from "react";

class CharactersList extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            characters: []
        };

        this.renderCharacters = this.renderCharacters.bind(this);
    }

    renderCharacters() {

        if (this.state.characters.length > 1) {
            return this.state.characters.map((character, i) => (
                <div className="row" key={`${i}`}>
                    <div className="col-12">
                        <h3>{character.name}</h3>
                        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={`${character.name} thumbnail`} height="100em" />
                        <br />
                        <p>{character.description}</p>
                    </div>
                </div>
            ));
        }

    }

    componentDidMount() {

        let md5 = require('md5');

        if(!navigator.onLine) {
            if (localStorage.getItem('characters') === null)
                this.setState({ characters: [{name: "Loading..."}] })
            else
                this.setState({ characters: localStorage.getItem('characters') });
        }

        var timestamp = new Date();
        var publicKey = "6c6835a88575d1e27e3ef04b9a36cb1f";
        var hash = md5(`${timestamp.toString}58bff739bf6ae33a4d90c1b1f7a133e21415fc9b${publicKey}`);

        fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp.toString}&apikey=${publicKey}&hash=${hash}`)
        .then(res => res.json())
        .then(res => {
            this.setState({characters: res.data.results});
            localStorage.setItem('characters', res.data.results);
        });

    }

    render(){

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12"><h1>Marvel characters</h1></div>
                </div>
                {this.renderCharacters()}
            </div>
        );

    }

}

export default CharactersList;