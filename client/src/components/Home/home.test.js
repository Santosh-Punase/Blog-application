import expect from 'expect';
import React from 'react';
import { shallow } from '../../enzyme';
import Home from './index';

it('renders articles', () => {
    const props = {
        articles: [
        {
        title: 'AT',
        shortDescription: 'AD',
        body: 'AB',
        author:'AA',
        },
        {
            title: 'BT',
            shortDescription: 'BD',
            body: 'BB',
            author:'BA',
            }
    ]}
    const wrapper = shallow(<Home {...props} />);

    // Expect the wrapper object to be defined
    expect(wrapper.find('.article-list')).toBeDefined();
    expect(wrapper.find('.article')).toHaveLength(props.articles.length);
  });