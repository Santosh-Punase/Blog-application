import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { Form } from '../../components/Article';

class Home extends Component {
    componentDidMount() {
        const { onLoad } = this.props;

        axios('http://localhost:8000/api/blogs')
        .then((res) => onLoad(res.data));
    }

    handleDelete(id) {
        const { onDelete } = this.props;

        return axios.delete(`http://localhost:8000/api/blogs/${id}`)
        .then(() => onDelete(id));
    }

    handleEdit(article) {
        const { setEdit } = this.props;
        setEdit(article);
    }

    render() {
        const { articles, articleToEdit } = this.props;
        
        return (
            <div>
                {articleToEdit &&    
                    <Form />  
                }
                <div className="row pt-5">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        {articles.map((article) => {
                            return (
                                <div className="card my-3">
                                    <div className="card-header">
                                        <div className="float-right">
                                            <button 
                                                className="btn btn-primary mx-3"
                                                onClick={this.handleEdit.bind(this,article)}                                                
                                                >
                                                <i className="fa fa-edit" />
                                            </button>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={this.handleDelete.bind(this,article._id)}>
                                                <i className="fa fa-trash" />
                                            </button>
                                        </div>
                                       <a href={"/blog/" + article._id}><b>{article.title}</b></a>
                                    </div>
                                    <div className="card-body">
                                        {article.shortDescription}
                                        <p className="mt-5"><b>~ {article.author}</b></p>
                                    </div>
                                    <div className="card-footer">                                        
                                        <i>
                                            <p className="float-right text-muted"> Posted :  
                                                {moment(new Date(article.updatedAt)).fromNow()}
                                            </p>
                                        </i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>                
                </div>
            </div>
        );
    }
}
const mapSateToProps = state => ({
    articles: state.home.articles,
    articleToEdit : state.home.articleToEdit
})

const mapDispatchToProps = dispatch => ({
    onLoad: data => dispatch({ type:  'HOME_PAGE_LOADED', data }),
    onDelete: id => dispatch({ type: 'DELETE_ARTICLE', id}),
    setEdit: article => dispatch({ type: 'SET_EDIT', article })
});

export default connect(mapSateToProps, mapDispatchToProps)(Home);