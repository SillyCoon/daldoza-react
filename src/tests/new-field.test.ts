import { NewField } from '../logic/new-field';
import { Coordinate } from '../model/coordinate';
import { Figure } from '../model/figure';

describe('Field', () => {
  const field: NewField = NewField.initial(16);

  it('should pick figure', () => {
    const square = field.pickFigure(Coordinate.fromXY(0, 0));
    expect(square).toBeDefined();
    expect(square?.figure?.color).toBe(1);
    expect(square?.coordinate?.x).toBe(0);
    expect(square?.coordinate?.y).toBe(0);
  });

  it('should replace figure', () => {
    const field: NewField = NewField.initial(16);

    const newField = field.replaceFigure(
      Coordinate.fromXY(1, 0),
      new Figure(1, true),
    );

    const figure = newField.squares[1][0].figure;
    expect(figure?.color).toBe(1);
    expect(figure?.isActive).toBeTruthy();
  });

  it('should activate figure', () => {
    const field: NewField = NewField.initial(16);

    const newField = field.activate(Coordinate.fromXY(0, 0), 1);
    const figure = newField.squares[0][0].figure;
    expect(figure?.isActive).toBeTruthy();
  });
});

// test('test newfield', () => {
//   const field: NewField = NewField.initial(16);

//   const fieldAfterActivation = field.activate(Coordinate.fromXY(0, 0), 1);

//   const activatedFigure = fieldAfterActivation.pickFigure();

//   expect(1 + 2).toBe(3);
// });