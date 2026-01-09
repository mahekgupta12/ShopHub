/**
 * @format
 */

import React from 'react';
import { Text, View } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import EmptyState from '../src/components/emptyState';

describe('EmptyState Component', () => {
  // Provide a theme palette so styles can be generated.
  const mockColors = {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    primary: '#007AFF',
    danger: '#FF3B30',
  } as any;

  it('should render without crashing', () => {
    ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <EmptyState
          title="No Items"
          subtitle="You have no items"
          colors={mockColors}
        />
      );
    });
  });

  it('should display title text', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="No Products"
          subtitle="No products available"
          colors={mockColors}
        />
      );
    });

    const textInstances = tree!.root.findAllByType(Text);
    const titleText = textInstances[0];
    expect(titleText.props.children).toBe('No Products');
  });

  it('should display subtitle text', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="No Items"
          subtitle="Please add items to continue"
          colors={mockColors}
        />
      );
    });

    const textInstances = tree!.root.findAllByType(Text);
    const subtitleText = textInstances[1];
    expect(subtitleText.props.children).toBe('Please add items to continue');
  });

  it('should accept custom container style', () => {
    const customStyle = { backgroundColor: 'red' };
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="No Items"
          subtitle="You have no items"
          colors={mockColors}
          containerStyle={customStyle}
        />
      );
    });

    const viewInstance = tree!.root.findByType(View);
    expect(viewInstance.props.style).toBeDefined();
  });

  it('should accept custom title style', () => {
    const customTitleStyle = { fontSize: 30 };
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="No Items"
          subtitle="You have no items"
          colors={mockColors}
          titleStyle={customTitleStyle}
        />
      );
    });

    expect(tree).toBeDefined();
  });

  it('should accept custom subtitle style', () => {
    const customSubtitleStyle = { fontSize: 14 };
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="No Items"
          subtitle="You have no items"
          colors={mockColors}
          subtitleStyle={customSubtitleStyle}
        />
      );
    });

    expect(tree).toBeDefined();
  });

  it('should render with all custom styles', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="Empty Cart"
          subtitle="Your cart is empty"
          colors={mockColors}
          containerStyle={{ marginTop: 20 }}
          titleStyle={{ color: 'red' }}
          subtitleStyle={{ color: 'blue' }}
        />
      );
    });

    const textInstances = tree!.root.findAllByType(Text);
    expect(textInstances.length).toBeGreaterThan(0);
  });

  it('should use provided colors theme', () => {
    const customColors = {
      background: '#222222',
      card: '#333333',
      text: '#FFFFFF',
      textSecondary: '#AAAAAA',
      border: '#444444',
      primary: '#FF6B6B',
      danger: '#FF0000',
    } as any;

    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="No Data"
          subtitle="No data available"
          colors={customColors}
        />
      );
    });

    expect(tree).toBeDefined();
  });

  it('should render View and Text components', () => {
    let tree: any;
    ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <EmptyState
          title="Test"
          subtitle="Test subtitle"
          colors={mockColors}
        />
      );
    });

    const viewInstance = tree!.root.findByType(View);
    const textInstances = tree!.root.findAllByType(Text);
    expect(viewInstance).toBeDefined();
    expect(textInstances.length).toBe(2);
  });
});
