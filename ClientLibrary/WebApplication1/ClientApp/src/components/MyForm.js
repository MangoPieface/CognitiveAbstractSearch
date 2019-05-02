import React, { Component } from 'react';
const axios = require('axios');

export class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            posts: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'post',
            url: '/api/KeyPhrase/ProcessTextToFindKeyPhrases',
            params: {
                myData: this.state.value
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState({ posts: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
     return(
         <div>
             <form onSubmit={this.handleSubmit} >
                 
                 <div class="col-sm-12" >
                     <textarea value={this.state.value} onChange={this.handleChange} class="col-sm-9"/>
                  </div>

                 <div class="col-sm-2">
                    <input type="submit" value="Submit" />
                </div> 
             </form>
             <div class="col-sm-12" >
            <ul className="FetchDemo" >
                {this.state.posts.map(function (item, i) {
                    return <li key={i}>{item}</li>
                })}
                 </ul>
            </div>
        </div>
        );
    }
}
