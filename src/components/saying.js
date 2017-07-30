import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Saying extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }
    componentDidMount() {
  
      axios.get('https://en.wikipedia.org/w/api.php?format=json&action=query&titles=List_of_exclamations_by_Robin&prop=revisions&rvprop=content&rvsection=2&indexpageids&origin=*', {
              transformResponse: axios.defaults.transformResponse.concat(function (data, headers) {
              var pageid = data['query']['pageids'][0];
                return data['query']['pages'][pageid]['revisions'][0];
              })
            })
        .then((res) => {      
          setTimeout(() => {
                      var content = res.data['*'];
                     var scontent = content.split("{{div col|3}}").pop().split("{{div col end}}").shift();
        var rSayings = scontent.split("*").map(function(idx) {
            return idx.trim();
        }).filter(function(n) {
            return n != ""
        });
         this.setState({data: rSayings})
        }, 
         2000)
        })
    }

    render(){
        var idx = Math.floor(Math.random() * this.state.length);
        if ( idx > -1 ){
            var saying = this.state[idx].trim()+'!';
            this.state.splice(idx,1);
        } else {
            var saying = "Holy speechlessness! Robin has nothing more to say to you.";
        }
        return "<h2>{saying}</h2>";
    }
}