import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            shortDescription: '',
            body: '',
            author:'',
            success: false
        }
   }
   
   static getDerivedStateFromProps(nextProps, prevState) {
       if(nextProps.articleToEdit && nextProps.articleToEdit !== prevState.articleToEdit) {
           return  { articleToEdit : nextProps.articleToEdit }
       }
       else
            return null;
   }

   componentDidMount() {
       if(this.props.articleToEdit) {
        this.setState({
            title: this.state.articleToEdit.title,
            shortDescription: this.state.articleToEdit.shortDescription,
            body: this.state.articleToEdit.body,
            author: this.state.articleToEdit.author
           })
       }
   }
   
   componentDidUpdate(prevProps, prevState) {
       if(this.state.articleToEdit && this.state.articleToEdit !== prevState.articleToEdit) {
           this.setState({
            title: this.state.articleToEdit.title,
            shortDescription: this.state.articleToEdit.shortDescription,
            body: this.state.articleToEdit.body,
            author: this.state.articleToEdit.author
           })
       }
   }
   

   handleSubmit(e) {
       e.preventDefault();
       const { onSubmit, articleToEdit, onEdit } = this.props;
       const { title, shortDescription, body, author} = this.state;

       if(!articleToEdit) {
            return axios.post('http://localhost:8000/api/blogs', {
                title,
                shortDescription,
                body,
                author
            })
            .then((res) => onSubmit(res.data))
            .then(() => {
                this.setState({ 
                title: '',
                shortDescription: '',
                body: '',
                author:'',
                success:true
            });
            window.setTimeout(() =>{this.setState({success:false})},1000)
            .catch((err) => console.log('err ',err));
        });
        
        } else {
            return axios.patch(`http://localhost:8000/api/blogs/${articleToEdit._id}`, {
                title,
                shortDescription,
                body,
                author
            })
            .then((res) => onEdit(res.data))
            .then(() => {
                this.setState({ 
                title: '',
                shortDescription: '',
                body: '',
                author:'',
                success:true
            });
            window.setTimeout(() =>{this.setState({success:false})},1000);
        });

        }
    }

    handleChange(key, event) {
        this.setState({
            [key]: event.target.value
        });
    }

    render() {
        const { articleToEdit } = this.props;
        const { title, shortDescription, body, author} = this.state;

        return (
            <div className="row pt-5">   
            <div className="col-12 col-lg-8 offset-lg-2">
            <form onSubmit={this.handleSubmit.bind(this)}>
            <input 
                onChange={(event) => this.handleChange('title',event)}
                value={title}
                className="form-control my-3" 
                placeholder="Article Title"
                required
             />
            <textarea 
                onChange={(event) => this.handleChange('shortDescription',event)}
                value={shortDescription}
                className="form-control my-3"
                placeholder="Short Description"
                required
            />
            <textarea 
                onChange={(event) => this.handleChange('body',event)}
                value={body}
                rows="5"
                className="form-control my-3" 
                placeholder="Article Description"
                required
            />
            <input 
                onChange={(event) => this.handleChange('author',event)}
                value={author}
                className="form-control my-3" 
                placeholder="Author Name" 
                required
            />

            <button 
                type="submit"
                className="btn btn-primary float-right">
                {articleToEdit ? 'Save' : 'Add Blog'} 
            </button> 
            {   this.state.success &&    
                <div className='alert alert-success hidden' style={{width:'fit-content'}}>
                    <i class="fa fa-check" aria-hidden="true"></i>
                </div>
            }
            </form>
            </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
    onEdit: data => dispatch({ type: 'EDIT_ARTICLE', data })
});

const mapStateToProps = state => ({
    articleToEdit : state.home.articleToEdit
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);