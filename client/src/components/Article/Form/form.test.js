import expect from 'expect';
import React from 'react';
import { shallow } from '../../../enzyme';
import Form from './index';

function setup(article) {
    const props = {
        articleToEdit:article,
        handleChange:() =>{},
        handleSubmit:() =>{}
    };

    return shallow(<Form {...props} />)
}

it('render form', () =>{
    const wrapper = setup();
    console.log(wrapper.debug);
    expect(wrapper.find('form').length).toBe(1);
});