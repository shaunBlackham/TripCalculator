import React, { Component } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme , { shallow } from 'enzyme';
import { StudentEntry } from './StudentEntry';

Enzyme.configure({ adapter: new Adapter() });

describe("StudentEntry", () => {

    it("should render my component", () => {
        const wrapper = shallow(<StudentEntry />);
    });

    it("should render initial layout", () => {
        // when
        const component = shallow(<StudentEntry />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });

    it("h1 should read Expense Entry", () => {
        // when
        const component = shallow(<StudentEntry />);
        // then
        expect(component.find('h1').text()).toEqual('Expense Entry');
    });

    it('renders two images', () => {
        const component = shallow(<StudentEntry />);
        const images = component.find('img');
        expect(images.length == 2);
    });

});


