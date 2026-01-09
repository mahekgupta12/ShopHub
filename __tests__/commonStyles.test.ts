/**
 * @format
 */

import { makeCommonStyles } from '../src/components/commonStyles';

describe('commonStyles', () => {
  // Use a fixed palette to validate generated style values.
  const mockColors = {
    background: '#FFFFFF',
    card: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#E0E0E0',
    primary: '#007AFF',
    danger: '#FF3B30',
  } as any;

  it('should create styles with all required properties', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles).toBeDefined();
    expect(typeof styles).toBe('object');
  });

  it('should have screenSafe style', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.screenSafe).toBeDefined();
    expect(styles.screenSafe.flex).toBe(1);
    expect(styles.screenSafe.backgroundColor).toBe(mockColors.background);
  });

  it('should have screenContainer style', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.screenContainer).toBeDefined();
    expect(styles.screenContainer.flex).toBe(1);
    expect(styles.screenContainer.paddingHorizontal).toBe(16);
  });

  it('should have card styles', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.cardBase).toBeDefined();
    expect(styles.cardBase.backgroundColor).toBe(mockColors.card);
    expect(styles.cardBase.borderRadius).toBe(16);
    expect(styles.cardElevated).toBeDefined();
    expect(styles.cardOutlined).toBeDefined();
  });

  it('should have typography styles', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.titleLg).toBeDefined();
    expect(styles.titleLg.fontSize).toBe(26);
    expect(styles.titleLg.fontWeight).toBe('800');
    expect(styles.screenTitle).toBeDefined();
    expect(styles.titleMd).toBeDefined();
    expect(styles.subtitle).toBeDefined();
  });

  it('should have button styles', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.primaryButton).toBeDefined();
    expect(styles.primaryButton.backgroundColor).toBe(mockColors.primary);
    expect(styles.primaryButtonText).toBeDefined();
    expect(styles.dangerButton).toBeDefined();
    expect(styles.dangerButtonText).toBeDefined();
  });

  it('should have input styles', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.textInput).toBeDefined();
    expect(styles.textInput.borderRadius).toBe(10);
    expect(styles.textInput.borderColor).toBe(mockColors.border);
  });

  it('should have empty state styles', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.emptyStateContainer).toBeDefined();
    expect(styles.emptyStateTitle).toBeDefined();
    expect(styles.emptyStateSubtitle).toBeDefined();
  });

  it('should use provided colors in styles', () => {
    const customColors = {
      background: '#F0F0F0',
      card: '#EFEFEF',
      text: '#111111',
      textSecondary: '#777777',
      border: '#CCCCCC',
      primary: '#FF0000',
      danger: '#00FF00',
    } as any;

    const styles = makeCommonStyles(customColors);
    expect(styles.screenSafe.backgroundColor).toBe(customColors.background);
    expect(styles.cardBase.backgroundColor).toBe(customColors.card);
    expect(styles.primaryButton.backgroundColor).toBe(customColors.primary);
  });

  it('should have consistent shadow properties', () => {
    const styles = makeCommonStyles(mockColors);
    expect(styles.cardBase.shadowColor).toBe('#000');
    expect(styles.cardBase.shadowOpacity).toBe(0.04);
  });
});
