const mongoose = require('mongoose');

const { Schema } = mongoose;

const BlogArticlesSchema = new Schema({
    title: String,
    body: String,
    shortDescription: String,
    author:String
}, { timestamps: true});

BlogArticlesSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        title: this.title,
        body: this.body,
        shortDescription: this.shortDescription,
        author: this.author,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

mongoose.model('BlogArticles', BlogArticlesSchema);