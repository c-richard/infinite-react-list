import React, { useRef, useEffect, useState } from 'react';
import { act, render } from '@testing-library/react';

import useIntersectionObserver from '../src/useIntersectionObserver';

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    global.IntersectionObserver = jest.fn(() => ({
      observe: () => null,
    }));
  });

  it('triggers callback when intersection observer observes intersection', () => {
    let simulateIntersection = () => null;
    global.IntersectionObserver = jest.fn((intersectionCallback) => {
      simulateIntersection = () => {
        intersectionCallback();
      };

      return {
        observe: () => null,
      };
    });

    const callback = jest.fn();

    const ComponentUsingIntersectionObserver = () => {
      const divOne = useRef(null);
      const divTwo = useRef(null);
      useIntersectionObserver(divOne, divTwo, callback);

      return (
        <div>
          <div ref={divOne}>One</div>
          <div ref={divTwo}>Two</div>
        </div>
      );
    };

    act(() => render(<ComponentUsingIntersectionObserver />));
    simulateIntersection();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('setup observer once per series of renders', () => {
    const callback = jest.fn();

    const ComponentUsingIntersectionObserver = () => {
      const divOne = useRef(null);
      const divTwo = useRef(null);
      useIntersectionObserver(divOne, divTwo, callback);

      const [a, setA] = useState(null);
      useEffect(() => setA(true), []);

      return (
        <div>
          <div ref={divOne}>One</div>
          <div ref={divTwo}>Two</div>
        </div>
      );
    };

    act(() => render(<ComponentUsingIntersectionObserver />));

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
  });

  it('throws error if provided observerRef doesnt reference dom element', () => {
    const callback = jest.fn();

    const ComponentUsingIntersectionObserver = () => {
      const divOne = useRef(null);
      const divTwo = useRef(null);
      useIntersectionObserver(divOne, divTwo, callback);

      return (
        <div>
          <div>One</div>
          <div ref={divTwo}>Two</div>
        </div>
      );
    };

    expect(() => render(<ComponentUsingIntersectionObserver />)).toThrow(TypeError);
  });

  it('throws error if provided observeerRef doesnt reference dom element', () => {
    const callback = jest.fn();

    const ComponentUsingIntersectionObserver = () => {
      const divOne = useRef(null);
      const divTwo = useRef(null);
      useIntersectionObserver(divOne, divTwo, callback);

      return (
        <div>
          <div ref={divOne}>One</div>
          <div>Two</div>
        </div>
      );
    };

    expect(() => render(<ComponentUsingIntersectionObserver />)).toThrow(TypeError);
  });

  it('throws error if provided callback not a function', () => {
    const callback = 'jeff';

    const ComponentUsingIntersectionObserver = () => {
      const divOne = useRef(null);
      const divTwo = useRef(null);
      useIntersectionObserver(divOne, divTwo, callback);

      return (
        <div>
          <div ref={divOne}>One</div>
          <div ref={divTwo}>Two</div>
        </div>
      );
    };

    expect(() => render(<ComponentUsingIntersectionObserver />)).toThrow(TypeError);
  });
});
