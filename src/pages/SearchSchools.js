import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import posed from 'react-pose';
import { gql } from "apollo-boost";
import { withApollo } from 'react-apollo';
import * as CurrencyFormat from 'react-currency-format';
import CircularProgress from '@material-ui/core/CircularProgress';

const photo = require("../img/diploma.png");

const Slide = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 }
});

const SearchSchoolsQuery = gql`
  query($name: String!) {
  searchSchools(name: $name) {
    opeid
    name
    unit_id
    sector_name
    net_price
  }
}
`;

@inject('sessionStore', 'spotStore', 'uiStore', 'schoolStore')
@observer
class SearchSchools extends Component {

  sessionStore = this.props.sessionStore;
  spotStore = this.props.spotStore;
  uiStore = this.props.uiStore;
  schoolStore = this.props.schoolStore;

  state = {
    loading: false
  }

  onChange = async e => {
    this.schoolStore.schoolSerchFilter = e.target.value;
    if (this.schoolStore.schoolSerchFilter.length > 2) {
      this.setState({loading:true})
      const result = await this.props.client.query({
        query: SearchSchoolsQuery,
        variables: {name: this.schoolStore.schoolSerchFilter}
      });
      this.setState({loading:false})
      this.schoolStore.schoolSearchResults = result.data.searchSchools;
    }
  };


  render() {
    return (
      <React.Fragment>
        <Slide>
          <div className='container container-dashboard'>
            <div className='spacer' />

            <section>
              <div className='search-container'>
                {/* <h1 className='text-center dashboard-header'>Find out how much college really costs</h1> */}
                <div className='spacer' />
                <img src={photo} className='diploma' alt='Responsive image' />
                <div className='form-group dashboard-form'>
                  <label>Search Your University {this.state.loading ? (<span>   Loading...</span> ) : ( null )}</label>
      
                  <div className='input-group input-group-alternative mb-4'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>
                        <i className='ni ni-zoom-split-in' />
                      </span>
                    </div>
                    <input
                      className='form-control form-control-lg form-control-alternative'
                      placeholder='Search'
                      type='text'
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className='album py-5'>
              <div style={{justifyContent: "center", display:"flex"}}>
              {this.schoolStore.schoolSearchResults.length == 0 && this.state.loading == true ? (<CircularProgress size={80}   /> ) : ( null )}
              </div>
           
              <div className='row row-eq-height'>
                {this.schoolStore.schoolSearchResults.map(school => (
                  <div key={school.unit_id} className='col-md-4'>
                    <div className='card shadow-lg mb-3 quote-card' style={{height: '90%'}} onClick={() => this.schoolStore.selectSchool(school)}>
                      <div className='card-body text-dark'>
                        <h5 className='card-title'>{school['name']}</h5>
                        <CurrencyFormat value={school['net_price']} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <h6>{value}</h6>} /> 

                        <h6>{school['sector_name']}</h6>
                      </div>
                    </div>
                  </div>
                ))}

                <div className='col-md-4' />
                <div className='col-md-4' />
              </div>
            </div>
          </div>
        </Slide>
      </React.Fragment>
    );
  }
}

export default withApollo(SearchSchools);