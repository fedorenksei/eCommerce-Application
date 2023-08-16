import React from 'react';

export const Palette = () => {
  const themeColors = ['bg-color', 'text-color', 'second-text-color'];

  const commonColors = [
    'primary-color',
    'hover-color',
    'disable-color',
    'accent-color',
    'success-color',
    'alert-color',
    'danger-color',
  ];

  return (
    <>
      <h2 className="text-4xl font-bold text-center">Colors palette</h2>
      <div className="flex justify-around items-center m-8">
        <div>
          <h3>Light</h3>
          {themeColors.map((color) => (
            <div
              className={`w-52 h-10 text-center bg-${color}`}
              key={color}
            >
              {color}
            </div>
          ))}
        </div>
        <div className="dark">
          <h3>Dark</h3>
          {themeColors.map((color) => (
            <div
              className={`w-52 h-10 text-center bg-dt-${color}`}
              key={color}
            >
              {color}
            </div>
          ))}
        </div>

        <div>
          <h3>Common</h3>
          {commonColors.map((color) => (
            <div
              className={`w-52 h-10 text-center bg-${color}`}
              key={color}
            >
              {color}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
