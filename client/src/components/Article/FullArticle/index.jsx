import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

class FullArticle extends Component {

    componentDidMount() {
        const { onLoadArticle } = this.props;
        const id = this.props.match.params.id;

        axios(`http://localhost:8000/api/blogs/${id}`)
        .then((res) => onLoadArticle(res.data));
    }

    render() {
        const { articleToView } = this.props;

        return ( 
            <> 
            { articleToView &&
                <div className="row pt-5">
                    <div className="col-12 col-lg-8 offset-lg-2">
                        <div className="card my-3">
                            <div className="card-header">
                                <b>{articleToView.title}</b>
                            </div>
                            <div className="card-body">
                                {articleToView.shortDescription}
                                <p className="mt-5">{articleToView.body}</p>
                                <p className="mt-5"><b>~ {articleToView.author}</b></p>
                            </div>
                            <div className="card-footer">
                                <i>
                                    <p className="float-right text-muted"> Posted :
                                                    {moment(new Date(articleToView.updatedAt)).fromNow()}
                                    </p>
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </>
        );
    }
}

const mapStateToProps = state =>({
    articleToView: state.home.articleToView
})

const mapDispatchToProps = dispatch => ({
    onLoadArticle: data => dispatch({type: 'ARTICLE_LOADED', data})
}); 

export default connect(mapStateToProps, mapDispatchToProps)(FullArticle);