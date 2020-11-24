import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component
{
    state =
    {
        posts: [],
        selectedPostId: null,
        hasError: false
    };

    componentDidMount()
    {
        axios.get( '/posts' )
            .then( response =>
            {
                const posts = response.data.slice( 0, 4 );
                const updatedPosts = posts.map( post =>
                {
                    return { ...post, author: 'Popoy' }
                });
                this.setState( { posts: updatedPosts } );
            })
            .catch( error =>
            {
                this.setState( { hasError: true } );
            });
    };

    postSelectedHandler = id =>
    {
        this.setState( { selectedPostId: id } );
    };

    render()
    {
        let posts = <h3 style={ { textAlign: 'center', color: 'red' } }>Oops! Something went wrong. 😓</h3>;

        if ( ! this.state.hasError )
        {
            posts = this.state.posts.map( post =>
            {
                return <Post key={ post.id } title={ post.title }
                    author={ post.author }
                    clicked={ () => this.postSelectedHandler( post.id ) } />
            });
        }

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <section>
                    <FullPost hasError={ this.state.hasError } id={ this.state.selectedPostId } />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    };
}

export default Blog;