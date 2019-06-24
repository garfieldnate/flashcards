// import React from 'react';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Card from './Card';

it('renders a card', () => {
  const tree = renderer
    .create(
      <Card
        cardData={{
          ID: 1,
          back: 'ハロー',
          category: 'foo',
          exampleForeignLang: '例文',
          exampleUserLang: 'example',
          front: 'hello',
        }}
        onDelete={null}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
