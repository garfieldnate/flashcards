import React from 'react';
import renderer from 'react-test-renderer';
import Card from './Card.tsx';


it("renders a card", () => {
  const tree = renderer.create(
    <Card
        cardID={1}
        front="hello"
        back="ハロー"
        exampleForeignLang="例文"
        exampleUserLang="example" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
