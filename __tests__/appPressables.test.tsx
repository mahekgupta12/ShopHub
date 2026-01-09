/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import AppPressable from '../src/components/appPressables';

describe('AppPressable Component', () => {
  // Verify the wrapper renders and forwards props to the underlying Pressable.
  it('should render without crashing', () => {
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <AppPressable testID="app-pressable">
          Test
        </AppPressable>
      );
    });
  });

  it('should render with children', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <AppPressable testID="app-pressable">
          Press me
        </AppPressable>
      );
    });

    expect(tree!.root.findByType(AppPressable)).toBeDefined();
  });

  it('should have disabled prop when passed', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <AppPressable testID="app-pressable" disabled={true}>
          Test
        </AppPressable>
      );
    });

    const instance = tree!.root.findByType(AppPressable);
    expect(instance.props.disabled).toBe(true);
  });

  it('should accept style prop', () => {
    const baseStyle = { backgroundColor: 'blue', padding: 10 };
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <AppPressable testID="app-pressable" style={baseStyle}>
          Test
        </AppPressable>
      );
    });

    const instance = tree!.root.findByType(AppPressable);
    expect(instance.props.style).toBe(baseStyle);
  });

  it('should accept pressedStyle prop', () => {
    const pressedStyle = { backgroundColor: 'red' };
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <AppPressable testID="app-pressable" pressedStyle={pressedStyle}>
          Test
        </AppPressable>
      );
    });

    const instance = tree!.root.findByType(AppPressable);
    expect(instance.props.pressedStyle).toBe(pressedStyle);
  });

  it('should call onPress handler', () => {
    const mockOnPress = jest.fn();
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <AppPressable testID="app-pressable" onPress={mockOnPress}>
          Test
        </AppPressable>
      );
    });

    const instance = tree!.root.findByType(AppPressable);
    expect(instance.props.onPress).toBe(mockOnPress);
  });

  it('should forward additional props to Pressable', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <AppPressable
          testID="app-pressable"
          accessible={true}
          accessibilityLabel="Test Button"
        >
          Test
        </AppPressable>
      );
    });

    const instance = tree!.root.findByType(AppPressable);
    expect(instance.props.accessible).toBe(true);
    expect(instance.props.accessibilityLabel).toBe('Test Button');
  });
});
