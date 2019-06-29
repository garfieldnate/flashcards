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
          headwordForeignLang: 'ハロー',
          category: 'foo',
          exampleForeignLang: '例文',
          exampleUserLang: 'example',
          headwordUserLang: 'hello',
        }}
        onDelete={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
