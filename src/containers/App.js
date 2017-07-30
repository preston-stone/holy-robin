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
    }

    componentDidMount() {
      // fetch Wikipedia data
        axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&titles=List_of_exclamations_by_Robin&prop=revisions&rvprop=content&rvsection=2&indexpageids&origin=*', {
                transformResponse: axios.defaults.transformResponse.concat(function(data, headers) {
                  // find and return only the relevant portion of data
                    var pageid = data['query']['pageids'][0];
                    return data['query']['pages'][pageid]['revisions'][0];
                })
            })
            .then((res) => {
                        // filter data to grab just the sayings
                        var scontent = res.data['*'].split("{{div col|3}}").pop().split("{{div col end}}").shift();
                        // turn Robin's pithy one-liners into an array
                        var rSayings = scontent.split("*").map(function(idx) {
                            return idx.trim()+'!';
                        }).filter(function(n) {
                            return n !== ""
                        });
                        // insert array into state
                        this.setState({
                            data: rSayings
                        })
            })
    }

    render() {
      // grab a random saying
        var idx = Math.floor(Math.random() * this.state.data.length);
        if (idx > -1) {
            var saying = this.state.data[idx];
            // remove the saying once it's been displayed
            this.state.data.splice(idx, 1);
        } else {
            // fallback
            saying = "Holy speechlessness! Robin has nothing more to say to you.";
        }
        return ( 
          <div className = "App" >
            <div className = "App-header" >
            <h2> {saying} </h2> </div> <p className = "App-intro" >
            (Reload) </p> </div>
        );
    }
}

export default App;