import React, { Component } from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { CalcPayments } from './CalcPayments';

Enzyme.configure({ adapter: new Adapter() });

describe("CalcPayments", () => {
    
    it("should render initial layout", () => {
        // when
        const component = shallow(<CalcPayments />);
        // then
        expect(component.getElements()).toMatchSnapshot();
    });

    it('renders three images', () => {
        const component = shallow(<CalcPayments />);
        const images = component.find('img');
        expect(images.length == 3);
    });
});