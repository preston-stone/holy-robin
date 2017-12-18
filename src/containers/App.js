import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        // initialize blank array in state
        this.state = {
            data: []
        }
        this.reloadHandler = this.reloadHandler.bind(this);
    }

    componentDidMount() {
      // fetch Wikipedia data
        axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&titles="Holy..."&prop=revisions&rvprop=content&rvsection=2&indexpageids&origin=*

', {
                transformResponse: axios.defaults.transformResponse.concat(function(data, headers) {
                  // find and return only the relevant portion of data
                    var pageid = data['query']['pageids'][0];
                    return data['query']['pages'][pageid]['revisions'][0];
                })
            })
            .then((res) => {
                // filter data to grab just the sayings
                var scontent = res.data['*'].split("{{div col|3}}").pop().split("{{div col end}}").shift();
                // turn Robin's pithy one-liners into a clean array
                var rSayings = scontent.split("*").map(function(idx) {
                    return idx.trim().replace(/\s*\(.*?\)\s*/g, '')+'!';
                }).filter(function(n) {
                    return n !== ""
                });
                // insert array into state
                this.setState({
                    data: rSayings
                })
            })
    }

    getSaying(){
      // grab a random saying
        var idx = Math.floor(Math.random() * this.state.data.length);
        if (idx > -1) {
            this.saying = this.state.data[idx];
            // remove the saying once it's been displayed
            this.state.data.splice(idx, 1);
        } else {
            // fallback
            this.saying = "Holy speechlessness! Robin has nothing more to say to you.";
        }
    }

    reloadHandler(){
      this.forceUpdate();
    }

    render() {
        this.getSaying();
        return ( 
          <div className = "App" >
            <div className = "App-header" >
            <h2> {this.saying} </h2> </div> <p className = "App-intro" >
            <button className="reload" onClick={this.reloadHandler}>Reload</button> </p> </div>
        );
    }
}

export default App;
